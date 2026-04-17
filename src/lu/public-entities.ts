import type z from "zod/v3";
import type { ZodTypeAny } from "zod/v3";
import { EnglishLemmaSchema } from "./language-packs/english/english-lemma";
import {
	EnglishObservedSelectionSchema,
	EnglishSelectionSchema,
} from "./language-packs/english/english-selection";
import { EnglishSurfaceSchema } from "./language-packs/english/english-surface";
import { GermanLemmaSchema } from "./language-packs/german/german-lemma";
import {
	GermanObservedSelectionSchema,
	GermanSelectionSchema,
} from "./language-packs/german/german-selection";
import { GermanSurfaceSchema } from "./language-packs/german/german-surface";
import { HebrewLemmaSchema } from "./language-packs/hebrew/hebrew-lemma";
import {
	HebrewObservedSelectionSchema,
	HebrewSelectionSchema,
} from "./language-packs/hebrew/hebrew-selection";
import { HebrewSurfaceSchema } from "./language-packs/hebrew/hebrew-surface";

/**
 * @public
 * Zod hydrated selection schema registries grouped by language and selection kind.
 */
export const SelectionSchema = {
	English: EnglishSelectionSchema,
	German: GermanSelectionSchema,
	Hebrew: HebrewSelectionSchema,
};

/**
 * @public
 * Zod observed selection schemas for learner highlights before hydration.
 */
export const ObservedSelectionSchema = {
	English: EnglishObservedSelectionSchema,
	German: GermanObservedSelectionSchema,
	Hebrew: HebrewObservedSelectionSchema,
};

/**
 * @public
 * Zod surface schema registries grouped by language and surface kind.
 */
export const SurfaceSchema = {
	English: EnglishSurfaceSchema,
	German: GermanSurfaceSchema,
	Hebrew: HebrewSurfaceSchema,
};

/**
 * @public
 * Zod lemma schema registries grouped by language and lemma kind.
 */
export const LemmaSchema = {
	English: EnglishLemmaSchema,
	German: GermanLemmaSchema,
	Hebrew: HebrewLemmaSchema,
};

/** @public */
export type DumlingLanguage = keyof typeof LemmaSchema;

/** @public */
export type SchemaOutput<T> = T extends ZodTypeAny ? z.infer<T> : never;

/**
 * @public
 * Valid lemma kinds for a given language.
 */
export type LemmaKind<L extends DumlingLanguage> = keyof (typeof LemmaSchema)[L];

/**
 * @public
 * Valid lemma discriminators for a given language and lemma kind.
 */
export type LemmaDiscriminator<
	L extends DumlingLanguage,
	LK extends LemmaKind<L>,
> = keyof (typeof LemmaSchema)[L][LK];

/** @public */
export type LanguageLemmaUnion<L extends DumlingLanguage> = {
	[LK in keyof (typeof LemmaSchema)[L]]: {
		[D in keyof (typeof LemmaSchema)[L][LK]]: SchemaOutput<
			(typeof LemmaSchema)[L][LK][D]
		>;
	}[keyof (typeof LemmaSchema)[L][LK]];
}[keyof (typeof LemmaSchema)[L]];

/** @public */
export type LemmaSchemaFor<
	L extends DumlingLanguage,
	LK extends LemmaKind<L>,
	D extends LemmaDiscriminator<L, LK>,
> = (typeof LemmaSchema)[L][LK][D];

/**
 * @public
 * Public lemma DTOs inferred from the language-specific lemma registries.
 * Narrow the generic parameters when you want one exact DTO family; leave them wide to get the full union for a language.
 */
export type Lemma<
	L extends DumlingLanguage = DumlingLanguage,
	LK extends LemmaKind<L> = LemmaKind<L>,
	D extends LemmaDiscriminator<L, LK> = LemmaDiscriminator<L, LK>,
> = LemmaKind<L> extends LK
	? LanguageLemmaUnion<L>
	: SchemaOutput<LemmaSchemaFor<L, LK, D>>;

/**
 * @public
 * Valid surface kinds for a given language.
 */
export type SurfaceKind<L extends DumlingLanguage> = keyof (typeof SurfaceSchema)[L];

/**
 * @public
 * Valid lemma kinds within a language and surface kind.
 */
export type SurfaceLemmaKind<
	L extends DumlingLanguage,
	SK extends SurfaceKind<L>,
> = keyof (typeof SurfaceSchema)[L][SK];

/**
 * @public
 * Valid surface discriminators within a language, surface kind, and lemma kind.
 */
export type SurfaceDiscriminator<
	L extends DumlingLanguage,
	SK extends SurfaceKind<L>,
	LK extends SurfaceLemmaKind<L, SK>,
> = keyof (typeof SurfaceSchema)[L][SK][LK];

