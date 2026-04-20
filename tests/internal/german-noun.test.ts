import { describe, expect, it } from "bun:test";
import { schema } from "../../src/schema";
import {
	germanBVGAbbreviationSelection,
	germanHausLemmaSurface,
	germanKindLemma,
	makeLexemeSurfaceReference,
} from "../helpers";

describe("German noun schemas", () => {
	it("accept supported noun lemmas and inflections", () => {
		expect(schema.de.lemma.lexeme.noun().safeParse(germanKindLemma).success).toBe(
			true,
		);
		expect(
			schema.de.selection.standard.inflection.lexeme.noun().safeParse({
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
			}).success,
		).toBe(true);
	});

	it("reject unsupported noun features", () => {
		expect(
			schema.de.lemma.lexeme.noun().safeParse({
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
			schema.de.selection.standard.inflection.lexeme.noun().safeParse({
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
			}).success,
		).toBe(false);
	});

	it("keeps registry access and lemma selections intact", () => {
		expect(
			schema.de.surface.lemma.lexeme.noun().safeParse(germanHausLemmaSurface)
				.success,
		).toBe(true);
		expect(
			schema.de.selection.standard.lemma.lexeme.propn().safeParse(
				germanBVGAbbreviationSelection,
			).success,
		).toBe(true);
		expect(typeof schema.de.selection.standard.lemma.lexeme.noun().parse).toBe(
			"function",
		);
	});
});
