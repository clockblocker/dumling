import type { LemmaKindFor, LemmaSubKindFor, Lemma, SurfaceKindFor, LemmaKindForSurfaceKind, Surface, OrthographicStatus, Selection } from "dumling/types";
import type z from "zod";
import type { ConcreteLanguage } from "../types/concrete-language/features/feature-registry";

export const schema = {

} satisfies NewSchemaTree;

type NewSchemaTree = {
	[L in ConcreteLanguage]: {
		lemma: NewLemmaSchemaSubtree<L>;
		surface: NewSurfaceSchemaSubtree<L>;
		selection: NewSelectionSchemaSubtree<L>;
	};
};

type NewLemmaSchemaSubtree<L extends ConcreteLanguage> = {
	[LK in LemmaKindFor<L>]: {
		[LSK in LemmaSubKindFor<L, LK>]: z.ZodType<Lemma<L, LK, LSK>>;
	};
};


type NewSurfaceSchemaSubtree<L extends ConcreteLanguage> = {
	[SK in SurfaceKindFor<L>]: {
		[LK in LemmaKindForSurfaceKind<L, SK>]: {
			[LSK in LemmaSubKindFor<L, LK>]: z.ZodType<Surface<L, SK, LK, LSK>>;
		};
	};
};

type NewSelectionSchemaSubtree<L extends ConcreteLanguage> = {
	[OS in OrthographicStatus]: {
		[SK in SurfaceKindFor<L>]: {
			[LK in LemmaKindForSurfaceKind<L, SK>]: {
				[LSK in LemmaSubKindFor<L, LK>]: z.ZodType<
					Selection<L, OS, SK, LK, LSK>
				>;
			};
		};
	};
};
