import type {
	AbstractInflectionalFeaturesFor,
	AbstractInherentFeaturesFor,
	AbstractLemma,
	AbstractLemmaSubKindFor,
	AbstractSelection,
	AbstractSurface,
} from "./abstract/entities";
import type {
	AbstractFeatureName,
	AbstractFeatureValue as AbstractFeatureValueForName,
} from "./abstract/features/features-catalog";
import type {
	LanguageLemmaUnionMap,
	LanguageSelectionByOrthographicStatusMap,
	LanguageSurfaceUnionMap,
	SurfaceByKindForLanguage,
} from "./concrete-language/concrete-language-types";
import type {
	ConcreteLanguage,
	LanguagePackFeatureRegistry,
} from "./concrete-language/features/feature-registry";
import type {
	LemmaKind as CoreLemmaKind,
	LemmaSubKind as CoreLemmaSubKind,
	OrthographicStatus as CoreOrthographicStatus,
	SelectionCoverage as CoreSelectionCoverage,
	SpellingRelation as CoreSpellingRelation,
	SupportedLanguage as CoreSupportedLanguage,
	SurfaceKind as CoreSurfaceKind,
} from "./core/enums";
import type { PrettifyDeep } from "./core/helpers";

export type SupportedLanguage = CoreSupportedLanguage;
export type Language = SupportedLanguage;
export type LemmaKind = CoreLemmaKind;
export type LemmaSubKind = CoreLemmaSubKind;
export type OrthographicStatus = CoreOrthographicStatus;
export type SelectionCoverage = CoreSelectionCoverage;
export type SpellingRelation = CoreSpellingRelation;
export type SurfaceKind = CoreSurfaceKind;
export type EntityKind = "Lemma" | "Surface" | "Selection";
export type EntityValue<L extends SupportedLanguage = SupportedLanguage> =
	| Lemma<L>
	| Surface<L>
	| Selection<L>;

export type EntityForKind<
	L extends SupportedLanguage,
	K extends EntityKind,
> = K extends "Lemma"
	? Lemma<L>
	: K extends "Surface"
		? Surface<L>
		: Selection<L>;

export type DumlingCsv<L extends SupportedLanguage = SupportedLanguage> =
	string & {
		readonly __dumlingCsvBrand: {
			readonly language: L;
		};
	};

export type DumlingBase64Url<L extends SupportedLanguage = SupportedLanguage> =
	string & {
		readonly __dumlingBase64UrlBrand: {
			readonly language: L;
		};
	};

export type LemmaKindFor<L extends SupportedLanguage> =
	L extends ConcreteLanguage
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

export type SurfaceKindFor<L extends SupportedLanguage> =
	L extends ConcreteLanguage
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

export type Lemma<
	L extends SupportedLanguage = SupportedLanguage,
	LK extends LemmaKindFor<L> = LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK> = LemmaSubKindFor<L, LK>,
> = L extends ConcreteLanguage
	? ConcreteLemmaFor<
			L & ConcreteLanguage,
			LK & LemmaKindFor<L & ConcreteLanguage>,
			LSK &
				LemmaSubKindFor<
					L & ConcreteLanguage,
					LK & LemmaKindFor<L & ConcreteLanguage>
				>
		>
	: PlaceholderLemma<L, LK, LSK>;

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
	: PlaceholderSelection<L, OS, SK, LK, LSK>;

export type AttestedSelection<L extends SupportedLanguage = SupportedLanguage> =
	{
		selection: Selection<L>;
		sentenceMarkdown: string;
		classifierNotes?: string;
		lessonsLearned?: string;
	};

export type FeatureSetKind = "inherent" | "inflectional";

type PrettifyFeatureSet<T> = T extends object
	? {
			[K in keyof T as K extends string ? `${K}` : K]: PrettifyDeep<T[K]>;
		} & {}
	: never;

export type FeatureSet<
	L extends SupportedLanguage,
	K extends FeatureSetKind,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = PrettifyFeatureSet<
	L extends ConcreteLanguage
		? LK extends keyof LanguagePackFeatureRegistry[L]
			? LSK extends keyof LanguagePackFeatureRegistry[L][LK]
				? LanguagePackFeatureRegistry[L][LK][LSK] extends infer TFeatureDefinition extends
						{
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
				>
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

export type SelectionOptionsFor<OS extends OrthographicStatus> = {
	orthographicStatus?: OS;
	selectionCoverage?: SelectionCoverage;
	spelledSelection?: string;
	spellingRelation?: SpellingRelation;
};

export type {
	AbstractLemma,
	AbstractSelection,
	AbstractSurface,
	AbstractInherentFeaturesFor,
	AbstractInflectionalFeaturesFor,
	AbstractLemmaSubKindFor,
};

export type {
	ApiResult,
	DumlingApi,
	IdDecodeError,
	IdDecodeSuccess,
	LanguageApi,
	ParseError,
} from "../operations/api-shape";

type PlaceholderLemma<
	L extends SupportedLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = AbstractLemma<
	L,
	LK & LemmaKind,
	LSK & AbstractLemmaSubKindFor<LK & LemmaKind>
>;

type ConcreteLemmaFor<
	L extends ConcreteLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = Extract<LanguageLemmaUnionMap[L], { lemmaKind: LK; lemmaSubKind: LSK }>;

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
	: Record<never, never>);

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
