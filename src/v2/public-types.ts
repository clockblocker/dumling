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
import type { LanguageTypePackMap } from "./language-packs/type-packs";
import type { EnLemmaByKind } from "./types/language-packs/en/en-lemma";
import type { EnSelectionByOrthographicStatus } from "./types/language-packs/en/en-selection";
import type { EnSurfaceByKind } from "./types/language-packs/en/en-surface";
import type { DeLemmaByKind } from "./types/language-packs/de/de-lemma";
import type { DeSelectionByOrthographicStatus } from "./types/language-packs/de/de-selection";
import type { DeSurfaceByKind } from "./types/language-packs/de/de-surface";

type Simplify<T> = { [K in keyof T]: T[K] } & {};
type PackLemma<L extends SupportedLanguage> = LanguageTypePackMap[L]["lemma"];
type PackSurface<L extends SupportedLanguage> = LanguageTypePackMap[L]["surface"];
type PackSelection<L extends SupportedLanguage> =
	LanguageTypePackMap[L]["selection"];
type ConcreteLemmaByKindMap = {
	de: DeLemmaByKind;
	en: EnLemmaByKind;
};
type ConcreteSurfaceByKindMap = {
	de: DeSurfaceByKind;
	en: EnSurfaceByKind;
};
type ConcreteSelectionByStatusMap = {
	de: DeSelectionByOrthographicStatus;
	en: EnSelectionByOrthographicStatus;
};
type ConcreteLanguage = keyof ConcreteLemmaByKindMap;

type EntityForKind<
	L extends SupportedLanguage,
	K extends EntityKind,
> = K extends "Lemma"
	? Lemma<L>
	: K extends "Surface"
		? Surface<L>
		: Selection<L>;

type LemmaSurfaceKind<L extends SupportedLanguage> = Extract<
	SurfaceKindFor<L>,
	"Lemma"
>;
type InflectionSurfaceKind<L extends SupportedLanguage> = Extract<
	SurfaceKindFor<L>,
	"Inflection"
>;

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
export type LemmaKindFor<L extends SupportedLanguage> = L extends ConcreteLanguage
	? keyof ConcreteLemmaByKindMap[L]
	: LemmaKind;

export type LemmaSubKindFor<
	L extends SupportedLanguage,
	LK extends string,
> = L extends ConcreteLanguage
	? LK extends keyof ConcreteLemmaByKindMap[L]
		? keyof ConcreteLemmaByKindMap[L][LK]
		: never
	: LK extends LemmaKind
		? AbstractLemmaSubKindFor<LK>
		: never;

export type SurfaceKindFor<L extends SupportedLanguage> = L extends ConcreteLanguage
	? keyof ConcreteSurfaceByKindMap[L]
	: SurfaceKind;

export type LemmaKindForSurfaceKind<
	L extends SupportedLanguage,
	SK extends SurfaceKindFor<L>,
> = LemmaKindFor<L>;

type PlaceholderLemma<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = AbstractLemma<L, LK & LemmaKind, LSK & AbstractLemmaSubKindFor<LK & LemmaKind>>;

type ConcreteLemmaFor<
	L extends ConcreteLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = LK extends keyof ConcreteLemmaByKindMap[L]
	? LSK extends keyof ConcreteLemmaByKindMap[L][LK]
		? ConcreteLemmaByKindMap[L][LK][LSK]
		: never
	: never;

export type Lemma<
	L extends SupportedLanguage = SupportedLanguage,
	LK extends LemmaKindFor<L> = LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = L extends ConcreteLanguage
	? ConcreteLemmaFor<
			L & ConcreteLanguage,
			LK & LemmaKindFor<L & ConcreteLanguage>,
			LSK & LemmaSubKindFor<L & ConcreteLanguage, LK & LemmaKindFor<L & ConcreteLanguage>>
		>
	: PlaceholderLemma<L, LK, LSK>;

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

type ConcreteSurfaceFor<
	L extends ConcreteLanguage,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = SK extends keyof ConcreteSurfaceByKindMap[L]
	? LK extends keyof ConcreteSurfaceByKindMap[L][SK]
		? LSK extends keyof ConcreteSurfaceByKindMap[L][SK][LK]
			? ConcreteSurfaceByKindMap[L][SK][LK][LSK]
			: never
		: never
	: never;