/** @public */
export type SurfaceUnionForLanguage<L extends DumlingLanguage> = {
	[SK in keyof (typeof SurfaceSchema)[L]]: {
		[LK in keyof (typeof SurfaceSchema)[L][SK]]: {
			[D in keyof (typeof SurfaceSchema)[L][SK][LK]]: SchemaOutput<
				(typeof SurfaceSchema)[L][SK][LK][D]
			>;
		}[keyof (typeof SurfaceSchema)[L][SK][LK]];
	}[keyof (typeof SurfaceSchema)[L][SK]];
}[keyof (typeof SurfaceSchema)[L]];

/** @public */
export type SurfaceSchemaFor<
	L extends DumlingLanguage,
	SK extends SurfaceKind<L>,
	LK extends SurfaceLemmaKind<L, SK>,
	D extends SurfaceDiscriminator<L, SK, LK>,
> = (typeof SurfaceSchema)[L][SK][LK][D];

/**
 * @public
 * Public surface DTOs inferred from the surface registries.
 * Narrow the generic parameters when you need one specific surface discriminator, or leave them wide to accept any public surface for that language.
 */
export type Surface<
	L extends DumlingLanguage = DumlingLanguage,
	SK extends SurfaceKind<L> = SurfaceKind<L>,
	LK extends SurfaceLemmaKind<L, SK> = SurfaceLemmaKind<L, SK>,
	D extends SurfaceDiscriminator<L, SK, LK> = SurfaceDiscriminator<
		L,
		SK,
		LK
	>,
> = SurfaceKind<L> extends SK
	? SurfaceUnionForLanguage<L>
	: SchemaOutput<SurfaceSchemaFor<L, SK, LK, D>>;

/**
 * @public
 * Valid orthographic statuses for hydrated selections in a given language.
 */
export type SelectionOrthographicStatus<
	L extends DumlingLanguage,
> = keyof (typeof SelectionSchema)[L];

/**
 * @public
 * Valid surface kinds within a language and orthographic status.
 */
export type SelectionSurfaceKind<
	L extends DumlingLanguage,
	OS extends SelectionOrthographicStatus<L>,
> = keyof (typeof SelectionSchema)[L][OS];

/**
 * @public
 * Valid lemma kinds within a language, orthographic status, and surface kind.
 */
export type SelectionLemmaKind<
	L extends DumlingLanguage,
	OS extends SelectionOrthographicStatus<L>,
	SK extends SelectionSurfaceKind<L, OS>,
> = keyof (typeof SelectionSchema)[L][OS][SK];

/**
 * @public
 * Valid selection discriminators within a language, orthographic status, surface kind, and lemma kind.
 */
export type SelectionDiscriminator<
	L extends DumlingLanguage,
	OS extends SelectionOrthographicStatus<L>,
	SK extends SelectionSurfaceKind<L, OS>,
	LK extends SelectionLemmaKind<L, OS, SK>,
> = keyof (typeof SelectionSchema)[L][OS][SK][LK];

/** @public */
export type SelectionUnionForLanguage<L extends DumlingLanguage> = {
	[OS in keyof (typeof SelectionSchema)[L]]: {
		[SK in keyof (typeof SelectionSchema)[L][OS]]: {
			[LK in keyof (typeof SelectionSchema)[L][OS][SK]]: {
				[D in keyof (typeof SelectionSchema)[L][OS][SK][LK]]: SchemaOutput<
					(typeof SelectionSchema)[L][OS][SK][LK][D]
				>;
			}[keyof (typeof SelectionSchema)[L][OS][SK][LK]];
		}[keyof (typeof SelectionSchema)[L][OS][SK]];
	}[keyof (typeof SelectionSchema)[L][OS]];
}[keyof (typeof SelectionSchema)[L]];

/** @public */
export type SelectionSchemaFor<
	L extends DumlingLanguage,
	OS extends SelectionOrthographicStatus<L>,
	SK extends SelectionSurfaceKind<L, OS>,
	LK extends SelectionLemmaKind<L, OS, SK>,
	D extends SelectionDiscriminator<L, OS, SK, LK>,
> = (typeof SelectionSchema)[L][OS][SK][LK][D];

/**
 * @public
 * Public hydrated selection DTOs inferred from the selection registries.
 * These always include the nested surface payload and a resolved orthographic status.
 */
export type Selection<
	L extends DumlingLanguage = DumlingLanguage,
	OS extends SelectionOrthographicStatus<L> = SelectionOrthographicStatus<L>,
	SK extends SelectionSurfaceKind<L, OS> = SelectionSurfaceKind<L, OS>,
	LK extends SelectionLemmaKind<L, OS, SK> = SelectionLemmaKind<L, OS, SK>,
	D extends SelectionDiscriminator<L, OS, SK, LK> = SelectionDiscriminator<
		L,
		OS,
		SK,
		LK
	>,
> = SelectionOrthographicStatus<L> extends OS
	? SelectionUnionForLanguage<L>
	: SchemaOutput<SelectionSchemaFor<L, OS, SK, LK, D>>;

/**
 * @public
 * Public learner-selection DTOs before hydration resolves the exact orthographic status and nested surface payload.
 */
export type ObservedSelection<
	L extends DumlingLanguage = DumlingLanguage,
> = SchemaOutput<(typeof ObservedSelectionSchema)[L]>;
