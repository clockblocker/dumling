import { describe, expect, it, setDefaultTimeout } from "bun:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dir, "../..");

setDefaultTimeout(20_000);

function run(command: string, args: string[]) {
	return execFileSync(command, args, {
		cwd: projectRoot,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"],
	});
}

describe("published package entrypoints", () => {
	it("builds rolled entrypoints, supports self-reference, and packs only public files", () => {
		run("bun", ["run", "generate:readme"]);
		run("bun", ["run", "build"]);

		const runtimeSmokeTest = `
			import { dumling, idCodec, operation } from "dumling";
			import { lingIdApiForLanguage } from "dumling/id";
			import { toSurface, operationForLanguage } from "dumling/operation";
			import { schemaFor } from "dumling/schema";

			if (dumling.idCodec !== idCodec) throw new Error("root idCodec export drifted");
			if (dumling.operation !== operation) throw new Error("root operation export drifted");
			if (lingIdApiForLanguage("English") === idCodec.English) throw new Error("language codecs should be fresh API objects");
			if (operationForLanguage("English").convert.lemma.toSurface === toSurface) throw new Error("bound operation API should not collapse to the unbound helper");
			if (typeof schemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.parse !== "function") throw new Error("schema entrypoint is missing runtime Zod registries");
		`;

		run("node", ["--input-type=module", "--eval", runtimeSmokeTest]);

		const typecheckDir = mkdtempSync(join(projectRoot, ".typecheck-"));

		try {
			writeFileSync(
				join(typecheckDir, "fixture.ts"),
				[
					'import { idCodec, operation } from "dumling";',
					'import { lingIdApiForLanguage } from "dumling/id";',
					'import { schemaFor } from "dumling/schema";',
					'import { toSurface } from "dumling/operation";',
					'import type { Lemma, ObservedSelection, Selection, Surface } from "dumling/entities";',
					"",
					'const lemma = {',
					'\tcanonicalLemma: "walk",',
					'\tinherentFeatures: {},',
					'\tlanguage: "English",',
					'\tlemmaKind: "Lexeme",',
					'\tmeaningInEmojis: "🚶",',
					'\tpos: "VERB",',
					'} satisfies Lemma<"English", "Lexeme", "VERB">;',
					"",
					"const surface: Surface<\"English\"> = toSurface(lemma);",
					"const selection: Selection<\"English\"> =",
					"\toperation.convert.surface.toStandardFullSelection(surface, {",
					'\t\tspelledSelection: "walk",',
					"\t});",
					"const parsed = schemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.parse(selection);",
					"const observed = {",
					'\tlanguage: "English",',
					'\torthographicStatus: "Unknown",',
					'\tspelledSelection: "walq",',
					'} satisfies ObservedSelection<"English">;',
					"const selectionId = idCodec.English.makeDumlingIdFor(parsed);",
					'const decoder = lingIdApiForLanguage("English");',
					"decoder.tryToDecodeAs(\"Selection\", selectionId);",
					"void observed;",
				].join("\n"),
			);
			writeFileSync(
				join(typecheckDir, "tsconfig.json"),
				JSON.stringify(
					{
						compilerOptions: {
							module: "NodeNext",
							moduleResolution: "NodeNext",
							noEmit: true,
							strict: true,
							target: "ESNext",
						},
						include: ["./fixture.ts"],
					},
					null,
					2,
				),
			);

			run(resolve(projectRoot, "node_modules/.bin/tsc"), [
				"--project",
				join(typecheckDir, "tsconfig.json"),
			]);
		} finally {
			rmSync(typecheckDir, { force: true, recursive: true });
		}

		const packSummary = JSON.parse(
			run("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"]),
		) as Array<{
			files: Array<{ path: string }>;
		}>;
		const packedFiles = packSummary[0]?.files.map((file) => file.path) ?? [];

		expect(packedFiles.length).toBeLessThan(20);
		expect(packedFiles).toContain("dist/index.d.ts");
		expect(packedFiles).toContain("dist/id.d.ts");
		expect(packedFiles).toContain("dist/operation.d.ts");
		expect(packedFiles).toContain("dist/schema.d.ts");
		expect(packedFiles).toContain("dist/entities.d.ts");
		expect(packedFiles.some((file) => file.startsWith("dist/lu/"))).toBe(false);
		expect(packedFiles.some((file) => file.startsWith("dist/id/internal/"))).toBe(
			false,
		);
		expect(statSync(resolve(projectRoot, "dist/index.d.ts")).size).toBeLessThan(
			10_000,
		);
	});
});
