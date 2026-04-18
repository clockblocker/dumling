import { deprecatedGetOperationPack } from "./internal/operations/operation-pack-registry";
import {
	type DeprecatedHydratedSelectionLikeFor,
	type DeprecatedLemmaLike,
	type DeprecatedLemmaOfSurface,
	type DeprecatedLemmaSurfaceFor,
	type DeprecatedStandardFullSelectionForLemma,
	type DeprecatedStandardFullSelectionForSurface,
	type DeprecatedSurfaceLike,
	type DeprecatedSurfaceOfSelection,
	deprecatedAssertLanguageMatch,
} from "./internal/operations/shared";
import type { DeprecatedTargetLanguage } from "./universal/enums/core/language";

/** @public Returns the already-hydrated surface payload from a selection DTO without recomputing anything. */
export const deprecatedExtractSurfaceFromSelection = (<
	S extends DeprecatedHydratedSelectionLikeFor,
>(
	selection: S,
) => selection.surface as DeprecatedSurfaceOfSelection<S>) as ExtractSurfaceFromSelectionFn;

/** @public Returns the lemma payload already attached to a surface DTO. */
export const deprecatedExtractLemmaFromSurface = ((surface: DeprecatedSurfaceLike) =>
	surface.lemma) as ExtractLemmaFromSurfaceFn;

/** @public Builds the canonical lemma-backed surface DTO used when no separate inflected surface is involved. */
export const deprecatedToSurface = ((lemma: DeprecatedLemmaLike) => {
	const operationPack = deprecatedGetOperationPack(lemma.language);

	return {
		language: lemma.language,
		normalizedFullSurface: operationPack.normalizeLemmaSurface(lemma),
		surfaceKind: "Lemma",
		lemma,
	};
}) as ToSurfaceFn;

/** @public Builds the canonical `Standard` + `Full` selection DTO for an existing surface, optionally overriding the displayed spelling. */
export const deprecatedToStandardFullSelection = ((
	surface: DeprecatedSurfaceLike,
	options = {},
) => {
	const operationPack = deprecatedGetOperationPack(surface.language);

	return {
		language: surface.language,
		orthographicStatus: "Standard",
		selectionCoverage: "Full",
		spelledSelection:
			options.spelledSelection ??
			operationPack.defaultSpelledSelectionFromSurface?.(surface) ??
			surface.normalizedFullSurface,
		spellingRelation: "Canonical",
		surface,
	};
}) as ToStandardFullSelectionFromSurfaceFn;

/** @public Builds the canonical `Standard` + `Full` selection DTO from a lemma by first deriving its lemma-backed surface DTO. */
export const deprecatedToStandardFullSelectionFromLemma = ((
	lemma: DeprecatedLemmaLike,
	options = {},
) =>
	deprecatedToStandardFullSelection(
		deprecatedToSurface(lemma),
		options,
	)) as ToStandardFullSelectionFromLemmaFn;

/** @public Creates a language-bound operation helper set that rejects mixed-language DTOs before any conversion or extraction runs. */
export function deprecatedOperationForLanguage<L extends DeprecatedTargetLanguage>(language: L) {
	function boundToSurface<T extends DeprecatedLemmaLike<L>>(lemma: T): DeprecatedLemmaSurfaceFor<T> {
		deprecatedAssertLanguageMatch(language, lemma.language);

		return deprecatedToSurface(lemma);
	}

	function boundToStandardFullSelectionFromLemma<T extends DeprecatedLemmaLike<L>>(
		lemma: T,
		options?: StandardFullSelectionOptions,
	): DeprecatedStandardFullSelectionForLemma<T> {
		deprecatedAssertLanguageMatch(language, lemma.language);

		return deprecatedToStandardFullSelectionFromLemma(lemma, options);
	}

	function boundToStandardFullSelectionFromSurface<S extends DeprecatedSurfaceLike<L>>(
		surface: S,
		options?: StandardFullSelectionOptions,
	): DeprecatedStandardFullSelectionForSurface<S> {
		deprecatedAssertLanguageMatch(language, surface.language);

		return deprecatedToStandardFullSelection(surface, options);
	}

	function boundExtractLemmaFromSurface<S extends DeprecatedSurfaceLike<L>>(
		surface: S,
	): DeprecatedLemmaOfSurface<S> {
		deprecatedAssertLanguageMatch(language, surface.language);

		return deprecatedExtractLemmaFromSurface(surface);
	}

	function boundExtractSurfaceFromSelection<
		S extends DeprecatedHydratedSelectionLikeFor<L>,
	>(selection: S): DeprecatedSurfaceOfSelection<S> {
		deprecatedAssertLanguageMatch(language, selection.language);

		return selection.surface as DeprecatedSurfaceOfSelection<S>;
	}

	const api = {
		convert: {
			lemma: {
				toSurface: boundToSurface,
				toStandardFullSelection: boundToStandardFullSelectionFromLemma,
			},
			surface: {
				toStandardFullSelection:
					boundToStandardFullSelectionFromSurface,
			},
		},
		extract: {
			lemma: {
				fromSurface: boundExtractLemmaFromSurface,
			},
			surface: {
				fromSelection: boundExtractSurfaceFromSelection,
			},
		},
	} satisfies LingOperationApi<L>;

	return api;
}

type StandardFullSelectionOptions = {
	spelledSelection?: string;
};

type ExtractSurfaceFromSelectionFn<L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage> =
	<S extends DeprecatedHydratedSelectionLikeFor<L>>(selection: S) => DeprecatedSurfaceOfSelection<S>;

type ExtractLemmaFromSurfaceFn<L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage> = {
	<S extends DeprecatedSurfaceLike<L>>(surface: S): DeprecatedLemmaOfSurface<S>;
};

type ToSurfaceFn<L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage> = <
	T extends DeprecatedLemmaLike<L>,
>(
	lemma: T,
) => DeprecatedLemmaSurfaceFor<T>;

type ToStandardFullSelectionFromSurfaceFn<
	L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage,
> = <S extends DeprecatedSurfaceLike<L>>(
	surface: S,
	options?: StandardFullSelectionOptions,
) => DeprecatedStandardFullSelectionForSurface<S>;

type ToStandardFullSelectionFromLemmaFn<
	L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage,
> = <T extends DeprecatedLemmaLike<L>>(
	lemma: T,
	options?: StandardFullSelectionOptions,
) => DeprecatedStandardFullSelectionForLemma<T>;

type LingOperationApi<L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage> = {
	convert: {
		surface: {
			toStandardFullSelection: ToStandardFullSelectionFromSurfaceFn<L>;
		};
		lemma: {
			toSurface: ToSurfaceFn<L>;
			toStandardFullSelection: ToStandardFullSelectionFromLemmaFn<L>;
		};
	};
	extract: {
		lemma: {
			fromSurface: ExtractLemmaFromSurfaceFn<L>;
		};
		surface: {
			fromSelection: ExtractSurfaceFromSelectionFn<L>;
		};
	};
};
