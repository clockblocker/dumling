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
import type {
	LanguageLemmaUnionMap,
	LanguageSelectionByOrthographicStatusMap,
	LanguageSurfaceUnionMap,
	SurfaceByKindForLanguage,
} from "./types/concrete-language/concrete-language-types";
import type {
	ConcreteLanguage,
	LanguagePackFeatureRegistry,
} from "./types/concrete-language/features/feature-registry";

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
type EntityValue<L extends SupportedLanguage> = Lemma<L> | Surface<L> | Selection<L>;
type EntityLemmaKind<TValue> = TValue extends { lemmaKind: infer LK extends LemmaKind }
	? LK
	: TValue extends { lemma: { lemmaKind: infer LK extends LemmaKind } }
		? LK
		: TValue extends {
					surface: { lemma: { lemmaKind: infer LK extends LemmaKind } };
			  }
			? LK
			: never;
type EntityLemmaSubKind<TValue> = TValue extends {
	lemmaSubKind: infer LSK extends string;
}
	? LSK
	: TValue extends { lemma: { lemmaSubKind: infer LSK extends string } }
		? LSK
		: TValue extends {
					surface: { lemma: { lemmaSubKind: infer LSK extends string } };
			  }
			? LSK
			: never;
type EntitySurfaceKind<TValue> = TValue extends {
	surfaceKind: infer SK extends SurfaceKind;
}
	? SK
	: TValue extends {
				surface: { surfaceKind: infer SK extends SurfaceKind };
		  }
		? SK
		: TValue extends { lemmaKind: LemmaKind; lemmaSubKind: string }
			? "Lemma"
			: never;
type EntityOrthographicStatus<TValue> = TValue extends {
	orthographicStatus: infer OS extends OrthographicStatus;
}
	? OS
	: TValue extends { language: SupportedLanguage }
		? "Standard"
		: never;
type SelectionOptionsFor<OS extends OrthographicStatus> = {
	orthographicStatus?: OS;
	selectionCoverage?: SelectionCoverage;
	spelledSelection?: string;
	spellingRelation?: SpellingRelation;
};

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
	? Extract<keyof LanguagePackFeatureRegistry[L], LemmaKind>
	: LemmaKind;

export type LemmaSubKindFor<
	L extends SupportedLanguage,
	LK extends string,
> = L extends ConcreteLanguage
	? LK extends LemmaKindFor<L>
		? Extract<
				keyof LanguagePackFeatureRegistry[L][LK],
				AbstractLemmaSubKindFor<LK & LemmaKind>
			>
		: never
	: LK extends LemmaKind
		? AbstractLemmaSubKindFor<LK>
		: never;

export type SurfaceKindFor<L extends SupportedLanguage> = L extends ConcreteLanguage
	? Extract<keyof SurfaceByKindForLanguage<L>, SurfaceKind>
	: SurfaceKind;

export type LemmaKindForSurfaceKind<
	L extends SupportedLanguage,
	SK extends SurfaceKindFor<L>,
> = L extends ConcreteLanguage
	? SK extends keyof SurfaceByKindForLanguage<L>
		? Extract<keyof SurfaceByKindForLanguage<L>[SK], LemmaKindFor<L>>
		: never
	: LemmaKindFor<L>;

type PlaceholderLemma<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = AbstractLemma<L, LK & LemmaKind, LSK & AbstractLemmaSubKindFor<LK & LemmaKind>>;

type ConcreteLemmaFor<
	L extends ConcreteLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = Extract<
	LanguageLemmaUnionMap[L],
	{ lemmaKind: LK; lemmaSubKind: LSK }
>;

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
> = LanguageSurfaceUnionMap[L] extends infer TSurface
	? TSurface extends {
			surfaceKind: SK;
			lemma: { lemmaKind: LK; lemmaSubKind: LSK };
		}
		? TSurface
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
> = OS extends keyof LanguageSelectionByOrthographicStatusMap[L]
	? SK extends keyof LanguageSelectionByOrthographicStatusMap[L][OS]
		? LK extends keyof LanguageSelectionByOrthographicStatusMap[L][OS][SK]
			? LSK extends keyof LanguageSelectionByOrthographicStatusMap[L][OS][SK][LK]
				? LanguageSelectionByOrthographicStatusMap[L][OS][SK][LK][LSK]
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

export type FeatureSetKind = "inherent" | "inflectional";