export type Surface<
	L extends SupportedLanguage = SupportedLanguage,
	SK extends SurfaceKindFor<L> = SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK> = LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = L extends ConcreteLanguage
	? ConcreteSurfaceFor<
			L & ConcreteLanguage,
			SK & SurfaceKindFor<L & ConcreteLanguage>,
			LK &
				LemmaKindForSurfaceKind<
					L & ConcreteLanguage,
					SK & SurfaceKindFor<L & ConcreteLanguage>
				>,
			LSK &
				LemmaSubKindFor<
					L & ConcreteLanguage,
					LK &
						LemmaKindForSurfaceKind<
							L & ConcreteLanguage,
							SK & SurfaceKindFor<L & ConcreteLanguage>
						>
				>
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

type ConcreteSelectionFor<
	L extends ConcreteLanguage,
	OS extends OrthographicStatus,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
	LSK extends LemmaSubKindFor<L, LK>,
> = OS extends keyof ConcreteSelectionByStatusMap[L]
	? SK extends keyof ConcreteSelectionByStatusMap[L][OS]
		? LK extends keyof ConcreteSelectionByStatusMap[L][OS][SK]
			? LSK extends keyof ConcreteSelectionByStatusMap[L][OS][SK][LK]
				? ConcreteSelectionByStatusMap[L][OS][SK][LK][LSK]
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
> = L extends ConcreteLanguage
	? ConcreteSelectionFor<
			L & ConcreteLanguage,
			OS,
			SK & SurfaceKindFor<L & ConcreteLanguage>,
			LK &
				LemmaKindForSurfaceKind<
					L & ConcreteLanguage,
					SK & SurfaceKindFor<L & ConcreteLanguage>
				>,
			LSK & LemmaSubKindFor<
				L & ConcreteLanguage,
				LK &
					LemmaKindForSurfaceKind<
						L & ConcreteLanguage,
						SK & SurfaceKindFor<L & ConcreteLanguage>
					>
			>
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
> = Surface<
	L,
	"Inflection" & SurfaceKindFor<L>,
	LK & LemmaKindForSurfaceKind<L, "Inflection" & SurfaceKindFor<L>>,
	LSK
> extends { inflectionalFeatures: infer Features }
	? Features
	: never;

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
			lemma<
				TSurface extends Surface<
					L,
					LemmaSurfaceKind<L>,
					LemmaKindForSurfaceKind<L, LemmaSurfaceKind<L>>,
					LemmaSubKindFor<L, LemmaKindFor<L>>
				>,
			>(
				input: Omit<TSurface, "language" | "surfaceKind"> & {
					language?: unknown;
					surfaceKind?: unknown;
				},
			): TSurface;
			inflection<
				TSurface extends Surface<
					L,
					InflectionSurfaceKind<L>,
					LemmaKindForSurfaceKind<L, InflectionSurfaceKind<L>>,
					LemmaSubKindFor<L, LemmaKindFor<L>>
				>,
			>(
				input: Omit<TSurface, "language" | "surfaceKind"> & {
					language?: unknown;
					surfaceKind?: unknown;
				},
			): TSurface;
		};
		selection: {
			standard<TSelection extends Selection<L, "Standard">>(
				input: Omit<TSelection, "language" | "orthographicStatus"> & {
					language?: unknown;
					orthographicStatus?: unknown;
				},
			): TSelection;
			typo<TSelection extends Selection<L, "Typo">>(
				input: Omit<TSelection, "language" | "orthographicStatus"> & {
					language?: unknown;
					orthographicStatus?: unknown;
				},
			): TSelection;
		};
	};
	convert: {
		lemma: {
			toSurface<TLemma extends Lemma<L>>(
				lemma: TLemma,
			): Surface<
				L,
				LemmaSurfaceKind<L>,
				TLemma["lemmaKind"] & LemmaKindForSurfaceKind<L, LemmaSurfaceKind<L>>,
				TLemma["lemmaSubKind"] &
					LemmaSubKindFor<L, TLemma["lemmaKind"] & LemmaKindFor<L>>
			>;
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
		decodeAs<K extends EntityKind>(
			kind: K,
			id: string,
		): ApiResult<EntityForKind<L, K>, IdDecodeError>;
	};
};

export type DumlingApi = {
	de: LanguageApi<"de">;
	en: LanguageApi<"en">;
	he: LanguageApi<"he">;
};
