import { describe, expect, it } from "bun:test";
import * as runtimeEntry from "../../src";
import {
	dumling,
	getLanguageApi,
	inspectId,
	supportedLanguages,
} from "../../src";
import { schema } from "../../src/schema";

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

	it("keeps schemas available from the dedicated schema entrypoint", () => {
		expect(
			typeof schema.de.selection.standard.inflection.lexeme.verb().parse,
		).toBe("function");
		expect(
			typeof schema.de.selection.standard.lemma.lexeme.noun().parse,
		).toBe("function");
		expect(typeof schema.he.lemma.lexeme.verb().parse).toBe("function");
		expect(typeof schema.abstract.lemma.lexeme.verb().parse).toBe(
			"function",
		);
	});
});