export type FeatureSet<
	L extends SupportedLanguage,
	K extends FeatureSetKind,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = L extends ConcreteLanguage
	? LK extends keyof LanguagePackFeatureRegistry[L]
		? LSK extends keyof LanguagePackFeatureRegistry[L][LK]
			? LanguagePackFeatureRegistry[L][LK][LSK] extends infer TFeatureDefinition extends {
					inflectional: Record<string, unknown>;
					inherent: Record<string, unknown>;
			  }
				? TFeatureDefinition[K]
				: never
			: never
		: never
	: K extends "inherent"
		? AbstractInherentFeaturesFor<
				LK & LemmaKind,
				LSK & AbstractLemmaSubKindFor<LK & LemmaKind>
			>
		: AbstractInflectionalFeaturesFor<
				LK & LemmaKind,
				LSK & AbstractLemmaSubKindFor<LK & LemmaKind>
			>;

export type InherentFeaturesFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = FeatureSet<L, "inherent", LK, LSK>;

export type InflectionalFeaturesFor<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = FeatureSet<L, "inflectional", LK, LSK>;

export type AbstractFeatureValue<F extends AbstractFeatureName> =
	AbstractFeatureValueForName<F>;

export type FeatureName<
	L extends SupportedLanguage,
	K extends FeatureSetKind,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = Extract<
	FeatureSet<L, K, LK, LSK> extends infer TFeatureSet
		? TFeatureSet extends unknown
			? keyof TFeatureSet
			: never
		: never,
	AbstractFeatureName
>;

export type FeatureValue<
	L extends SupportedLanguage,
	K extends FeatureSetKind,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
	F extends FeatureName<L, K, LK, LSK>,
> = FeatureSet<L, K, LK, LSK> extends infer TFeatureSet
	? TFeatureSet extends unknown
		? F extends keyof TFeatureSet
			? TFeatureSet[F]
			: never
		: never
	: never;

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
			toSelection<
				TLemma extends Lemma<L>,
				TStatus extends OrthographicStatus = "Standard",
			>(
				lemma: TLemma,
				options?: SelectionOptionsFor<TStatus>,
			): Selection<
				L,
				TStatus,
				LemmaSurfaceKind<L>,
				TLemma["lemmaKind"] & LemmaKindForSurfaceKind<L, LemmaSurfaceKind<L>>,
				TLemma["lemmaSubKind"] &
					LemmaSubKindFor<L, TLemma["lemmaKind"] & LemmaKindFor<L>>
			>;
		};
		surface: {
			toSelection<
				TSurface extends Surface<L>,
				TStatus extends OrthographicStatus = "Standard",
			>(
				surface: TSurface,
				options?: SelectionOptionsFor<TStatus>,
			): Selection<
				L,
				TStatus,
				TSurface["surfaceKind"] & SurfaceKindFor<L>,
				TSurface["lemma"]["lemmaKind"] &
					LemmaKindForSurfaceKind<
						L,
						TSurface["surfaceKind"] & SurfaceKindFor<L>
					>,
				TSurface["lemma"]["lemmaSubKind"] &
					LemmaSubKindFor<
						L,
						TSurface["lemma"]["lemmaKind"] & LemmaKindFor<L>
					>
			>;
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
			lemma<TValue extends EntityValue<L>>(
				value: TValue,
			): LemmaDescriptor<
				L,
				EntityLemmaKind<TValue> & LemmaKindFor<L>,
				EntityLemmaSubKind<TValue> &
					LemmaSubKindFor<L, EntityLemmaKind<TValue> & LemmaKindFor<L>>
			>;
			surface<TValue extends EntityValue<L>>(
				value: TValue,
			): SurfaceDescriptor<
				L,
				EntitySurfaceKind<TValue> & SurfaceKindFor<L>,
				EntityLemmaKind<TValue> &
					LemmaKindForSurfaceKind<
						L,
						EntitySurfaceKind<TValue> & SurfaceKindFor<L>
					>,
				EntityLemmaSubKind<TValue> &
					LemmaSubKindFor<L, EntityLemmaKind<TValue> & LemmaKindFor<L>>
			>;
			selection<TValue extends EntityValue<L>>(
				value: TValue,
			): SelectionDescriptor<
				L,
				EntityOrthographicStatus<TValue> & OrthographicStatus,
				EntitySurfaceKind<TValue> & SurfaceKindFor<L>,
				EntityLemmaKind<TValue> &
					LemmaKindForSurfaceKind<
						L,
						EntitySurfaceKind<TValue> & SurfaceKindFor<L>
					>,
				EntityLemmaSubKind<TValue> &
					LemmaSubKindFor<L, EntityLemmaKind<TValue> & LemmaKindFor<L>>
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
