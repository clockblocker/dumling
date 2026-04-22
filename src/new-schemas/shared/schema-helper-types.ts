import type {
	Lemma,
	LemmaKindFor,
	LemmaKindForSurfaceKind,
	LemmaSubKindFor,
	OrthographicStatus,
	Selection,
	SupportedLanguage,
	Surface,
	SurfaceKindFor,
} from "dumling/types";
import type { z } from "zod/v3";

export type NewSchemaGetter<T> = () => z.ZodType<T>;

export type LemmaSubKindForSurfaceKind<
	L extends SupportedLanguage,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
> = Extract<
	Surface<L>,
	{
		lemma: {
			lemmaKind: LK;
		};
		surfaceKind: SK;
	}
> extends infer TSurface
	? TSurface extends {
			lemma: {
				lemmaSubKind: infer LSK;
			};
		}
		? Extract<LSK, LemmaSubKindFor<L, LK>>
		: never
	: never;

export type NewRawLanguageEntitySchemaTree<L extends SupportedLanguage> = {
	lemma: NewRawLemmaSchemaSubtree<L>;
	surface: NewRawSurfaceSchemaSubtree<L>;
	selection: NewRawSelectionSchemaSubtree<L>;
};

export type NewRawEntitySchemaRegistry = {
	[L in SupportedLanguage]: NewRawLanguageEntitySchemaTree<L>;
};

export type NewLanguageSchemaTree<L extends SupportedLanguage> = {
	entity: NewLanguageEntitySchemaTree<L>;
};

export type NewSchemaRegistry = {
	[L in SupportedLanguage]: NewLanguageSchemaTree<L>;
};

export type EverySupportedLanguageHasConcreteSchema =
	SupportedLanguage extends keyof NewSchemaRegistry ? true : never;

export type NewRawLemmaSchemaSubtree<L extends SupportedLanguage> = {
	[LK in LemmaKindFor<L>]: {
		[LSK in LemmaSubKindFor<L, LK>]: z.ZodType<Lemma<L, LK, LSK>>;
	};
};

export type NewRawSurfaceSchemaSubtree<L extends SupportedLanguage> = {
	[SK in SurfaceKindFor<L>]: {
		[LK in LemmaKindForSurfaceKind<L, SK>]: {
			[LSK in LemmaSubKindForSurfaceKind<L, SK, LK>]: z.ZodType<
				Surface<L, SK, LK, LSK>
			>;
		};
	};
};

export type NewRawSelectionSchemaSubtree<L extends SupportedLanguage> = {
	[OS in OrthographicStatus]: {
		[SK in SurfaceKindFor<L>]: {
			[LK in LemmaKindForSurfaceKind<L, SK>]: {
				[LSK in LemmaSubKindForSurfaceKind<L, SK, LK>]: z.ZodType<
					Selection<L, OS, SK, LK, LSK>
				>;
			};
		};
	};
};

export type NewLanguageEntitySchemaTree<L extends SupportedLanguage> = {
	Lemma: NewLemmaSchemaSubtree<L>;
	Surface: NewSurfaceSchemaSubtree<L>;
	Selection: NewSelectionSchemaSubtree<L>;
};

export type NewLemmaSchemaSubtree<L extends SupportedLanguage> = {
	[LK in LemmaKindFor<L>]: {
		[LSK in LemmaSubKindFor<L, LK>]: NewSchemaGetter<Lemma<L, LK, LSK>>;
	};
};

export type NewSurfaceSchemaSubtree<L extends SupportedLanguage> = {
	[SK in SurfaceKindFor<L>]: {
		[LK in LemmaKindForSurfaceKind<L, SK>]: {
			[LSK in LemmaSubKindForSurfaceKind<L, SK, LK>]: NewSchemaGetter<
				Surface<L, SK, LK, LSK>
			>;
		};
	};
};

export type NewSelectionSchemaSubtree<L extends SupportedLanguage> = {
	[OS in OrthographicStatus]: {
		[SK in SurfaceKindFor<L>]: {
			[LK in LemmaKindForSurfaceKind<L, SK>]: {
				[LSK in LemmaSubKindForSurfaceKind<L, SK, LK>]: NewSchemaGetter<
					Selection<L, OS, SK, LK, LSK>
				>;
			};
		};
	};
};
