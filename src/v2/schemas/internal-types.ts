import type { z } from "zod/v3";
import type {
	AbstractLemma,
	AbstractSelection,
	AbstractSurface,
} from "../public-types";
import type {
	Lemma,
	Selection,
	Surface,
} from "../public-types";
import type { DeLemmaByKind } from "../types/language-packs/de/de-lemma";
import type { DeSelectionByOrthographicStatus } from "../types/language-packs/de/de-selection";
import type { DeSurfaceByKind } from "../types/language-packs/de/de-surface";
import type {
	LemmaKind,
	LexemeSubKind,
	MorphemeSubKind,
	OrthographicStatus,
	PhrasemeSubKind,
	SurfaceKind,
} from "../types/core/enums";

type LowercaseKey<TKey extends PropertyKey> = TKey extends string
	? Lowercase<TKey>
	: never;

type AbstractLemmaSubKindFor<TKey extends LemmaKind> = TKey extends "Lexeme"
	? LexemeSubKind
	: TKey extends "Morpheme"
		? MorphemeSubKind
		: TKey extends "Phraseme"
			? PhrasemeSubKind
			: never;

export type SchemaLeaf<T> = () => z.ZodType<T>;

type LowercaseLeafMap<TRecord> = {
	[TKey in Extract<keyof TRecord, string> as Lowercase<TKey>]: SchemaLeaf<
		TRecord[TKey]
	>;
};

export type DeLemmaSchemaTree = {
	[TLemmaKind in keyof DeLemmaByKind as LowercaseKey<TLemmaKind>]: LowercaseLeafMap<
		DeLemmaByKind[TLemmaKind]
	>;
};

export type DeSurfaceSchemaTree = {
	[TSurfaceKind in keyof DeSurfaceByKind as LowercaseKey<TSurfaceKind>]: {
		[TLemmaKind in keyof DeSurfaceByKind[TSurfaceKind] as LowercaseKey<TLemmaKind>]: LowercaseLeafMap<
			DeSurfaceByKind[TSurfaceKind][TLemmaKind]
		>;
	};
};

export type DeSelectionSchemaTree = {
	[TOrthographicStatus in keyof DeSelectionByOrthographicStatus as LowercaseKey<TOrthographicStatus>]: {
		[TSurfaceKind in keyof DeSelectionByOrthographicStatus[TOrthographicStatus] as LowercaseKey<TSurfaceKind>]: {
			[TLemmaKind in keyof DeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind] as LowercaseKey<TLemmaKind>]: LowercaseLeafMap<
				DeSelectionByOrthographicStatus[TOrthographicStatus][TSurfaceKind][TLemmaKind]
			>;
		};
	};
};

export type AbstractLemmaSchemaTree = {
	[TLemmaKind in LemmaKind as Lowercase<TLemmaKind>]: {
		[TLemmaSubKind in AbstractLemmaSubKindFor<TLemmaKind> as Lowercase<TLemmaSubKind>]: SchemaLeaf<
			AbstractLemma<string, TLemmaKind, TLemmaSubKind>
		>;
	};
};

export type AbstractSurfaceSchemaTree = {
	[TSurfaceKind in SurfaceKind as Lowercase<TSurfaceKind>]: {
		[TLemmaKind in LemmaKind as Lowercase<TLemmaKind>]: {
			[TLemmaSubKind in AbstractLemmaSubKindFor<TLemmaKind> as Lowercase<TLemmaSubKind>]: SchemaLeaf<
				AbstractSurface<string, TSurfaceKind, TLemmaKind, TLemmaSubKind>
			>;
		};
	};
};

export type AbstractSelectionSchemaTree = {
	[TOrthographicStatus in OrthographicStatus as Lowercase<TOrthographicStatus>]: {
		[TSurfaceKind in SurfaceKind as Lowercase<TSurfaceKind>]: {
			[TLemmaKind in LemmaKind as Lowercase<TLemmaKind>]: {
				[TLemmaSubKind in AbstractLemmaSubKindFor<TLemmaKind> as Lowercase<TLemmaSubKind>]: SchemaLeaf<
					AbstractSelection<
						string,
						TOrthographicStatus,
						TSurfaceKind,
						TLemmaKind,
						TLemmaSubKind
					>
				>;
			};
		};
	};
};

export type RuntimeSchemas = {
	abstract: {
		lemma: z.ZodType<AbstractLemma<string>>;
		selection: z.ZodType<AbstractSelection<string>>;
		surface: z.ZodType<AbstractSurface<string>>;
	};
	de: {
		lemma: z.ZodType<Lemma<"de">>;
		selection: z.ZodType<Selection<"de">>;
		surface: z.ZodType<Surface<"de">>;
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
		lemma: AbstractLemmaSchemaTree;
		selection: AbstractSelectionSchemaTree;
		surface: AbstractSurfaceSchemaTree;
	};
	he: {
		lemma: AbstractLemmaSchemaTree;
		selection: AbstractSelectionSchemaTree;
		surface: AbstractSurfaceSchemaTree;
	};
};
