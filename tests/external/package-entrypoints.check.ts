import { describe, expect, it, setDefaultTimeout } from "bun:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dir, "../..");

setDefaultTimeout(30_000);

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
			import { dumling, getLanguageApi, inspectId, supportedLanguages } from "dumling";
			import { schema } from "dumling/schema";

			if (supportedLanguages.join(",") !== "de,en,he") throw new Error("language inventory is missing");
			if (getLanguageApi("de") !== dumling.de) throw new Error("language API helper returned the wrong API");
			const lemma = dumling.de.create.lemma({
				canonicalLemma: "see",
				lemmaKind: "Lexeme",
				lemmaSubKind: "NOUN",
				inherentFeatures: { gender: "Masc" },
				meaningInEmojis: "🌊",
			});
			const selection = dumling.de.convert.lemma.toSelection(lemma, {
				spelledSelection: "See",
			});
			const parsed = dumling.de.parse.selection(selection);
			if (!parsed.success) throw new Error(parsed.error.message);
			const decoded = dumling.de.id.decodeAs("Selection", dumling.de.id.encode(parsed.data));
			if (!decoded.success) throw new Error(decoded.error.message);
			const inspection = inspectId(dumling.de.id.encode(parsed.data));
			if (inspection?.kind !== "Selection" || inspection.language !== "de") throw new Error("ID inspection failed");
			if (typeof schema.de.lemma.lexeme.noun().parse !== "function") throw new Error("schema entrypoint is missing german schemas");
			if (typeof schema.abstract.selection.typo.inflection.lexeme.verb().parse !== "function") throw new Error("schema entrypoint is missing abstract schemas");
		`;

		run("node", ["--input-type=module", "--eval", runtimeSmokeTest]);

		const typecheckDir = mkdtempSync(join(projectRoot, ".typecheck-"));

		try {
			writeFileSync(
				join(typecheckDir, "fixture.ts"),
				[
					'import { dumling, getLanguageApi, inspectId, supportedLanguages } from "dumling";',
					'import { schema } from "dumling/schema";',
					'import type * as z from "zod/v3";',
					'import type { AbstractLemma, DumlingId, DumlingIdInspection, EntityForKind, EntityValue, Lemma, Selection, SelectionOptionsFor } from "dumling/types";',
					"",
					'const languages: readonly ("de" | "en" | "he")[] = supportedLanguages;',
					"void languages;",
					'const lemma: Lemma<"de", "Lexeme", "NOUN"> = dumling.de.create.lemma({',
					'\tcanonicalLemma: "see",',
					'\tlemmaKind: "Lexeme",',
					'\tlemmaSubKind: "NOUN",',
					"\tinherentFeatures: {},",
					'\tmeaningInEmojis: "🌊",',
					"});",
					"",
					'const selection: Selection<"de"> = dumling.de.convert.lemma.toSelection(lemma, {',
					'\tspelledSelection: "See",',
					"});",
					"const parsed = dumling.de.parse.selection(selection);",
					"if (!parsed.success) throw new Error(parsed.error.message);",
					'const dynamicApi = getLanguageApi("de");',
					"const dynamicSelection = dynamicApi.convert.lemma.toSelection(lemma);",
					'dynamicSelection satisfies Selection<"de">;',
					"const selectionId = dumling.de.id.encode(parsed.data);",
					'selectionId satisfies DumlingId<"Lemma" | "Surface" | "Selection", "de">;',
					"const inspected = inspectId(selectionId);",
					"inspected satisfies DumlingIdInspection | undefined;",
					'const decoded = dumling.de.id.decodeAs("Selection", selectionId);',
					"if (!decoded.success) throw new Error(decoded.error.message);",
					'const entityValue: EntityValue<"de"> = decoded.data;',
					'const entityForKind: EntityForKind<"de", "Selection"> = decoded.data;',
					'const selectionOptions: SelectionOptionsFor<"Standard"> = { spelledSelection: "See" };',
					"void entityValue;",
					"void entityForKind;",
					"void selectionOptions;",
					'const nounLemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "NOUN">> = schema.de.lemma.lexeme.noun();',
					'const nounSelectionSchema: z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "NOUN">> = schema.de.selection.standard.lemma.lexeme.noun();',
					'const abstractVerbSchema: z.ZodType<AbstractLemma<string, "Lexeme", "VERB">> = schema.abstract.lemma.lexeme.verb();',
					"nounLemmaSchema.parse(lemma);",
					"nounSelectionSchema.parse(decoded.data);",
					"abstractVerbSchema.parse({",
					'\tlanguage: "xx",',
					'\tcanonicalLemma: "gehen",',
					'\tlemmaKind: "Lexeme",',
					'\tlemmaSubKind: "VERB",',
					"\tinherentFeatures: {},",
					'\tmeaningInEmojis: "🚶",',
					"});",
					"schema.de.selection.standard.lemma.lexeme.noun().parse(decoded.data);",
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
		const packedFiles =
			packSummary[0]?.files.map((file) => file.path) ?? [];

		expect(packedFiles.length).toBeLessThan(20);
		expect(packedFiles).toContain("dist/index.d.ts");
		expect(packedFiles).toContain("dist/types.d.ts");
		expect(packedFiles).toContain("dist/schema.d.ts");
		expect(packedFiles).not.toContain("dist/id.d.ts");
		expect(packedFiles).not.toContain("dist/operation.d.ts");
		expect(packedFiles).not.toContain("dist/entities.d.ts");
		expect(
			statSync(resolve(projectRoot, "dist/index.d.ts")).size,
		).toBeLessThan(120_000);
	});
});
