import type { SupportedLanguage, LemmaKindFor, LemmaSubKindFor, InherentFeaturesFor, Lemma, Surface, LemmaKindForSurfaceKind, Selection, OrthographicStatus, SurfaceKindFor, ApiResult, ParseError, LemmaDescriptor, SurfaceDescriptor, SelectionDescriptor, IdDecodeSuccess, IdDecodeError, EntityKind, LemmaKind, SelectionCoverage, SpellingRelation, SurfaceKind } from "../types/public-types";

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
