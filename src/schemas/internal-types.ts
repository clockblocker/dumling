import type { z } from "zod/v3";
import type {
	AbstractLemma,
	AbstractSelection,
	AbstractSurface,
} from "../types/public-types";
import type {
	AbstractLanguageLemmaUnion,
	AbstractLanguageSelectionUnion,
	AbstractLanguageSurfaceUnion,
	LanguageTypePackMap,
} from "../language-packs/type-packs";
import type { ConcreteLanguage } from "../types/concrete-language/features/feature-registry";
import type {
	LemmaByKindForLanguage,
	SelectionByOrthographicStatusForLanguage,
	SurfaceByKindForLanguage,
} from "../types/concrete-language/concrete-language-types";

type LowercaseKey<TKey extends PropertyKey> = TKey extends string
	? Lowercase<TKey>
	: never;

type LemmaUnionForKind<
	TLemmaUnion extends { lemmaKind: string; lemmaSubKind: string },
	TLemmaKind extends TLemmaUnion["lemmaKind"],
> = Extract<TLemmaUnion, { lemmaKind: TLemmaKind }>;

type SurfaceUnionForKind<
	TSurfaceUnion extends {
		lemma: { lemmaKind: string; lemmaSubKind: string };
		surfaceKind: string;
	},
	TSurfaceKind extends TSurfaceUnion["surfaceKind"],
> = Extract<TSurfaceUnion, { surfaceKind: TSurfaceKind }>;

type SurfaceUnionForLemmaKind<
	TSurfaceUnion extends {
		lemma: { lemmaKind: string; lemmaSubKind: string };
		surfaceKind: string;
	},
	TSurfaceKind extends TSurfaceUnion["surfaceKind"],
	TLemmaKind extends SurfaceUnionForKind<TSurfaceUnion, TSurfaceKind>["lemma"]["lemmaKind"],
> = Extract<
	SurfaceUnionForKind<TSurfaceUnion, TSurfaceKind>,
	{ lemma: { lemmaKind: TLemmaKind } }
>;

type SelectionUnionForStatus<
	TSelectionUnion extends {
		orthographicStatus: string;
		surface: {
			lemma: { lemmaKind: string; lemmaSubKind: string };
			surfaceKind: string;
		};
	},
	TOrthographicStatus extends TSelectionUnion["orthographicStatus"],
> = Extract<TSelectionUnion, { orthographicStatus: TOrthographicStatus }>;

type SelectionUnionForSurfaceKind<
	TSelectionUnion extends {
		orthographicStatus: string;
		surface: {
			lemma: { lemmaKind: string; lemmaSubKind: string };
			surfaceKind: string;
		};
	},
	TOrthographicStatus extends TSelectionUnion["orthographicStatus"],
	TSurfaceKind extends SelectionUnionForStatus<
		TSelectionUnion,
		TOrthographicStatus
	>["surface"]["surfaceKind"],
> = Extract<
	SelectionUnionForStatus<TSelectionUnion, TOrthographicStatus>,
	{ surface: { surfaceKind: TSurfaceKind } }
>;

type SelectionUnionForLemmaKind<
	TSelectionUnion extends {
		orthographicStatus: string;
		surface: {
			lemma: { lemmaKind: string; lemmaSubKind: string };
			surfaceKind: string;
		};
	},
	TOrthographicStatus extends TSelectionUnion["orthographicStatus"],
	TSurfaceKind extends SelectionUnionForStatus<
		TSelectionUnion,
		TOrthographicStatus
	>["surface"]["surfaceKind"],
	TLemmaKind extends SelectionUnionForSurfaceKind<
		TSelectionUnion,
		TOrthographicStatus,
		TSurfaceKind
	>["surface"]["lemma"]["lemmaKind"],
> = Extract<
	SelectionUnionForSurfaceKind<
		TSelectionUnion,
		TOrthographicStatus,
		TSurfaceKind
	>,
	{ surface: { lemma: { lemmaKind: TLemmaKind } } }
>;

export type SchemaLeaf<T> = () => z.ZodType<T>;

