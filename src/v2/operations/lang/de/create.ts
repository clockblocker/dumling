import type { Lemma, Selection, Surface } from "../../../public-types";

type DeCreateLemma = <T extends Lemma<"de">>(
	input: Omit<T, "language"> & {
		language?: unknown;
	},
) => T;

type DeCreateLemmaSurface = <T extends Surface<"de", "Lemma">>(
	input: Omit<T, "language" | "surfaceKind"> & {
		language?: unknown;
		surfaceKind?: unknown;
	},
) => T;

type DeCreateInflectionSurface = <T extends Surface<"de", "Inflection">>(
	input: Omit<T, "language" | "surfaceKind"> & {
		language?: unknown;
		surfaceKind?: unknown;
	},
) => T;

type DeCreateStandardSelection = <T extends Selection<"de", "Standard">>(
	input: Omit<T, "language" | "orthographicStatus"> & {
		language?: unknown;
		orthographicStatus?: unknown;
	},
) => T;

type DeCreateTypoSelection = <T extends Selection<"de", "Typo">>(
	input: Omit<T, "language" | "orthographicStatus"> & {
		language?: unknown;
		orthographicStatus?: unknown;
	},
) => T;

export function buildDeCreateOperations() {
	const createLemma: DeCreateLemma = (input: any) =>
		({
			language: "de",
			canonicalLemma: input.canonicalLemma,
			lemmaKind: input.lemmaKind,
			lemmaSubKind: input.lemmaSubKind,
			inherentFeatures: input.inherentFeatures ?? {},
			meaningInEmojis: input.meaningInEmojis,
		}) as never;

	const createLemmaSurface: DeCreateLemmaSurface = (input: any) =>
		({
			language: input.lemma.language,
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Lemma",
			lemma: input.lemma,
		}) as never;

	const createInflectionSurface: DeCreateInflectionSurface = (input: any) =>
		({
			language: input.lemma.language,
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Inflection",
			lemma: input.lemma,
			inflectionalFeatures: input.inflectionalFeatures,
		}) as never;

	const createStandardSelection: DeCreateStandardSelection = (input: any) =>
		({
			language: input.surface.language,
			orthographicStatus: "Standard",
			selectionCoverage: input.selectionCoverage,
			spelledSelection: input.spelledSelection,
			spellingRelation: input.spellingRelation,
			surface: input.surface,
		}) as never;

	const createTypoSelection: DeCreateTypoSelection = (input: any) =>
		({
			language: input.surface.language,
			orthographicStatus: "Typo",
			selectionCoverage: input.selectionCoverage,
			spelledSelection: input.spelledSelection,
			spellingRelation: input.spellingRelation,
			surface: input.surface,
		}) as never;

	const operations = {
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

	return operations;
}
