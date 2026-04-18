import {
	deprecatedExtractLemmaFromSurface as extractLemmaFromSurfaceInternal,
	deprecatedExtractSurfaceFromSelection as extractSurfaceFromSelectionInternal,
	deprecatedOperationForLanguage as operationForLanguageInternal,
	deprecatedToStandardFullSelection as toStandardFullSelectionInternal,
	deprecatedToStandardFullSelectionFromLemma as toStandardFullSelectionFromLemmaInternal,
	deprecatedToSurface as toSurfaceInternal,
} from "./lu/public-operations";

/** @public */
export type DeprecatedDumlingOperationLanguage = "English" | "German" | "Hebrew";

/**
 * @public
 * Stable public lemma shape consumed by the operation helpers.
 */
export type DeprecatedOperationLemma<
	L extends DeprecatedDumlingOperationLanguage = DeprecatedDumlingOperationLanguage,
> =
	| ({
			canonicalLemma: string;
			inherentFeatures: Record<string, unknown>;
			language: L;
			lemmaKind: "Lexeme";
			meaningInEmojis?: string;
			pos: string;
	  } & Record<string, unknown>)
	| ({
			canonicalLemma: string;
			language: L;
			lemmaKind: "Morpheme";
			meaningInEmojis?: string;
			morphemeKind: string;
	  } & Record<string, unknown>)
	| ({
			canonicalLemma: string;
			language: L;
			lemmaKind: "Phraseme";
			meaningInEmojis?: string;
			phrasemeKind: string;
	  } & Record<string, unknown>);

/**
 * @public
 * Stable public surface shape consumed by the operation helpers.
 */
export type DeprecatedOperationSurface<
	L extends DeprecatedDumlingOperationLanguage = DeprecatedDumlingOperationLanguage,
> = {
	inflectionalFeatures?: Record<string, unknown>;
	language: L;
	lemma: DeprecatedOperationLemma<L>;
	normalizedFullSurface: string;
	surfaceKind: string;
} & Record<string, unknown>;

/**
 * @public
 * Stable public hydrated-selection shape consumed by the operation helpers.
 */
export type DeprecatedOperationSelection<
	L extends DeprecatedDumlingOperationLanguage = DeprecatedDumlingOperationLanguage,
> = {
	language: L;
	orthographicStatus: "Standard" | "Typo";
	selectionCoverage: string;
	spelledSelection: string;
	spellingRelation: "Canonical" | "Variant";
	surface: DeprecatedOperationSurface<L>;
} & Record<string, unknown>;

/**
 * @public
 * Overrides for the canonical full-selection helpers.
 */
export type DeprecatedStandardFullSelectionOptions = {
	spelledSelection?: string;
};

/**
 * @public
 * The lemma-backed surface Dumling synthesizes when a lemma has no separate surface payload yet.
 */
export type DeprecatedLemmaSurface<
	LemmaValue extends DeprecatedOperationLemma = DeprecatedOperationLemma,
> = {
	language: LemmaValue["language"];
	normalizedFullSurface: string;
	surfaceKind: "Lemma";
	lemma: LemmaValue;
};

/**
 * @public
 * The canonical fully hydrated selection shape produced by the operation helpers.
 */
export type DeprecatedStandardFullSelection<
	SurfaceValue extends { language: unknown } = DeprecatedOperationSurface,
> = {
	language: SurfaceValue["language"];
	orthographicStatus: "Standard";
	selectionCoverage: "Full";
	spelledSelection: string;
	spellingRelation: "Canonical";
	surface: SurfaceValue;
};

/**
 * @public
 * The language-bound convert and extract helpers returned by `operationForLanguage()`.
 */
export type DeprecatedDumlingOperationApiFor<
	L extends DeprecatedDumlingOperationLanguage = DeprecatedDumlingOperationLanguage,
