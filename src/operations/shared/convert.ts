import type {
	LanguageApi,
	Lemma,
	OrthographicStatus,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../types/public-types";

type SelectionOptions<TStatus extends OrthographicStatus = OrthographicStatus> =
	{
		orthographicStatus?: TStatus;
		selectionCoverage?: Selection<SupportedLanguage>["selectionCoverage"];
		spelledSelection?: string;
		spellingRelation?: Selection<SupportedLanguage>["spellingRelation"];
	};

function buildSelectionFromSurface<
	L extends SupportedLanguage,
	TStatus extends OrthographicStatus = "Standard",
>(
	surface: Surface<L>,
	options: SelectionOptions<TStatus> = {},
): Selection<L, TStatus> {
	return {
		language: surface.language,
		orthographicStatus: options.orthographicStatus ?? "Standard",
		selectionCoverage: options.selectionCoverage ?? "Full",
		spelledSelection:
			options.spelledSelection ?? surface.normalizedFullSurface,
		spellingRelation: options.spellingRelation ?? "Canonical",
		surface,
	} as unknown as Selection<L, TStatus>;
}

export function buildConvertOperations<
	L extends SupportedLanguage,
>(): LanguageApi<L>["convert"] {
	return {
		lemma: {
			toSurface(lemma: Lemma<L>) {
				return {
					language: lemma.language,
					normalizedFullSurface: lemma.canonicalLemma,
					surfaceKind: "Lemma",
					lemma,
				} as unknown as ReturnType<
					LanguageApi<L>["convert"]["lemma"]["toSurface"]
				>;
			},
			toSelection(lemma: Lemma<L>, options = {}) {
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
			toSelection(surface: Surface<L>, options = {}) {
				return buildSelectionFromSurface(surface, options);
			},
		},
	} as unknown as LanguageApi<L>["convert"];
}
