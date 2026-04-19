import type { Lemma, Selection, Surface } from "../../../public-types";

type HeCreateLemma = <T extends Lemma<"he">>(
	input: Omit<T, "language"> & {
		language?: unknown;
	},
) => T;

type HeCreateLemmaSurface = <T extends Surface<"he", "Lemma">>(
	input: Omit<T, "language" | "surfaceKind"> & {
		language?: unknown;
		surfaceKind?: unknown;
	},
) => T;

type HeCreateInflectionSurface = <T extends Surface<"he", "Inflection">>(
	input: Omit<T, "language" | "surfaceKind"> & {
		language?: unknown;
		surfaceKind?: unknown;
	},
) => T;

type HeCreateStandardSelection = <T extends Selection<"he", "Standard">>(
	input: Omit<T, "language" | "orthographicStatus"> & {
		language?: unknown;
		orthographicStatus?: unknown;
	},
) => T;

type HeCreateTypoSelection = <T extends Selection<"he", "Typo">>(
	input: Omit<T, "language" | "orthographicStatus"> & {
		language?: unknown;
		orthographicStatus?: unknown;
	},
) => T;

export function buildHeCreateOperations() {
	const createLemma: HeCreateLemma = (input: any) =>
		({
			language: "he",
			canonicalLemma: input.canonicalLemma,
			lemmaKind: input.lemmaKind,
			lemmaSubKind: input.lemmaSubKind,
			inherentFeatures: input.inherentFeatures ?? {},
			meaningInEmojis: input.meaningInEmojis,
		}) as never;

	const createLemmaSurface: HeCreateLemmaSurface = (input: any) =>
		({
			language: "he",
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Lemma",
			lemma: input.lemma,
		}) as never;

	const createInflectionSurface: HeCreateInflectionSurface = (input: any) =>
		({
			language: "he",
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Inflection",
			lemma: input.lemma,
			inflectionalFeatures: input.inflectionalFeatures,
		}) as never;

	const createStandardSelection: HeCreateStandardSelection = (input: any) =>
		({
			language: "he",
			orthographicStatus: "Standard",
			selectionCoverage: input.selectionCoverage,
			spelledSelection: input.spelledSelection,
			spellingRelation: input.spellingRelation,
			surface: input.surface,
		}) as never;

	const createTypoSelection: HeCreateTypoSelection = (input: any) =>
		({
			language: "he",
			orthographicStatus: "Typo",
			selectionCoverage: input.selectionCoverage,
			spelledSelection: input.spelledSelection,
			spellingRelation: input.spellingRelation,
			surface: input.surface,
		}) as never;

	return {
		lemma: createLemma,
		surface: {
			lemma: createLemmaSurface,
			inflection: createInflectionSurface,
		},
		selection: {
			standard: createStandardSelection,
			typo: createTypoSelection,
		},
	};
}