> = {
	convert: {
		lemma: {
			toSurface: <LemmaValue extends DeprecatedOperationLemma<L>>(
				lemma: LemmaValue,
			) => DeprecatedLemmaSurface<LemmaValue>;
			toStandardFullSelection: <LemmaValue extends DeprecatedOperationLemma<L>>(
				lemma: LemmaValue,
				options?: DeprecatedStandardFullSelectionOptions,
			) => DeprecatedStandardFullSelection<DeprecatedLemmaSurface<LemmaValue>>;
		};
		surface: {
			toStandardFullSelection: <SurfaceValue extends DeprecatedOperationSurface<L>>(
				surface: SurfaceValue,
				options?: DeprecatedStandardFullSelectionOptions,
			) => DeprecatedStandardFullSelection<SurfaceValue>;
		};
	};
	extract: {
		lemma: {
			fromSurface: <SurfaceValue extends DeprecatedOperationSurface<L>>(
				surface: SurfaceValue,
			) => SurfaceValue["lemma"];
		};
		surface: {
			fromSelection: <SelectionValue extends DeprecatedOperationSelection<L>>(
				selection: SelectionValue,
			) => SelectionValue["surface"];
		};
	};
};

/**
 * @public
 * Returns the surface already embedded inside a hydrated selection.
 */
export function deprecatedExtractSurfaceFromSelection<
	SelectionValue extends DeprecatedOperationSelection = DeprecatedOperationSelection,
>(selection: SelectionValue): SelectionValue["surface"] {
	return extractSurfaceFromSelectionInternal(selection) as SelectionValue["surface"];
}

/**
 * @public
 * Returns the lemma already embedded inside a normalized surface DTO.
 */
export function deprecatedExtractLemmaFromSurface<
	SurfaceValue extends DeprecatedOperationSurface = DeprecatedOperationSurface,
>(surface: SurfaceValue): SurfaceValue["lemma"] {
	return extractLemmaFromSurfaceInternal(surface) as SurfaceValue["lemma"];
}

/**
 * @public
 * Builds the canonical lemma-backed surface DTO used by Dumling operations.
 */
export function deprecatedToSurface<LemmaValue extends DeprecatedOperationLemma = DeprecatedOperationLemma>(
	lemma: LemmaValue,
): DeprecatedLemmaSurface<LemmaValue> {
	return toSurfaceInternal(lemma) as DeprecatedLemmaSurface<LemmaValue>;
}

/**
 * @public
 * Builds the canonical `Standard` + `Full` selection DTO from an existing surface DTO.
 */
export function deprecatedToStandardFullSelection<
	SurfaceValue extends DeprecatedOperationSurface = DeprecatedOperationSurface,
>(
	surface: SurfaceValue,
	options?: DeprecatedStandardFullSelectionOptions,
): DeprecatedStandardFullSelection<SurfaceValue> {
	return toStandardFullSelectionInternal(
		surface,
		options,
	) as DeprecatedStandardFullSelection<SurfaceValue>;
}

/**
 * @public
 * Builds the canonical `Standard` + `Full` selection DTO directly from a lemma by first synthesizing its lemma-backed surface.
 */
export function deprecatedToStandardFullSelectionFromLemma<
	LemmaValue extends DeprecatedOperationLemma = DeprecatedOperationLemma,
>(
	lemma: LemmaValue,
	options?: DeprecatedStandardFullSelectionOptions,
): DeprecatedStandardFullSelection<DeprecatedLemmaSurface<LemmaValue>> {
	return toStandardFullSelectionFromLemmaInternal(
		lemma,
		options,
	) as DeprecatedStandardFullSelection<DeprecatedLemmaSurface<LemmaValue>>;
}

/**
 * @public
 * Creates convert and extract helpers locked to one language so mixed-language DTOs fail fast.
 */
export function deprecatedOperationForLanguage<L extends DeprecatedDumlingOperationLanguage>(
	language: L,
): DeprecatedDumlingOperationApiFor<L> {
	return operationForLanguageInternal(language) as DeprecatedDumlingOperationApiFor<L>;
}
