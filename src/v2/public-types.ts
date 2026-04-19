import type {
	AbstractLanguageTag,
	LemmaKind,
	LemmaSubKind,
	OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
	SupportedLanguage,
	SurfaceKind,
} from "./types/core/enums";
import type {
	AbstractInflectionalFeaturesFor,
	AbstractInherentFeaturesFor,
	AbstractLemma,
	AbstractLemmaSubKindFor,
	AbstractSelection,
	AbstractSurface,
} from "./types/abstract/entities";
import type {
	AbstractFeatureName,
	AbstractFeatureValue as AbstractFeatureValueForName,
} from "./types/abstract/features/features";
import type { DeLemmaByKind } from "./types/language-packs/de/de-lemma";
import type { DeSelectionByOrthographicStatus } from "./types/language-packs/de/de-selection";
import type { DeSurfaceByKind } from "./types/language-packs/de/de-surface";

type Simplify<T> = { [K in keyof T]: T[K] } & {};

export type {
	AbstractLanguageTag,
	LemmaKind,
	LemmaSubKind,
	OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
	SupportedLanguage,
	SurfaceKind,
};

export type Language = SupportedLanguage;
export type EntityKind = "Lemma" | "Surface" | "Selection";

export type ApiResult<T, E> =
	| { success: true; data: T; error?: undefined }
	| { success: false; data?: undefined; error: E };

export type ParseErrorCode = "InvalidInput" | "LanguageNotImplemented";
export type ParseError = {
	code: ParseErrorCode;
	language?: SupportedLanguage;
	message: string;
	issues?: string[];
};

export type IdDecodeErrorCode =
	| "MalformedId"
	| "UnsupportedIdVersion"
	| "LanguageMismatch"
	| "EntityMismatch"
	| "InvalidPayload"
	| "LanguageNotImplemented";

export type IdDecodeError = {
	code: IdDecodeErrorCode;
	language?: SupportedLanguage;
	message: string;
};

export type IdDecodeSuccess<L extends SupportedLanguage = SupportedLanguage> = {
	entityKind: EntityKind;
	data: Lemma<L> | Surface<L> | Selection<L>;
};

export type LemmaKindFor<L extends SupportedLanguage> = L extends "de"
	? keyof DeLemmaByKind
	: LemmaKind;

export type LemmaSubKindFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
> = L extends "de"
	? LK extends keyof DeLemmaByKind
		? keyof DeLemmaByKind[LK]
		: never
	: LK extends LemmaKind
		? AbstractLemmaSubKindFor<LK>
		: never;

export type SurfaceKindFor<L extends SupportedLanguage> = L extends "de"
	? keyof DeSurfaceByKind
	: SurfaceKind;

export type LemmaKindForSurfaceKind<
	L extends SupportedLanguage,
	SK extends SurfaceKindFor<L>,
> = L extends "de"
	? SK extends keyof DeSurfaceByKind
		? keyof DeSurfaceByKind[SK]
		: never
	: LemmaKindFor<L>;

type PlaceholderLemma<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = AbstractLemma<L, LK & LemmaKind, LSK & AbstractLemmaSubKindFor<LK & LemmaKind>>;

type DeLemmaFor<
	LK extends LemmaKindFor<"de">,
	LSK extends LemmaSubKindFor<"de", LK>,
> = LK extends keyof DeLemmaByKind
	? LSK extends keyof DeLemmaByKind[LK]
		? DeLemmaByKind[LK][LSK]
		: never
	: never;

export type Lemma<
	L extends SupportedLanguage = SupportedLanguage,
	LK extends LemmaKindFor<L> = LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = L extends "de" ? DeLemmaFor<LK & LemmaKindFor<"de">, LSK & LemmaSubKindFor<"de", LK & LemmaKindFor<"de">>> : PlaceholderLemma<L, LK, LSK>;

type PlaceholderSurface<
	L extends SupportedLanguage,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	normalizedFullSurface: string;
	surfaceKind: SK;
	lemma: Lemma<L, LK, LSK>;
} & (SK extends "Inflection"
	? {
			inflectionalFeatures: AbstractInflectionalFeaturesFor<
				LK & LemmaKind,
				LSK & AbstractLemmaSubKindFor<LK & LemmaKind>
			>;
		}
	: {});

