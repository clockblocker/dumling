import type {
	Lemma,
	LemmaKindFor,
	LemmaKindForSurfaceKind,
	LemmaSubKindFor,
	OrthographicStatus,
	Selection,
	Surface,
	SurfaceKindFor,
} from "dumling/types";
import type { z } from "zod/v3";
import type { SurfaceByKindForLanguage } from "../../types/concrete-language/concrete-language-types";
import type { ConcreteLanguage } from "../../types/concrete-language/features/feature-registry";

// --- Public-facing trees ---

export type NewSchemaTree = {
	[L in ConcreteLanguage]: {
		lemma: NewLemmaSchemaSubtree<L>;
		surface: NewSurfaceSchemaSubtree<L>;
		selection: NewSelectionSchemaSubtree<L>;
	};
};

export type LemmaSubKindForSurfaceKind<
	L extends ConcreteLanguage,
	SK extends SurfaceKindFor<L>,
	LK extends LemmaKindForSurfaceKind<L, SK>,
> = SK extends keyof SurfaceByKindForLanguage<L>
	? LK extends keyof SurfaceByKindForLanguage<L>[SK]
		? Extract<
				keyof SurfaceByKindForLanguage<L>[SK][LK],
				LemmaSubKindFor<L, LK>
			>
		: never
	: never;

export type NewLemmaSchemaSubtree<L extends ConcreteLanguage> = {
	[LK in LemmaKindFor<L>]: {
		[LSK in LemmaSubKindFor<L, LK>]: z.ZodType<Lemma<L, LK, LSK>>;
	};
};

export type NewSurfaceSchemaSubtree<L extends ConcreteLanguage> = {
	[SK in SurfaceKindFor<L>]: {
		[LK in LemmaKindForSurfaceKind<L, SK>]: {
			[LSK in LemmaSubKindForSurfaceKind<L, SK, LK>]: z.ZodType<
				Surface<L, SK, LK, LSK>
			>;
		};
	};
};

export type NewSelectionSchemaSubtree<L extends ConcreteLanguage> = {
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
