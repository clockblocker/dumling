import type z from "zod/v3";
import type { ZodTypeAny } from "zod/v3";
import type { PrettifyDeep } from "../types/helpers";
import { EnglishLemmaSchema } from "./language-packs/english/english-lemma";
import { EnglishObservedSelectionSchema, EnglishSelectionSchema } from "./language-packs/english/english-selection";
import { EnglishSurfaceSchema } from "./language-packs/english/english-surface";
import { GermanLemmaSchema } from "./language-packs/german/german-lemma";
import { GermanObservedSelectionSchema, GermanSelectionSchema } from "./language-packs/german/german-selection";
import { GermanSurfaceSchema } from "./language-packs/german/german-surface";
import { HebrewLemmaSchema } from "./language-packs/hebrew/hebrew-lemma";
import { HebrewObservedSelectionSchema, HebrewSelectionSchema } from "./language-packs/hebrew/hebrew-selection";
import { HebrewSurfaceSchema } from "./language-packs/hebrew/hebrew-surface";
import type { TargetLanguage } from "./universal/enums/core/language";

export const SelectionSchema = {
	English: EnglishSelectionSchema,
	German: GermanSelectionSchema,
	Hebrew: HebrewSelectionSchema,
};

export const ObservedSelectionSchema = {
	English: EnglishObservedSelectionSchema,
	German: GermanObservedSelectionSchema,
	Hebrew: HebrewObservedSelectionSchema,
};

export const SurfaceSchema = {
	English: EnglishSurfaceSchema,
	German: GermanSurfaceSchema,
	Hebrew: HebrewSurfaceSchema,
};

export const LemmaSchema = {
	English: EnglishLemmaSchema,
	German: GermanLemmaSchema,
	Hebrew: HebrewLemmaSchema,
};

export type Lemma<
	L extends TargetLanguage = TargetLanguage,
	LK extends LemmaKindArg<L> = LemmaKindArg<L>,
	D extends LemmaDiscriminatorArg<L, LK> = LemmaDiscriminatorArg<L, LK>,
> = LemmaKindFor<L> extends LK
	? LanguageLemmaUnion<L>
	: InferSchema<LemmaSchemaFor<L, LK, D>>;

export type Surface<
	L extends TargetLanguage = TargetLanguage,
	SK extends SurfaceSurfaceKindArg<L> = SurfaceSurfaceKindArg<L>,
	LK extends SurfaceLemmaKindArg<L, SK> = SurfaceLemmaKindArg<L, SK>,
	D extends SurfaceDiscriminatorArg<L, SK, LK> = SurfaceDiscriminatorArg<
		L,
		SK,
		LK
	>,
> = SurfaceSurfaceKindFor<L> extends SK
	? SurfaceUnionForLanguage<L>
	: PrettifyDeep<InferSchema<SurfaceSchemaFor<L, SK, LK, D>>>;

export type Selection<
	L extends TargetLanguage = TargetLanguage,
	OS extends
		SelectionOrthographicStatusFor<L> = SelectionOrthographicStatusFor<L>,
	SK extends SelectionSurfaceKindArg<L, OS> = SelectionSurfaceKindArg<L, OS>,
	LK extends SelectionLemmaKindArg<L, OS, SK> = SelectionLemmaKindArg<
		L,
		OS,
		SK
	>,
	D extends SelectionDiscriminatorArg<
		L,
		OS,
		SK,
		LK
	> = SelectionDiscriminatorArg<L, OS, SK, LK>,
> = SelectionOrthographicStatusFor<L> extends OS
	? SelectionUnionForLanguage<L>
	: PrettifyDeep<InferSchema<SelectionSchemaFor<L, OS, SK, LK, D>>>;

export type ObservedSelection<
	L extends TargetLanguage = TargetLanguage,
> = InferSchema<(typeof ObservedSelectionSchema)[L]>;

type ValueOf<T> = T[keyof T];

type InferSchema<T> = T extends ZodTypeAny ? z.infer<T> : never;

type LanguageLemmaUnion<L extends TargetLanguage> = {
	[LK in keyof (typeof LemmaSchema)[L]]: {
		[D in keyof (typeof LemmaSchema)[L][LK]]: InferSchema<
			(typeof LemmaSchema)[L][LK][D]
		>;
	}[keyof (typeof LemmaSchema)[L][LK]];
}[keyof (typeof LemmaSchema)[L]];

type SurfaceUnionForLanguage<L extends TargetLanguage> = ValueOf<{
	[SK in keyof (typeof SurfaceSchema)[L]]: ValueOf<{
		[LK in keyof (typeof SurfaceSchema)[L][SK]]: InferSchema<
			ValueOf<(typeof SurfaceSchema)[L][SK][LK]>
		>;
	}>;
}>;

type SelectionUnionForLanguage<L extends TargetLanguage> = ValueOf<{
	[OS in keyof (typeof SelectionSchema)[L]]: ValueOf<{
		[SK in keyof (typeof SelectionSchema)[L][OS]]: ValueOf<{
			[LK in keyof (typeof SelectionSchema)[L][OS][SK]]: InferSchema<
				ValueOf<(typeof SelectionSchema)[L][OS][SK][LK]>
			>;
		}>;
	}>;
}>;

type LemmaKindFor<L extends TargetLanguage> = keyof (typeof LemmaSchema)[L];