type DeSurfaceFor<
	SK extends SurfaceKindFor<"de">,
	LK extends LemmaKindForSurfaceKind<"de", SK>,
	LSK extends LemmaSubKindFor<"de", LK>,
> = SK extends keyof DeSurfaceByKind
	? LK extends keyof DeSurfaceByKind[SK]
		? LSK extends keyof DeSurfaceByKind[SK][LK]
			? DeSurfaceByKind[SK][LK][LSK]
			: never
		: never
	: never;

export type Surface<
	L extends SupportedLanguage = SupportedLanguage,
	SK extends SurfaceKindFor<L> = SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK> = LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = L extends "de"
	? DeSurfaceFor<
			SK & SurfaceKindFor<"de">,
			LK & LemmaKindForSurfaceKind<"de", SK & SurfaceKindFor<"de">>,
			LSK & LemmaSubKindFor<"de", LK & LemmaKindForSurfaceKind<"de", SK & SurfaceKindFor<"de">>>
		>
	: PlaceholderSurface<L, SK, LK, LSK>;

type PlaceholderSelection<
	L extends SupportedLanguage,
	OS extends OrthographicStatus,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	orthographicStatus: OS;
	selectionCoverage: SelectionCoverage;
	spelledSelection: string;
	spellingRelation: SpellingRelation;
	surface: Surface<L, SK, LK, LSK>;
};

type DeSelectionFor<
	OS extends OrthographicStatus,
	SK extends SurfaceKindFor<"de">,
	LK extends LemmaKindForSurfaceKind<"de", SK>,
	LSK extends LemmaSubKindFor<"de", LK>,
> = OS extends keyof DeSelectionByOrthographicStatus
	? SK extends keyof DeSelectionByOrthographicStatus[OS]
		? LK extends keyof DeSelectionByOrthographicStatus[OS][SK]
			? LSK extends keyof DeSelectionByOrthographicStatus[OS][SK][LK]
				? DeSelectionByOrthographicStatus[OS][SK][LK][LSK]
				: never
			: never
		: never
	: never;

export type Selection<
	L extends SupportedLanguage = SupportedLanguage,
	OS extends OrthographicStatus = OrthographicStatus,
	SK extends SurfaceKindFor<L> = SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK> = LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = L extends "de"
	? DeSelectionFor<
			OS,
			SK & SurfaceKindFor<"de">,
			LK & LemmaKindForSurfaceKind<"de", SK & SurfaceKindFor<"de">>,
			LSK & LemmaSubKindFor<"de", LK & LemmaKindForSurfaceKind<"de", SK & SurfaceKindFor<"de">>>
		>
	: PlaceholderSelection<L, OS, SK, LK, LSK>;

export type InherentFeaturesFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = Lemma<L, LK, LSK>["inherentFeatures"];

export type InflectionalFeaturesFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = L extends "de"
	? Surface<
			L,
			"Inflection" & SurfaceKindFor<L>,
			LK & LemmaKindForSurfaceKind<L, "Inflection" & SurfaceKindFor<L>>,
			LSK & LemmaSubKindFor<L, LK>
		> extends { inflectionalFeatures: infer Features }
		? Features
		: never
	: AbstractInflectionalFeaturesFor<
			LK & LemmaKind,
			LSK & AbstractLemmaSubKindFor<LK & LemmaKind>
		>;

export type FeatureBagFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = Simplify<
	InherentFeaturesFor<L, LK, LSK> &
		(InflectionalFeaturesFor<L, LK, LSK> extends never
			? {}
			: InflectionalFeaturesFor<L, LK, LSK>)
>;

export type FeatureName = AbstractFeatureName;
export type AbstractFeatureValue<F extends FeatureName> =
	AbstractFeatureValueForName<F>;
export type FeatureNameFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = Extract<keyof FeatureBagFor<L, LK, LSK>, FeatureName>;
export type FeatureValueFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
	F extends FeatureNameFor<L, LK, LSK>,
> = FeatureBagFor<L, LK, LSK>[F];

export type LemmaDescriptor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

export type SurfaceDescriptor<
	L extends SupportedLanguage,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	surfaceKind: SK;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

