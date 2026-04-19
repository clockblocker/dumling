import type {
	LanguageApi,
	Lemma,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../public-types";

type SelectionOptions<L extends SupportedLanguage> = Partial<
	Pick<
		Selection<L>,
		| "orthographicStatus"
		| "selectionCoverage"
		| "spelledSelection"
		| "spellingRelation"
	>
>;

export function buildSelectionFromSurface<L extends SupportedLanguage>(
	surface: Surface<L>,
	options: SelectionOptions<L> = {},
): Selection<L> {
	return {
		language: surface.language,
		orthographicStatus: options.orthographicStatus ?? "Standard",
		selectionCoverage: options.selectionCoverage ?? "Full",
		spelledSelection: options.spelledSelection ?? surface.normalizedFullSurface,
		spellingRelation: options.spellingRelation ?? "Canonical",
		surface,
	} as unknown as Selection<L>;
}

export function buildConvertOperations<L extends SupportedLanguage>(): LanguageApi<L>["convert"] {
	return {
		lemma: {
			toSurface(lemma: Lemma<L>) {
				return {
					language: lemma.language,
					normalizedFullSurface: lemma.canonicalLemma,
					surfaceKind: "Lemma",
					lemma,
				} as unknown as ReturnType<LanguageApi<L>["convert"]["lemma"]["toSurface"]>;
			},
			toSelection(lemma: Lemma<L>, options: SelectionOptions<L> = {}) {
				return buildSelectionFromSurface(
					{
						language: lemma.language,
						normalizedFullSurface: lemma.canonicalLemma,
						surfaceKind: "Lemma",
						lemma,
					} as unknown as Surface<L>,
					options,
				);
			},
		},
		surface: {
			toSelection(surface: Surface<L>, options: SelectionOptions<L> = {}) {
				return buildSelectionFromSurface(surface, options);
			},
		},
	} as unknown as LanguageApi<L>["convert"];
}
