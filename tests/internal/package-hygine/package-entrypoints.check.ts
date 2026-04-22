import { describe, expect, it, setDefaultTimeout } from "bun:test";
import { execFileSync } from "node:child_process";
import {
	mkdtempSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dir, "../../..");

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
			import { getSchemaTreeFor, schemas } from "dumling/schema";
			import * as schemaModule from "dumling/schema";

			if (supportedLanguages.join(",") !== "de,en,he") throw new Error("language inventory is missing");
			if (getLanguageApi("de") !== dumling.de) throw new Error("language API helper returned the wrong API");
			if ("schema" in schemaModule) throw new Error("old schema export leaked");
			if ("runtimeSchemas" in schemaModule) throw new Error("runtime schemas leaked");
			if ("newSchema" in schemaModule) throw new Error("newSchema export leaked");
			if ("descriptorSchemas" in schemaModule) throw new Error("descriptor schemas leaked");
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
			const staticSchema = schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
			const dynamicSchema = getSchemaTreeFor("de").entity.Selection.Standard.Lemma.Lexeme.NOUN();
			if (typeof staticSchema.parse !== "function") throw new Error("schema entrypoint is missing german schemas");
			staticSchema.parse(decoded.data);
			dynamicSchema.parse(decoded.data);
			if (schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN() !== staticSchema) throw new Error("leaf getter should return the stable schema object");
			if (getSchemaTreeFor("de") !== schemas.de) throw new Error("dynamic schema accessor must return registry object");
		`;

		run("node", ["--input-type=module", "--eval", runtimeSmokeTest]);

		const typecheckDir = mkdtempSync(join(projectRoot, ".typecheck-"));

		try {
			writeFileSync(
				join(typecheckDir, "fixture.ts"),
				[
					'import { dumling, getLanguageApi, inspectId, supportedLanguages } from "dumling";',
					'import { getSchemaTreeFor, schemas } from "dumling/schema";',
					'import type * as z from "zod/v3";',
					'import type { DumlingId, DumlingIdInspection, EntityForKind, EntityValue, Lemma, Selection, SelectionOptionsFor, SupportedLanguage } from "dumling/types";',
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
					'const nounLemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "NOUN">> = schemas.de.entity.Lemma.Lexeme.NOUN();',
					'const nounSelectionSchema: z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "NOUN">> = schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();',
					'const deTree = getSchemaTreeFor("de");',
					"deTree.entity.Selection.Standard.Lemma.Lexeme.NOUN();",
					"declare const language: SupportedLanguage;",
					"const languageTree = getSchemaTreeFor(language);",
					"languageTree.entity.Selection.Standard.Lemma.Lexeme.NOUN();",
					"getSchemaTreeFor(language).entity.Selection.Standard.Lemma.Lexeme.NOUN();",
					"nounLemmaSchema.parse(lemma);",
					"nounSelectionSchema.parse(decoded.data);",
					"schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN().parse(decoded.data);",
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
		const rolledTypes = readFileSync(
			resolve(projectRoot, "dist/types.d.ts"),
			"utf8",
		);
		expect(rolledTypes).not.toContain(
			"export declare type AbstractLanguageTag",
		);
		expect(rolledTypes).not.toContain(
			"export declare const AbstractLanguageTag",
		);
		expect(rolledTypes).not.toContain("export declare const LemmaKind");
		expect(rolledTypes).not.toContain("export declare const LemmaSubKind");
		expect(rolledTypes).not.toContain(
			"export declare const OrthographicStatus",
		);
		expect(rolledTypes).not.toContain(
			"export declare const SelectionCoverage",
		);
		expect(rolledTypes).not.toContain(
			"export declare const SpellingRelation",
		);
		expect(rolledTypes).not.toContain(
			"export declare const SupportedLanguage",
		);
		expect(rolledTypes).not.toContain("export declare const SurfaceKind");
		expect(
			statSync(resolve(projectRoot, "dist/index.d.ts")).size,
		).toBeLessThan(120_000);

		const schemaDts = readFileSync(
			resolve(projectRoot, "dist/schema.d.ts"),
			"utf8",
		);
		expect(schemaDts).not.toContain("runtimeSchemas");
		expect(schemaDts).not.toContain("descriptorSchemas");
		expect(schemaDts).not.toContain("src/schemas");
		expect(schemaDts).not.toContain("export type New");
		expect(schemaDts).not.toContain("EverySupportedLanguageHasConcreteSchema");
		expect(schemaDts.length).toBeLessThan(40_000);
	});
});
