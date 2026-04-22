import { describe, expect, it } from "bun:test";
import { schemas } from "../../src/schema";
import {
	germanBVGAbbreviationSelection,
	germanHausLemmaSurface,
	germanKindLemma,
	makeLexemeSurfaceReference,
} from "../helpers";

describe("German noun schemas", () => {
	it("accept supported noun lemmas and inflections", () => {
		expect(
			schemas.de.entity.Lemma.Lexeme.NOUN().safeParse(germanKindLemma)
				.success,
		).toBe(true);
		expect(
			schemas.de.entity.Selection.Standard.Inflection.Lexeme.NOUN().safeParse(
				{
					language: "de",
					orthographicStatus: "Standard",
					selectionCoverage: "Full",
					spelledSelection: "kindern",
					spellingRelation: "Canonical",
					surface: {
						...makeLexemeSurfaceReference("de", "NOUN", "kind"),
						language: "de",
						normalizedFullSurface: "kindern",
						surfaceKind: "Inflection",
						inflectionalFeatures: {
							case: "Dat",
							number: "Plur",
						},
					},
				},
			).success,
		).toBe(true);
	});

	it("reject unsupported noun features", () => {
		expect(
			schemas.de.entity.Lemma.Lexeme.NOUN().safeParse({
				language: "de",
				canonicalLemma: "kind",
				lemmaKind: "Lexeme",
				lemmaSubKind: "NOUN",
				inherentFeatures: {
					case: "Nom",
				},
				meaningInEmojis: "👶",
			}).success,
		).toBe(false);

		expect(
			schemas.de.entity.Selection.Standard.Inflection.Lexeme.NOUN().safeParse(
				{
					language: "de",
					orthographicStatus: "Standard",
					selectionCoverage: "Full",
					spelledSelection: "kindern",
					spellingRelation: "Canonical",
					surface: {
						...makeLexemeSurfaceReference("de", "NOUN", "kind"),
						language: "de",
						normalizedFullSurface: "kindern",
						surfaceKind: "Inflection",
						inflectionalFeatures: {
							case: "Ins",
							number: "Dual",
						},
					},
				},
			).success,
		).toBe(false);
	});

	it("keeps registry access and lemma selections intact", () => {
		expect(
			schemas.de.entity.Surface.Lemma.Lexeme.NOUN().safeParse(
				germanHausLemmaSurface,
			).success,
		).toBe(true);
		expect(
			schemas.de.entity.Selection.Standard.Lemma.Lexeme.PROPN().safeParse(
				germanBVGAbbreviationSelection,
			).success,
		).toBe(true);
		expect(
			typeof schemas.de.entity.Selection.Standard.Lemma.Lexeme.NOUN()
				.parse,
		).toBe("function");
	});
});
