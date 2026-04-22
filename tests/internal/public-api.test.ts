import { describe, expect, it } from "bun:test";
import * as runtimeEntry from "../../src";
import {
	dumling,
	getLanguageApi,
	inspectId,
	supportedLanguages,
} from "../../src";
import {
	abstractSchemas,
	getSchemaTreeFor,
	schemasFor,
} from "../../src/schema";

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
			schemasFor.de.entity.Selection.Standard.Lemma.Lexeme.NOUN();
		const nounDescriptorSchema = schemasFor.de.descriptor.Lemma.Lexeme.NOUN;

		expect(
			typeof schemasFor.de.entity.Selection.Standard.Inflection.Lexeme.VERB()
				.parse,
		).toBe("function");
		expect(typeof nounDescriptorSchema.parse).toBe("function");
		expect(typeof nounSelectionSchema.parse).toBe("function");
		expect(typeof schemasFor.he.entity.Lemma.Lexeme.VERB().parse).toBe(
			"function",
		);
		expect(getSchemaTreeFor("de")).toBe(schemasFor.de);
		expect(
			schemasFor.de.entity.Selection.Standard.Lemma.Lexeme.NOUN(),
		).toBe(nounSelectionSchema);
		expect(
			nounDescriptorSchema.safeParse({
				language: "de",
				lemmaKind: "Lexeme",
				lemmaSubKind: "NOUN",
			}).success,
		).toBe(true);
		expect(
			schemasFor.de.descriptor.Surface.Lemma.Lexeme.NOUN.safeParse({
				language: "de",
				surfaceKind: "Lemma",
				lemmaKind: "Lexeme",
				lemmaSubKind: "NOUN",
			}).success,
		).toBe(true);
	});

	it("exposes abstract entity and descriptor schemas by entity kind", () => {
		const abstractLemma = {
			language: "fr",
			canonicalLemma: "aller",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {},
			meaningInEmojis: "🚶",
		};

		expect(
			abstractSchemas.entity.Lemma.safeParse(abstractLemma).success,
		).toBe(true);
		expect(
			abstractSchemas.descriptor.Selection.safeParse({
				language: "fr",
				orthographicStatus: "Standard",
				surfaceKind: "Lemma",
				lemmaKind: "Lexeme",
				lemmaSubKind: "VERB",
			}).success,
		).toBe(true);
	});
});