type LemmaKindArg<L extends TargetLanguage> = LemmaKindFor<L>;

type LemmaDiscriminatorFor<
	L extends TargetLanguage,
	LK extends LemmaKindFor<L>,
> = keyof (typeof LemmaSchema)[L][LK];

type LemmaDiscriminatorArg<
	L extends TargetLanguage,
	LK extends LemmaKindArg<L>,
> = LK extends LemmaKindFor<L> ? LemmaDiscriminatorFor<L, LK> : never;

type LemmaSchemaFor<
	L extends TargetLanguage,
	LK extends LemmaKindArg<L>,
	D extends LemmaDiscriminatorArg<L, LK>,
> = LK extends LemmaKindFor<L>
	? D extends LemmaDiscriminatorFor<L, LK>
		? (typeof LemmaSchema)[L][LK][D]
		: never
	: never;

type SurfaceSurfaceKindFor<L extends TargetLanguage> = keyof (typeof SurfaceSchema)[L];

type SurfaceSurfaceKindArg<L extends TargetLanguage> = SurfaceSurfaceKindFor<L>;

type SurfaceLemmaKindFor<
	L extends TargetLanguage,
	SK extends SurfaceSurfaceKindFor<L>,
> = keyof (typeof SurfaceSchema)[L][SK];

type SurfaceLemmaKindArg<
	L extends TargetLanguage,
	SK extends SurfaceSurfaceKindArg<L>,
> = SK extends SurfaceSurfaceKindFor<L>
	? SurfaceLemmaKindFor<L, SK>
	: never;

type SurfaceDiscriminatorFor<
	L extends TargetLanguage,
	SK extends SurfaceSurfaceKindFor<L>,
	LK extends SurfaceLemmaKindFor<L, SK>,
> = keyof (typeof SurfaceSchema)[L][SK][LK];

type SurfaceDiscriminatorArg<
	L extends TargetLanguage,
	SK extends SurfaceSurfaceKindArg<L>,
	LK extends SurfaceLemmaKindArg<L, SK>,
> = SK extends SurfaceSurfaceKindFor<L>
	? LK extends SurfaceLemmaKindFor<L, SK>
		? SurfaceDiscriminatorFor<L, SK, LK>
		: never
	: never;

type SurfaceSchemaFor<
	L extends TargetLanguage,
	SK extends SurfaceSurfaceKindArg<L>,
	LK extends SurfaceLemmaKindArg<L, SK>,
	D extends SurfaceDiscriminatorArg<L, SK, LK>,
> = SK extends SurfaceSurfaceKindFor<L>
	? LK extends SurfaceLemmaKindFor<L, SK>
		? D extends SurfaceDiscriminatorFor<L, SK, LK>
			? (typeof SurfaceSchema)[L][SK][LK][D]
			: never
		: never
	: never;

type SelectionOrthographicStatusFor<L extends TargetLanguage> =
	keyof (typeof SelectionSchema)[L];

type SelectionSurfaceKindFor<
	L extends TargetLanguage,
	OS extends SelectionOrthographicStatusFor<L>,
> = keyof (typeof SelectionSchema)[L][OS];

type SelectionLemmaKindFor<
	L extends TargetLanguage,
	OS extends SelectionOrthographicStatusFor<L>,
	SK extends SelectionSurfaceKindFor<L, OS>,
> = keyof (typeof SelectionSchema)[L][OS][SK];

type SelectionDiscriminatorFor<
	L extends TargetLanguage,
	OS extends SelectionOrthographicStatusFor<L>,
	SK extends SelectionSurfaceKindFor<L, OS>,
	LK extends SelectionLemmaKindFor<L, OS, SK>,
> = keyof (typeof SelectionSchema)[L][OS][SK][LK];

type SelectionSurfaceKindArg<
	L extends TargetLanguage,
	OS extends SelectionOrthographicStatusFor<L>,
> = SelectionSurfaceKindFor<L, OS>;

type SelectionLemmaKindArg<
	L extends TargetLanguage,
	OS extends SelectionOrthographicStatusFor<L>,
	SK extends SelectionSurfaceKindArg<L, OS>,
> = SK extends SelectionSurfaceKindFor<L, OS>
	? SelectionLemmaKindFor<L, OS, SK>
	: never;

type SelectionDiscriminatorArg<
	L extends TargetLanguage,
	OS extends SelectionOrthographicStatusFor<L>,
	SK extends SelectionSurfaceKindArg<L, OS>,
	LK extends SelectionLemmaKindArg<L, OS, SK>,
> = SK extends SelectionSurfaceKindFor<L, OS>
	? LK extends SelectionLemmaKindFor<L, OS, SK>
		? SelectionDiscriminatorFor<L, OS, SK, LK>
		: never
	: never;

type SelectionSchemaFor<
	L extends TargetLanguage,
	OS extends SelectionOrthographicStatusFor<L>,
	SK extends SelectionSurfaceKindArg<L, OS>,
	LK extends SelectionLemmaKindArg<L, OS, SK>,
	D extends SelectionDiscriminatorArg<L, OS, SK, LK>,
> = SK extends SelectionSurfaceKindFor<L, OS>
	? LK extends SelectionLemmaKindFor<L, OS, SK>
		? D extends SelectionDiscriminatorFor<L, OS, SK, LK>
			? (typeof SelectionSchema)[L][OS][SK][LK][D]
			: never
		: never
	: never;
