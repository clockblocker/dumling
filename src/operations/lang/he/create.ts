import type {
	LanguageApi,
	Lemma,
	Selection,
	Surface,
} from "../../../types/public-types";

type HeCreateOperations = LanguageApi<"he">["create"];
type HeCreateLemma = HeCreateOperations["lemma"];
type HeCreateLemmaSurface = HeCreateOperations["surface"]["lemma"];
type HeCreateInflectionSurface = HeCreateOperations["surface"]["inflection"];
type HeCreateStandardSelection = HeCreateOperations["selection"]["standard"];
type HeCreateTypoSelection = HeCreateOperations["selection"]["typo"];

export function buildHeCreateOperations(): LanguageApi<"he">["create"] {
	const createLemma: HeCreateLemma = (input) =>
		({
			language: "he",
			canonicalLemma: input.canonicalLemma,
			lemmaKind: input.lemmaKind,
			lemmaSubKind: input.lemmaSubKind,
			inherentFeatures: input.inherentFeatures ?? {},
			meaningInEmojis: input.meaningInEmojis,
		}) as never;

	const createLemmaSurface: HeCreateLemmaSurface = (input) =>
		({
			language: input.lemma.language,
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Lemma",
			lemma: input.lemma,
		}) as never;

	const createInflectionSurface: HeCreateInflectionSurface = (input) =>
		({
			language: input.lemma.language,
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Inflection",
			lemma: input.lemma,
			inflectionalFeatures: input.inflectionalFeatures,
		}) as never;

	const createStandardSelection: HeCreateStandardSelection = (input) =>
		({
			language: input.surface.language,
			orthographicStatus: "Standard",
			selectionCoverage: input.selectionCoverage,
			spelledSelection: input.spelledSelection,
			spellingRelation: input.spellingRelation,
			surface: input.surface,
		}) as never;

	const createTypoSelection: HeCreateTypoSelection = (input) =>
		({
			language: input.surface.language,
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
