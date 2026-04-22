import { describe, expect, it } from "bun:test";
import * as runtimeEntry from "../../src";
import {
	dumling,
	getLanguageApi,
	inspectId,
	supportedLanguages,
} from "../../src";
import { getSchemaTreeFor, schemas } from "../../src/schema";

describe("public API usage", () => {
	it("exposes the curated root runtime surface", () => {
		expect(runtimeEntry.dumling).toBe(dumling);
		expect(Object.keys(runtimeEntry).sort()).toEqual([
			"dumling",
			"getLanguageApi",
			"inspectId",
			"supportedLanguages",
		]);
		expect("schema" in runtimeEntry).toBe(false);
		expect("Language" in runtimeEntry).toBe(false);
	});

	it("exposes dynamic language helpers and package-level ID inspection", () => {
		expect(supportedLanguages).toEqual(["de", "en", "he"]);
		expect(getLanguageApi("de")).toBe(dumling.de);

		const selection = getLanguageApi("de").convert.lemma.toSelection(
			dumling.de.create.lemma({
				canonicalLemma: "see",
				lemmaKind: "Lexeme",
				lemmaSubKind: "NOUN",
				inherentFeatures: { gender: "Masc" },
				meaningInEmojis: "🌊",
			}),
		);
		const id = dumling.de.id.encode(selection);

		expect(inspectId(id)).toEqual({
			kind: "Selection",
			language: "de",
		});
		expect(inspectId("not-a-dumling-id")).toBeUndefined();
	});

	it("keeps the exported language inventory from changing ID inspection", () => {
		const forgedId = `dumling:${Buffer.from(
			JSON.stringify({ entityKind: "Lemma", language: "fr" }),
			"utf8",
		).toString("base64url")}`;
		const mutableLanguages = supportedLanguages as unknown as string[];

		let inspectionAfterMutation: ReturnType<typeof inspectId> | undefined;
		try {
			try {
				mutableLanguages.push("fr");
			} catch {
				// Frozen public inventories can reject mutation attempts.
			}
			inspectionAfterMutation = inspectId(forgedId);
		} finally {
			const forgedLanguageIndex = mutableLanguages.indexOf("fr");
			if (forgedLanguageIndex !== -1) {
				mutableLanguages.splice(forgedLanguageIndex, 1);
			}
		}

		expect(inspectionAfterMutation).toBeUndefined();
		expect(supportedLanguages).toEqual(["de", "en", "he"]);
	});

	it("keeps schemas available from the dedicated schema entrypoint", () => {
		const nounSelectionSchema =
			schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();

		expect(
			typeof schemas.de.entity.Selection.Standard.Inflection.Lexeme.VERB()
				.parse,
		).toBe("function");
		expect(typeof nounSelectionSchema.parse).toBe("function");
		expect(typeof schemas.he.entity.Lemma.Lexeme.VERB().parse).toBe(
			"function",
		);
		expect(getSchemaTreeFor("de")).toBe(schemas.de);
		expect(schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN()).toBe(
			nounSelectionSchema,
		);
	});
});
