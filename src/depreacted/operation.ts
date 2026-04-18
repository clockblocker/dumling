import {
	extractLemmaFromSurface as extractLemmaFromSurfaceInternal,
	extractSurfaceFromSelection as extractSurfaceFromSelectionInternal,
	operationForLanguage as operationForLanguageInternal,
	toStandardFullSelection as toStandardFullSelectionInternal,
	toStandardFullSelectionFromLemma as toStandardFullSelectionFromLemmaInternal,
	toSurface as toSurfaceInternal,
} from "./lu/public-operations";

/** @public */
export type DumlingOperationLanguage = "English" | "German" | "Hebrew";

/**
 * @public
 * Stable public lemma shape consumed by the operation helpers.
 */
export type OperationLemma<
	L extends DumlingOperationLanguage = DumlingOperationLanguage,
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
export type OperationSurface<
	L extends DumlingOperationLanguage = DumlingOperationLanguage,
> = {
	inflectionalFeatures?: Record<string, unknown>;
	language: L;
	lemma: OperationLemma<L>;
	normalizedFullSurface: string;
	surfaceKind: string;
} & Record<string, unknown>;

/**
 * @public
 * Stable public hydrated-selection shape consumed by the operation helpers.
 */
export type OperationSelection<
	L extends DumlingOperationLanguage = DumlingOperationLanguage,
> = {
	language: L;
	orthographicStatus: "Standard" | "Typo";
	selectionCoverage: string;
	spelledSelection: string;
	spellingRelation: "Canonical" | "Variant";
	surface: OperationSurface<L>;
} & Record<string, unknown>;

/**
 * @public
 * Overrides for the canonical full-selection helpers.
 */
export type StandardFullSelectionOptions = {
	spelledSelection?: string;
};

/**
 * @public
 * The lemma-backed surface Dumling synthesizes when a lemma has no separate surface payload yet.
 */
export type LemmaSurface<
	LemmaValue extends OperationLemma = OperationLemma,
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
export type StandardFullSelection<
	SurfaceValue extends { language: unknown } = OperationSurface,
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
export type DumlingOperationApiFor<
	L extends DumlingOperationLanguage = DumlingOperationLanguage,
> = {
	convert: {
		lemma: {
			toSurface: <LemmaValue extends OperationLemma<L>>(
				lemma: LemmaValue,
			) => LemmaSurface<LemmaValue>;
			toStandardFullSelection: <LemmaValue extends OperationLemma<L>>(
				lemma: LemmaValue,
				options?: StandardFullSelectionOptions,
			) => StandardFullSelection<LemmaSurface<LemmaValue>>;
		};
		surface: {
			toStandardFullSelection: <SurfaceValue extends OperationSurface<L>>(
				surface: SurfaceValue,
				options?: StandardFullSelectionOptions,
			) => StandardFullSelection<SurfaceValue>;
		};
	};
	extract: {
		lemma: {
			fromSurface: <SurfaceValue extends OperationSurface<L>>(
				surface: SurfaceValue,
			) => SurfaceValue["lemma"];
		};
		surface: {
			fromSelection: <SelectionValue extends OperationSelection<L>>(
				selection: SelectionValue,
			) => SelectionValue["surface"];
		};
	};
};

/**
 * @public
 * Returns the surface already embedded inside a hydrated selection.
 */
export function extractSurfaceFromSelection<
	SelectionValue extends OperationSelection = OperationSelection,
>(selection: SelectionValue): SelectionValue["surface"] {
	return extractSurfaceFromSelectionInternal(selection) as SelectionValue["surface"];
}

/**
 * @public
 * Returns the lemma already embedded inside a normalized surface DTO.
 */
export function extractLemmaFromSurface<
	SurfaceValue extends OperationSurface = OperationSurface,
>(surface: SurfaceValue): SurfaceValue["lemma"] {
	return extractLemmaFromSurfaceInternal(surface) as SurfaceValue["lemma"];
}

/**
 * @public
 * Builds the canonical lemma-backed surface DTO used by Dumling operations.
 */
export function toSurface<LemmaValue extends OperationLemma = OperationLemma>(
	lemma: LemmaValue,
): LemmaSurface<LemmaValue> {
	return toSurfaceInternal(lemma) as LemmaSurface<LemmaValue>;
}

/**
 * @public
 * Builds the canonical `Standard` + `Full` selection DTO from an existing surface DTO.
 */
export function toStandardFullSelection<
	SurfaceValue extends OperationSurface = OperationSurface,
>(
	surface: SurfaceValue,
	options?: StandardFullSelectionOptions,
): StandardFullSelection<SurfaceValue> {
	return toStandardFullSelectionInternal(
		surface,
		options,
	) as StandardFullSelection<SurfaceValue>;
}

/**
 * @public
 * Builds the canonical `Standard` + `Full` selection DTO directly from a lemma by first synthesizing its lemma-backed surface.
 */
export function toStandardFullSelectionFromLemma<
	LemmaValue extends OperationLemma = OperationLemma,
>(
	lemma: LemmaValue,
	options?: StandardFullSelectionOptions,
): StandardFullSelection<LemmaSurface<LemmaValue>> {
	return toStandardFullSelectionFromLemmaInternal(
		lemma,
		options,
	) as StandardFullSelection<LemmaSurface<LemmaValue>>;
}

/**
 * @public
 * Creates convert and extract helpers locked to one language so mixed-language DTOs fail fast.
 */
export function operationForLanguage<L extends DumlingOperationLanguage>(
	language: L,
): DumlingOperationApiFor<L> {
	return operationForLanguageInternal(language) as DumlingOperationApiFor<L>;
}
