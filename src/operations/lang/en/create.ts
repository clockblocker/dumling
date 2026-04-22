import type { LanguageApi } from "../../../types/public-types";

type EnCreateOperations = LanguageApi<"en">["create"];
type EnCreateLemma = EnCreateOperations["lemma"];
type EnCreateLemmaSurface = EnCreateOperations["surface"]["lemma"];
type EnCreateInflectionSurface = EnCreateOperations["surface"]["inflection"];
type EnCreateStandardSelection = EnCreateOperations["selection"]["standard"];
type EnCreateTypoSelection = EnCreateOperations["selection"]["typo"];

export function buildEnCreateOperations(): LanguageApi<"en">["create"] {
	const createLemma: EnCreateLemma = (input) =>
		({
			language: "en",
			canonicalLemma: input.canonicalLemma,
			lemmaKind: input.lemmaKind,
			lemmaSubKind: input.lemmaSubKind,
			inherentFeatures: input.inherentFeatures ?? {},
			meaningInEmojis: input.meaningInEmojis,
		}) as never;

	const createLemmaSurface: EnCreateLemmaSurface = (input) =>
		({
			language: input.lemma.language,
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Lemma",
			lemma: input.lemma,
		}) as never;

	const createInflectionSurface: EnCreateInflectionSurface = (input) =>
		({
			language: input.lemma.language,
			normalizedFullSurface: input.normalizedFullSurface,
			surfaceKind: "Inflection",
			lemma: input.lemma,
			inflectionalFeatures: input.inflectionalFeatures,
		}) as never;

	const createStandardSelection: EnCreateStandardSelection = (input) =>
		({
			language: input.surface.language,
			orthographicStatus: "Standard",
			selectionCoverage: input.selectionCoverage,
			spelledSelection: input.spelledSelection,
			spellingRelation: input.spellingRelation,
			surface: input.surface,
		}) as never;

	const createTypoSelection: EnCreateTypoSelection = (input) =>
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