export type LemmaSchemaTreeFor<
	TLemmaUnion extends { lemmaKind: string; lemmaSubKind: string },
> = {
	[TLemmaKind in TLemmaUnion["lemmaKind"] as LowercaseKey<TLemmaKind>]: {
		[TLemmaSubKind in LemmaUnionForKind<
			TLemmaUnion,
			TLemmaKind
		>["lemmaSubKind"] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
			Extract<
				LemmaUnionForKind<TLemmaUnion, TLemmaKind>,
				{ lemmaSubKind: TLemmaSubKind }
			>
		>;
	};
};

export type SurfaceSchemaTreeFor<
	TSurfaceUnion extends {
		lemma: { lemmaKind: string; lemmaSubKind: string };
		surfaceKind: string;
	},
> = {
	[TSurfaceKind in TSurfaceUnion["surfaceKind"] as LowercaseKey<TSurfaceKind>]: {
		[TLemmaKind in SurfaceUnionForKind<
			TSurfaceUnion,
			TSurfaceKind
		>["lemma"]["lemmaKind"] as LowercaseKey<TLemmaKind>]: {
			[TLemmaSubKind in SurfaceUnionForLemmaKind<
				TSurfaceUnion,
				TSurfaceKind,
				TLemmaKind
			>["lemma"]["lemmaSubKind"] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
				Extract<
					SurfaceUnionForLemmaKind<TSurfaceUnion, TSurfaceKind, TLemmaKind>,
					{ lemma: { lemmaSubKind: TLemmaSubKind } }
				>
			>;
		};
	};
};

export type SelectionSchemaTreeFor<
	TSelectionUnion extends {
		orthographicStatus: string;
		surface: {
			lemma: { lemmaKind: string; lemmaSubKind: string };
			surfaceKind: string;
		};
	},
> = {
	[TOrthographicStatus in TSelectionUnion["orthographicStatus"] as LowercaseKey<TOrthographicStatus>]: {
		[TSurfaceKind in SelectionUnionForStatus<
			TSelectionUnion,
			TOrthographicStatus
		>["surface"]["surfaceKind"] as LowercaseKey<TSurfaceKind>]: {
			[TLemmaKind in SelectionUnionForSurfaceKind<
				TSelectionUnion,
				TOrthographicStatus,
				TSurfaceKind
			>["surface"]["lemma"]["lemmaKind"] as LowercaseKey<TLemmaKind>]: {
				[TLemmaSubKind in SelectionUnionForLemmaKind<
					TSelectionUnion,
					TOrthographicStatus,
					TSurfaceKind,
					TLemmaKind
				>["surface"]["lemma"]["lemmaSubKind"] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
					Extract<
						SelectionUnionForLemmaKind<
							TSelectionUnion,
							TOrthographicStatus,
							TSurfaceKind,
							TLemmaKind
						>,
						{ surface: { lemma: { lemmaSubKind: TLemmaSubKind } } }
					>
				>;
			};
		};
	};
};

type AbstractLemmaUnion = AbstractLanguageLemmaUnion<string>;
type AbstractSurfaceUnion = AbstractLanguageSurfaceUnion<string>;
type AbstractSelectionUnion = AbstractLanguageSelectionUnion<string>;

export type AbstractLemmaSchemaTree = LemmaSchemaTreeFor<AbstractLemmaUnion>;
export type AbstractSurfaceSchemaTree = SurfaceSchemaTreeFor<AbstractSurfaceUnion>;
export type AbstractSelectionSchemaTree = SelectionSchemaTreeFor<
	AbstractSelectionUnion
>;

type ConcreteLemmaSchemaTreeFor<L extends ConcreteLanguage> = {
	[TLemmaKind in keyof LemmaByKindForLanguage<L> as LowercaseKey<TLemmaKind>]: {
		[TLemmaSubKind in keyof LemmaByKindForLanguage<
			L
		>[TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
			LemmaByKindForLanguage<L>[TLemmaKind][TLemmaSubKind]
		>;
	};
};

type ConcreteSurfaceSchemaTreeFor<L extends ConcreteLanguage> = {
	[TSurfaceKind in keyof SurfaceByKindForLanguage<
		L
	> as LowercaseKey<TSurfaceKind>]: {
		[TLemmaKind in keyof SurfaceByKindForLanguage<
			L
		>[TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
			[TLemmaSubKind in keyof SurfaceByKindForLanguage<
				L
			>[TSurfaceKind][TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
				SurfaceByKindForLanguage<L>[TSurfaceKind][TLemmaKind][TLemmaSubKind]
			>;
		};
	};
};

type ConcreteSelectionSchemaTreeFor<L extends ConcreteLanguage> = {
	[TOrthographicStatus in keyof SelectionByOrthographicStatusForLanguage<
		L
	> as LowercaseKey<TOrthographicStatus>]: {
		[TSurfaceKind in keyof SelectionByOrthographicStatusForLanguage<
			L
		>[TOrthographicStatus] as LowercaseKey<TSurfaceKind>]: {
			[TLemmaKind in keyof SelectionByOrthographicStatusForLanguage<
				L
			>[TOrthographicStatus][TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
				[TLemmaSubKind in keyof SelectionByOrthographicStatusForLanguage<
					L
				>[TOrthographicStatus][TSurfaceKind][TLemmaKind] as LowercaseKey<
					TLemmaSubKind
				>]: SchemaLeaf<
					SelectionByOrthographicStatusForLanguage<L>[TOrthographicStatus][TSurfaceKind][TLemmaKind][TLemmaSubKind]
				>;
			};
		};
	};
};

export type DeLemmaSchemaTree = ConcreteLemmaSchemaTreeFor<"de">;
export type DeSurfaceSchemaTree = ConcreteSurfaceSchemaTreeFor<"de">;
export type DeSelectionSchemaTree = ConcreteSelectionSchemaTreeFor<"de">;
export type EnLemmaSchemaTree = ConcreteLemmaSchemaTreeFor<"en">;
export type EnSurfaceSchemaTree = ConcreteSurfaceSchemaTreeFor<"en">;
export type EnSelectionSchemaTree = ConcreteSelectionSchemaTreeFor<"en">;
export type HeLemmaSchemaTree = ConcreteLemmaSchemaTreeFor<"he">;
export type HeSurfaceSchemaTree = ConcreteSurfaceSchemaTreeFor<"he">;
export type HeSelectionSchemaTree = ConcreteSelectionSchemaTreeFor<"he">;

export type RuntimeSchemas = {
	abstract: {
		lemma: z.ZodType<AbstractLemma<string>>;
		selection: z.ZodType<AbstractSelection<string>>;
		surface: z.ZodType<AbstractSurface<string>>;
	};
	de: {
		lemma: z.ZodType<LanguageTypePackMap["de"]["lemma"]>;
		selection: z.ZodType<LanguageTypePackMap["de"]["selection"]>;
		surface: z.ZodType<LanguageTypePackMap["de"]["surface"]>;
	};
	en: {
		lemma: z.ZodType<LanguageTypePackMap["en"]["lemma"]>;
		selection: z.ZodType<LanguageTypePackMap["en"]["selection"]>;
		surface: z.ZodType<LanguageTypePackMap["en"]["surface"]>;
	};
	he: {
		lemma: z.ZodType<LanguageTypePackMap["he"]["lemma"]>;
		selection: z.ZodType<LanguageTypePackMap["he"]["selection"]>;
		surface: z.ZodType<LanguageTypePackMap["he"]["surface"]>;
	};
};

export type SchemaTree = {
	abstract: {
		lemma: AbstractLemmaSchemaTree;
		selection: AbstractSelectionSchemaTree;
		surface: AbstractSurfaceSchemaTree;
	};
	de: {
		lemma: DeLemmaSchemaTree;
		selection: DeSelectionSchemaTree;
		surface: DeSurfaceSchemaTree;
	};
	en: {
		lemma: EnLemmaSchemaTree;
		selection: EnSelectionSchemaTree;
		surface: EnSurfaceSchemaTree;
	};
	he: {
		lemma: HeLemmaSchemaTree;
		selection: HeSelectionSchemaTree;
		surface: HeSurfaceSchemaTree;
	};
};