export type SelectionDescriptor<
	L extends SupportedLanguage,
	OS extends OrthographicStatus,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	language: L;
	orthographicStatus: OS;
	surfaceKind: SK;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

export type {
	AbstractLemma,
	AbstractSelection,
	AbstractSurface,
	AbstractInherentFeaturesFor,
	AbstractInflectionalFeaturesFor,
	AbstractLemmaSubKindFor,
};

export type LanguageApi<L extends SupportedLanguage> = {
	create: {
		lemma<
			LK extends LemmaKindFor<L>,
			LSK extends LemmaSubKindFor<L, LK>,
		>(
			input: {
				canonicalLemma: string;
				lemmaKind: LK;
				lemmaSubKind: LSK;
				inherentFeatures: InherentFeaturesFor<L, LK, LSK>;
				meaningInEmojis: string;
				language?: unknown;
			},
		): Lemma<L, LK, LSK>;
		surface: {
			lemma(
				input: Omit<Surface<L>, "language" | "surfaceKind"> & {
					language?: unknown;
					surfaceKind?: unknown;
				},
			): Surface<L>;
			inflection(
				input: Omit<Surface<L>, "language" | "surfaceKind"> & {
					language?: unknown;
					surfaceKind?: unknown;
				},
			): Surface<L>;
		};
		selection: {
			standard(
				input: Omit<Selection<L>, "language" | "orthographicStatus"> & {
					language?: unknown;
					orthographicStatus?: unknown;
				},
			): Selection<L>;
			typo(
				input: Omit<Selection<L>, "language" | "orthographicStatus"> & {
					language?: unknown;
					orthographicStatus?: unknown;
				},
			): Selection<L>;
		};
	};
	convert: {
		lemma: {
			toSurface(lemma: Lemma<L>): Surface<L>;
			toSelection(
				lemma: Lemma<L>,
				options?: Partial<
					Pick<
						Selection<L>,
						| "orthographicStatus"
						| "selectionCoverage"
						| "spelledSelection"
						| "spellingRelation"
					>
				>,
			): Selection<L>;
		};
		surface: {
			toSelection(
				surface: Surface<L>,
				options?: Partial<
					Pick<
						Selection<L>,
						| "orthographicStatus"
						| "selectionCoverage"
						| "spelledSelection"
						| "spellingRelation"
					>
				>,
			): Selection<L>;
		};
	};
	extract: {
		lemma(value: Lemma<L> | Surface<L> | Selection<L>): Lemma<L>;
	};
	parse: {
		lemma(input: unknown): ApiResult<Lemma<L>, ParseError>;
		surface(input: unknown): ApiResult<Surface<L>, ParseError>;
		selection(input: unknown): ApiResult<Selection<L>, ParseError>;
	};
	describe: {
		as: {
			lemma(
				value: Lemma<L> | Surface<L> | Selection<L>,
			): LemmaDescriptor<L, LemmaKindFor<L>, LemmaSubKindFor<L, LemmaKindFor<L>>>;
			surface(
				value: Lemma<L> | Surface<L> | Selection<L>,
			): SurfaceDescriptor<
				L,
				SurfaceKindFor<L>,
				LemmaKindForSurfaceKind<L, SurfaceKindFor<L>>,
				LemmaSubKindFor<L, LemmaKindFor<L>>
			>;
			selection(
				value: Lemma<L> | Surface<L> | Selection<L>,
			): SelectionDescriptor<
				L,
				OrthographicStatus,
				SurfaceKindFor<L>,
				LemmaKindForSurfaceKind<L, SurfaceKindFor<L>>,
				LemmaSubKindFor<L, LemmaKindFor<L>>
			>;
		};
	};
	id: {
		encode(value: Lemma<L> | Surface<L> | Selection<L>): string;
		decode(id: string): ApiResult<IdDecodeSuccess<L>, IdDecodeError>;
		decodeAs(
			kind: EntityKind,
			id: string,
		): ApiResult<Lemma<L> | Surface<L> | Selection<L>, IdDecodeError>;
	};
};

export type DumlingApi = {
	de: LanguageApi<"de">;
	en: LanguageApi<"en">;
	he: LanguageApi<"he">;
};
