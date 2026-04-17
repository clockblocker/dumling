import { describe, expect, it } from "bun:test";
import { dumling, type ObservedSelection } from "../../src";
import {
	englishWalkLemma,
	englishWalkLemmaSelection,
	englishWalkLemmaSurface,
	germanMasculineSeeLemma,
} from "../helpers";

const { operation: lingOperation, schemaFor: lingSchemaFor } = dumling;

describe("lingOperation", () => {
	it("keeps observed selections separate from hydrated extraction helpers", () => {
		const unknownSelection = {
			language: "English",
			orthographicStatus: "Unknown",
			spelledSelection: "walq",
		} satisfies ObservedSelection<"English">;

		expect(
			lingSchemaFor.ObservedSelection.English.safeParse(unknownSelection)
				.success,
		).toBe(true);
	});

	it("extracts the exact surface from known selections", () => {
		const selection = englishWalkLemmaSelection;

		expect(lingOperation.extract.surface.fromSelection(selection)).toBe(
			selection.surface,
		);
	});

	it("extracts hydrated lemmas from surfaces", () => {
		expect(lingOperation.extract.lemma.fromSurface(englishWalkLemmaSurface)).toBe(
			englishWalkLemma,
		);
	});

	it("builds valid lemma surfaces", () => {
		const lemma = englishWalkLemma;
		const surface = lingOperation.convert.lemma.toSurface(lemma);

		expect(surface).toEqual({
			language: "English",
			normalizedFullSurface: "walk",
			surfaceKind: "Lemma",
			lemma: lemma,
		});
		expect(
			lingSchemaFor.Surface.English.Lemma.Lexeme.VERB.safeParse(surface)
				.success,
		).toBe(true);
	});

	it("wraps surfaces into valid standard full selections and honors overrides", () => {
		const lemma = englishWalkLemma;
		const surface = lingOperation.convert.lemma.toSurface(lemma);

		const selection = lingOperation.convert.surface.toStandardFullSelection(
			surface,
			{
				spelledSelection: "Walk",
			},
		);

		expect(selection).toEqual({
			language: "English",
			orthographicStatus: "Standard",
			selectionCoverage: "Full",
			spelledSelection: "Walk",
			spellingRelation: "Canonical",
			surface,
		});
		expect(
			lingSchemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.safeParse(
				selection,
			).success,
		).toBe(true);
	});

	it("composes lemma conversion through the lower-level helpers", () => {
		const lemma = englishWalkLemma;

		expect(
			lingOperation.convert.lemma.toStandardFullSelection(lemma, {
				spelledSelection: "Walk",
			}),
		).toEqual(
			lingOperation.convert.surface.toStandardFullSelection(
				lingOperation.convert.lemma.toSurface(lemma),
				{
					spelledSelection: "Walk",
				},
			),
		);
	});

	it("enforces bound language matching at runtime", () => {
		const germanOps = lingOperation.forLanguage("German");
		type GermanLemmaInput = Parameters<typeof germanOps.convert.lemma.toSurface>[0];
		type GermanSurfaceInput = Parameters<
			typeof germanOps.convert.surface.toStandardFullSelection
		>[0];

		expect(() =>
			germanOps.convert.lemma.toSurface(englishWalkLemma as unknown as GermanLemmaInput),
		).toThrow(
			"lingOperation language mismatch: expected German, received English",
		);
		expect(() =>
			germanOps.convert.surface.toStandardFullSelection(
				lingOperation.convert.lemma.toSurface(englishWalkLemma) as unknown as GermanSurfaceInput,
			),
		).toThrow(
			"lingOperation language mismatch: expected German, received English",
		);
	});

	it("returns language-bound results with the same structural behavior", () => {
		const germanLemma = germanMasculineSeeLemma;
		const germanOps = lingOperation.forLanguage("German");

		expect(germanOps.convert.lemma.toSurface(germanLemma)).toEqual({
			language: "German",
			normalizedFullSurface: "See",
			surfaceKind: "Lemma",
			lemma: germanLemma,
		});
	});
});
