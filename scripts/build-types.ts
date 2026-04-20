import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { $, type ShellError } from "bun";
import {
	ConsoleMessageId,
	Extractor,
	ExtractorConfig,
} from "@microsoft/api-extractor";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tempTypesDir = resolve(projectRoot, ".types-temp");
const distDir = resolve(projectRoot, "dist");

const publicEntrypoints = [
	"index",
	"types",
	"schema",
] as const;

const suppressedConsoleMessageIds = new Set<string>([
	ConsoleMessageId.Preamble,
	ConsoleMessageId.CompilerVersionNotice,
]);

async function emitDeclarations() {
	if (existsSync(tempTypesDir)) {
		rmSync(tempTypesDir, { force: true, recursive: true });
	}

	mkdirSync(tempTypesDir, { recursive: true });

	try {
		await $`tsgo -p ${resolve(projectRoot, "tsconfig.build.json")} --outDir ${tempTypesDir}`;
	} catch (error) {
		const shellError = error as ShellError;
		process.exit(shellError.exitCode ?? 1);
	}
}

async function rollupEntrypoint(entrypoint: (typeof publicEntrypoints)[number]) {
	const entryDeclarationPath = resolve(tempTypesDir, `${entrypoint}.d.ts`);
	const outputDeclarationPath = resolve(distDir, `${entrypoint}.d.ts`);
	const extractorConfig = ExtractorConfig.prepare({
		configObject: {
			$schema:
				"https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
			projectFolder: projectRoot,
			mainEntryPointFilePath: entryDeclarationPath,
			bundledPackages: [],
			compiler: {
				tsconfigFilePath: resolve(projectRoot, "tsconfig.build.json"),
			},
			apiReport: {
				enabled: false,
			},
			docModel: {
				enabled: false,
			},
			dtsRollup: {
				enabled: true,
				untrimmedFilePath: outputDeclarationPath,
			},
			tsdocMetadata: {
				enabled: false,
			},
			messages: {
				extractorMessageReporting: {
					default: {
						logLevel: "warning",
					},
					"ae-forgotten-export": {
						logLevel: "none",
					},
					"ae-missing-release-tag": {
						logLevel: "none",
					},
				},
			},
		},
		configObjectFullPath: resolve(projectRoot, `api-extractor.${entrypoint}.json`),
		packageJsonFullPath: resolve(projectRoot, "package.json"),
	});
	const result = Extractor.invoke(extractorConfig, {
		localBuild: true,
		messageCallback: (message) => {
			if (suppressedConsoleMessageIds.has(message.messageId)) {
				message.handled = true;
			}
		},
		showVerboseMessages: false,
	});

	if (!result.succeeded) {
		throw new Error(`API Extractor failed for "${entrypoint}".`);
	}
}

async function main() {
	await emitDeclarations();

	for (const entrypoint of publicEntrypoints) {
		await rollupEntrypoint(entrypoint);
	}

	rmSync(tempTypesDir, { force: true, recursive: true });
}

await main();
