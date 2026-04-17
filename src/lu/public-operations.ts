import { getOperationPack } from "./internal/operations/operation-pack-registry";
import {
	type HydratedSelectionLikeFor,
	type LemmaLike,
	type LemmaOfSurface,
	type LemmaSurfaceFor,
	type StandardFullSelectionForLemma,
	type StandardFullSelectionForSurface,
	type SurfaceLike,
	type SurfaceOfSelection,
	assertLanguageMatch,
} from "./internal/operations/shared";
import type { TargetLanguage } from "./universal/enums/core/language";

export const extractSurfaceFromSelection = (<
	S extends HydratedSelectionLikeFor,
>(
	selection: S,
) => selection.surface as SurfaceOfSelection<S>) as ExtractSurfaceFromSelectionFn;

export const extractLemmaFromSurface = ((surface: SurfaceLike) =>
	surface.lemma) as ExtractLemmaFromSurfaceFn;

export const toSurface = ((lemma: LemmaLike) => {
	const operationPack = getOperationPack(lemma.language);

	return {
		language: lemma.language,
		normalizedFullSurface: operationPack.normalizeLemmaSurface(lemma),
		surfaceKind: "Lemma",
		lemma,
	};
}) as ToSurfaceFn;

export const toStandardFullSelection = ((
	surface: SurfaceLike,
	options = {},
) => {
	const operationPack = getOperationPack(surface.language);

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

export const toStandardFullSelectionFromLemma = ((
	lemma: LemmaLike,
	options = {},
) =>
	toStandardFullSelection(
		toSurface(lemma),
		options,
	)) as ToStandardFullSelectionFromLemmaFn;

export function operationForLanguage<L extends TargetLanguage>(language: L) {
	function boundToSurface<T extends LemmaLike<L>>(lemma: T): LemmaSurfaceFor<T> {
		assertLanguageMatch(language, lemma.language);

		return toSurface(lemma);
	}

	function boundToStandardFullSelectionFromLemma<T extends LemmaLike<L>>(
		lemma: T,
		options?: StandardFullSelectionOptions,
	): StandardFullSelectionForLemma<T> {
		assertLanguageMatch(language, lemma.language);

		return toStandardFullSelectionFromLemma(lemma, options);
	}

	function boundToStandardFullSelectionFromSurface<S extends SurfaceLike<L>>(
		surface: S,
		options?: StandardFullSelectionOptions,
	): StandardFullSelectionForSurface<S> {
		assertLanguageMatch(language, surface.language);

		return toStandardFullSelection(surface, options);
	}

	function boundExtractLemmaFromSurface<S extends SurfaceLike<L>>(
		surface: S,
	): LemmaOfSurface<S> {
		assertLanguageMatch(language, surface.language);

		return extractLemmaFromSurface(surface);
	}

	function boundExtractSurfaceFromSelection<
		S extends HydratedSelectionLikeFor<L>,
	>(selection: S): SurfaceOfSelection<S> {
		assertLanguageMatch(language, selection.language);

		return selection.surface as SurfaceOfSelection<S>;
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

type ExtractSurfaceFromSelectionFn<L extends TargetLanguage = TargetLanguage> =
	<S extends HydratedSelectionLikeFor<L>>(selection: S) => SurfaceOfSelection<S>;

type ExtractLemmaFromSurfaceFn<L extends TargetLanguage = TargetLanguage> = {
	<S extends SurfaceLike<L>>(surface: S): LemmaOfSurface<S>;
};

type ToSurfaceFn<L extends TargetLanguage = TargetLanguage> = <
	T extends LemmaLike<L>,
>(
	lemma: T,
) => LemmaSurfaceFor<T>;

type ToStandardFullSelectionFromSurfaceFn<
	L extends TargetLanguage = TargetLanguage,
> = <S extends SurfaceLike<L>>(
	surface: S,
	options?: StandardFullSelectionOptions,
) => StandardFullSelectionForSurface<S>;

type ToStandardFullSelectionFromLemmaFn<
	L extends TargetLanguage = TargetLanguage,
> = <T extends LemmaLike<L>>(
	lemma: T,
	options?: StandardFullSelectionOptions,
) => StandardFullSelectionForLemma<T>;

type LingOperationApi<L extends TargetLanguage = TargetLanguage> = {
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
