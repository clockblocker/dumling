import type { LanguageApi, Lemma, Selection, Surface } from "../../../types/public-types";

type DeCreateOperations = LanguageApi<"de">["create"];
type DeCreateLemma = DeCreateOperations["lemma"];
type DeCreateLemmaSurface = DeCreateOperations["surface"]["lemma"];
type DeCreateInflectionSurface = DeCreateOperations["surface"]["inflection"];
type DeCreateStandardSelection = DeCreateOperations["selection"]["standard"];
type DeCreateTypoSelection = DeCreateOperations["selection"]["typo"];

export function buildDeCreateOperations(): LanguageApi<"de">["create"] {
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
