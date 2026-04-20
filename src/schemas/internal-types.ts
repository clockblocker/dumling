import type { z } from "zod/v3";
import type {
	AbstractLemma,
	AbstractSelection,
	AbstractSurface,
} from "../public-types";
import type {
	AbstractLanguageLemmaUnion,
	AbstractLanguageSelectionUnion,
	AbstractLanguageSurfaceUnion,
	LanguageTypePackMap,
} from "../language-packs/type-packs";
import type { EnLemmaByKind } from "../types/concrete-language/language-packs/en/en-lemma";
import type { EnSelectionByOrthographicStatus } from "../types/concrete-language/language-packs/en/en-selection";
import type { EnSurfaceByKind } from "../types/concrete-language/language-packs/en/en-surface";
import type { DeLemmaByKind } from "../types/concrete-language/language-packs/de/de-lemma";
import type { DeSelectionByOrthographicStatus } from "../types/concrete-language/language-packs/de/de-selection";
import type { DeSurfaceByKind } from "../types/concrete-language/language-packs/de/de-surface";
import type { HeLemmaByKind } from "../types/concrete-language/language-packs/he/he-lemma";
import type { HeSelectionByOrthographicStatus } from "../types/concrete-language/language-packs/he/he-selection";
import type { HeSurfaceByKind } from "../types/concrete-language/language-packs/he/he-surface";

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

export type DeLemmaSchemaTree = {
	[TLemmaKind in keyof DeLemmaByKind as LowercaseKey<TLemmaKind>]: {
		[TLemmaSubKind in keyof DeLemmaByKind[TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
			DeLemmaByKind[TLemmaKind][TLemmaSubKind]
		>;
	};
};
export type DeSurfaceSchemaTree = {
	[TSurfaceKind in keyof DeSurfaceByKind as LowercaseKey<TSurfaceKind>]: {
		[TLemmaKind in keyof DeSurfaceByKind[TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
			[TLemmaSubKind in keyof DeSurfaceByKind[TSurfaceKind][TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
				DeSurfaceByKind[TSurfaceKind][TLemmaKind][TLemmaSubKind]
			>;
		};
	};
};
export type DeSelectionSchemaTree = {
	[TOrthographicStatus in keyof DeSelectionByOrthographicStatus as LowercaseKey<TOrthographicStatus>]: {
		[TSurfaceKind in keyof DeSelectionByOrthographicStatus[TOrthographicStatus] as LowercaseKey<TSurfaceKind>]: {
			[TLemmaKind in keyof DeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
				[TLemmaSubKind in keyof DeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind][TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
					DeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind][TLemmaKind][TLemmaSubKind]
				>;
			};
		};
	};
};
export type EnLemmaSchemaTree = {
	[TLemmaKind in keyof EnLemmaByKind as LowercaseKey<TLemmaKind>]: {
		[TLemmaSubKind in keyof EnLemmaByKind[TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
			EnLemmaByKind[TLemmaKind][TLemmaSubKind]
		>;
	};
};
export type EnSurfaceSchemaTree = {
	[TSurfaceKind in keyof EnSurfaceByKind as LowercaseKey<TSurfaceKind>]: {
		[TLemmaKind in keyof EnSurfaceByKind[TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
			[TLemmaSubKind in keyof EnSurfaceByKind[TSurfaceKind][TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
				EnSurfaceByKind[TSurfaceKind][TLemmaKind][TLemmaSubKind]
			>;
		};
	};
};
export type EnSelectionSchemaTree = {
	[TOrthographicStatus in keyof EnSelectionByOrthographicStatus as LowercaseKey<TOrthographicStatus>]: {
		[TSurfaceKind in keyof EnSelectionByOrthographicStatus[TOrthographicStatus] as LowercaseKey<TSurfaceKind>]: {
			[TLemmaKind in keyof EnSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
				[TLemmaSubKind in keyof EnSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind][TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
					EnSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind][TLemmaKind][TLemmaSubKind]
				>;
			};
		};
	};
};
export type HeLemmaSchemaTree = {
	[TLemmaKind in keyof HeLemmaByKind as LowercaseKey<TLemmaKind>]: {
		[TLemmaSubKind in keyof HeLemmaByKind[TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
			HeLemmaByKind[TLemmaKind][TLemmaSubKind]
		>;
	};
};
export type HeSurfaceSchemaTree = {
	[TSurfaceKind in keyof HeSurfaceByKind as LowercaseKey<TSurfaceKind>]: {
		[TLemmaKind in keyof HeSurfaceByKind[TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
			[TLemmaSubKind in keyof HeSurfaceByKind[TSurfaceKind][TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
				HeSurfaceByKind[TSurfaceKind][TLemmaKind][TLemmaSubKind]
			>;
		};
	};
};
export type HeSelectionSchemaTree = {
	[TOrthographicStatus in keyof HeSelectionByOrthographicStatus as LowercaseKey<TOrthographicStatus>]: {
		[TSurfaceKind in keyof HeSelectionByOrthographicStatus[TOrthographicStatus] as LowercaseKey<TSurfaceKind>]: {
			[TLemmaKind in keyof HeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind] as LowercaseKey<TLemmaKind>]: {
				[TLemmaSubKind in keyof HeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind][TLemmaKind] as LowercaseKey<TLemmaSubKind>]: SchemaLeaf<
					HeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind][TLemmaKind][TLemmaSubKind]
				>;
			};
		};
	};
};

export type AbstractLemmaSchemaTree = LemmaSchemaTreeFor<AbstractLemmaUnion>;
export type AbstractSurfaceSchemaTree = SurfaceSchemaTreeFor<AbstractSurfaceUnion>;
export type AbstractSelectionSchemaTree = SelectionSchemaTreeFor<
	AbstractSelectionUnion
>;

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
