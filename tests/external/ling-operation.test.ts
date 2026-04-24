import { describe, expect, it } from "bun:test";
import { dumling } from "../../src";
import {
	englishWalkCitationSelection,
	englishWalkCitationSurface,
	englishWalkInflectionSurface,
	englishWalkLemma,
	germanHausCitationSurface,
	hebrewKatvuStandardFullSelection,
} from "../helpers";

describe("operations", () => {
	it("extracts the exact lemma from surfaces and selections", () => {
		expect(dumling.en.extract.lemma(englishWalkCitationSurface)).toBe(
			englishWalkLemma,
		);
		expect(dumling.en.extract.lemma(englishWalkCitationSelection)).toBe(
			englishWalkLemma,
		);
		expect(dumling.he.extract.lemma(hebrewKatvuStandardFullSelection)).toBe(
			hebrewKatvuStandardFullSelection.surface.lemma,
		);
	});

	it("builds valid surfaces and selections from lower-level helpers", () => {
		expect(dumling.en.convert.lemma.toSurface(englishWalkLemma)).toEqual(
			englishWalkCitationSurface,
		);
		expect(
			dumling.en.convert.surface.toSelection(
				englishWalkInflectionSurface,
				{
					selectionCoverage: "Full",
					spelledSelection: "Walk",
					spellingRelation: "Canonical",
				},
			),
		).toEqual({
			language: "en",
			orthographicStatus: "Standard",
			selectionCoverage: "Full",
			spelledSelection: "Walk",
			spellingRelation: "Canonical",
			surface: englishWalkInflectionSurface,
		});
	});

	it("derives stable descriptors from lemmas, surfaces, and selections", () => {
		expect(
			dumling.en.describe.as.lemma(englishWalkCitationSelection),
		).toEqual({
			language: "en",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
		});
		expect(dumling.en.describe.as.surface(englishWalkLemma)).toEqual({
			language: "en",
			surfaceKind: "Citation",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
		});
		expect(
			dumling.en.describe.as.selection(englishWalkInflectionSurface),
		).toEqual({
			language: "en",
			orthographicStatus: "Standard",
			surfaceKind: "Inflection",
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
		});
		expect(
			dumling.de.describe.as.selection(germanHausCitationSurface),
		).toEqual({
			language: "de",
			orthographicStatus: "Standard",
			surfaceKind: "Citation",
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
		});
		expect(
			String(
				dumling.en.describe.asCsv.selection(englishWalkInflectionSurface),
			),
		).toBe("Selection,en,Standard,Inflection,Lexeme,VERB");
	});
});
