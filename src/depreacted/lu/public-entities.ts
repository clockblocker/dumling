import type z from "zod/v3";
import type { ZodTypeAny } from "zod/v3";
import { DeprecatedEnglishLemmaSchema } from "./language-packs/english/english-lemma";
import {
	DeprecatedEnglishObservedSelectionSchema,
	DeprecatedEnglishSelectionSchema,
} from "./language-packs/english/english-selection";
import { DeprecatedEnglishSurfaceSchema } from "./language-packs/english/english-surface";
import { DeprecatedGermanLemmaSchema } from "./language-packs/german/german-lemma";
import {
	DeprecatedGermanObservedSelectionSchema,
	DeprecatedGermanSelectionSchema,
} from "./language-packs/german/german-selection";
import { DeprecatedGermanSurfaceSchema } from "./language-packs/german/german-surface";
import { DeprecatedHebrewLemmaSchema } from "./language-packs/hebrew/hebrew-lemma";
import {
	DeprecatedHebrewObservedSelectionSchema,
	DeprecatedHebrewSelectionSchema,
} from "./language-packs/hebrew/hebrew-selection";
import { DeprecatedHebrewSurfaceSchema } from "./language-packs/hebrew/hebrew-surface";

/**
 * @public
 * Zod hydrated selection schema registries grouped by language and selection kind.
 */
export const DeprecatedSelectionSchema = {
	English: DeprecatedEnglishSelectionSchema,
	German: DeprecatedGermanSelectionSchema,
	Hebrew: DeprecatedHebrewSelectionSchema,
};

/**
 * @public
 * Zod observed selection schemas for learner highlights before hydration.
 */
export const DeprecatedObservedSelectionSchema = {
	English: DeprecatedEnglishObservedSelectionSchema,
	German: DeprecatedGermanObservedSelectionSchema,
	Hebrew: DeprecatedHebrewObservedSelectionSchema,
};

/**
 * @public
 * Zod surface schema registries grouped by language and surface kind.
 */
export const DeprecatedSurfaceSchema = {
	English: DeprecatedEnglishSurfaceSchema,
	German: DeprecatedGermanSurfaceSchema,
	Hebrew: DeprecatedHebrewSurfaceSchema,
};

/**
 * @public
 * Zod lemma schema registries grouped by language and lemma kind.
 */
export const DeprecatedLemmaSchema = {
	English: DeprecatedEnglishLemmaSchema,
	German: DeprecatedGermanLemmaSchema,
	Hebrew: DeprecatedHebrewLemmaSchema,
};

/** @public */
export type DeprecatedDumlingLanguage = keyof typeof DeprecatedLemmaSchema;

/** @public */
export type DeprecatedSchemaOutput<T> = T extends ZodTypeAny ? z.infer<T> : never;

/**
 * @public
 * Valid lemma kinds for a given language.
 */
export type DeprecatedLemmaKind<L extends DeprecatedDumlingLanguage> = keyof (typeof DeprecatedLemmaSchema)[L];

/**
 * @public
 * Valid lemma discriminators for a given language and lemma kind.
 */
export type DeprecatedLemmaDiscriminator<
	L extends DeprecatedDumlingLanguage,
	LK extends DeprecatedLemmaKind<L>,
> = keyof (typeof DeprecatedLemmaSchema)[L][LK];

/** @public */
export type DeprecatedLanguageLemmaUnion<L extends DeprecatedDumlingLanguage> = {
	[LK in keyof (typeof DeprecatedLemmaSchema)[L]]: {
		[D in keyof (typeof DeprecatedLemmaSchema)[L][LK]]: DeprecatedSchemaOutput<
			(typeof DeprecatedLemmaSchema)[L][LK][D]
		>;
	}[keyof (typeof DeprecatedLemmaSchema)[L][LK]];
}[keyof (typeof DeprecatedLemmaSchema)[L]];

/** @public */
export type DeprecatedLemmaSchemaFor<
	L extends DeprecatedDumlingLanguage,
	LK extends DeprecatedLemmaKind<L>,
	D extends DeprecatedLemmaDiscriminator<L, LK>,
> = (typeof DeprecatedLemmaSchema)[L][LK][D];

/**
 * @public
 * Public lemma DTOs inferred from the language-specific lemma registries.
 * Narrow the generic parameters when you want one exact DTO family; leave them wide to get the full union for a language.
 */
export type DeprecatedLemma<
	L extends DeprecatedDumlingLanguage = DeprecatedDumlingLanguage,
	LK extends DeprecatedLemmaKind<L> = DeprecatedLemmaKind<L>,
	D extends DeprecatedLemmaDiscriminator<L, LK> = DeprecatedLemmaDiscriminator<L, LK>,
> = DeprecatedLemmaKind<L> extends LK
	? DeprecatedLanguageLemmaUnion<L>
	: DeprecatedSchemaOutput<DeprecatedLemmaSchemaFor<L, LK, D>>;

/**
 * @public
 * Valid surface kinds for a given language.
 */
export type DeprecatedSurfaceKind<L extends DeprecatedDumlingLanguage> = keyof (typeof DeprecatedSurfaceSchema)[L];

/**
 * @public
 * Valid lemma kinds within a language and surface kind.
 */
export type DeprecatedSurfaceLemmaKind<
	L extends DeprecatedDumlingLanguage,
	SK extends DeprecatedSurfaceKind<L>,
> = keyof (typeof DeprecatedSurfaceSchema)[L][SK];

/**
 * @public
 * Valid surface discriminators within a language, surface kind, and lemma kind.
 */
export type DeprecatedSurfaceDiscriminator<
	L extends DeprecatedDumlingLanguage,
	SK extends DeprecatedSurfaceKind<L>,
	LK extends DeprecatedSurfaceLemmaKind<L, SK>,
> = keyof (typeof DeprecatedSurfaceSchema)[L][SK][LK];

/** @public */
export type DeprecatedSurfaceUnionForLanguage<L extends DeprecatedDumlingLanguage> = {
	[SK in keyof (typeof DeprecatedSurfaceSchema)[L]]: {
		[LK in keyof (typeof DeprecatedSurfaceSchema)[L][SK]]: {
			[D in keyof (typeof DeprecatedSurfaceSchema)[L][SK][LK]]: DeprecatedSchemaOutput<
				(typeof DeprecatedSurfaceSchema)[L][SK][LK][D]
			>;
		}[keyof (typeof DeprecatedSurfaceSchema)[L][SK][LK]];
	}[keyof (typeof DeprecatedSurfaceSchema)[L][SK]];
}[keyof (typeof DeprecatedSurfaceSchema)[L]];

/** @public */
export type DeprecatedSurfaceSchemaFor<
	L extends DeprecatedDumlingLanguage,
	SK extends DeprecatedSurfaceKind<L>,
	LK extends DeprecatedSurfaceLemmaKind<L, SK>,
	D extends DeprecatedSurfaceDiscriminator<L, SK, LK>,
> = (typeof DeprecatedSurfaceSchema)[L][SK][LK][D];

/**
 * @public
 * Public surface DTOs inferred from the surface registries.
 * Narrow the generic parameters when you need one specific surface discriminator, or leave them wide to accept any public surface for that language.
 */
export type DeprecatedSurface<
	L extends DeprecatedDumlingLanguage = DeprecatedDumlingLanguage,
	SK extends DeprecatedSurfaceKind<L> = DeprecatedSurfaceKind<L>,
	LK extends DeprecatedSurfaceLemmaKind<L, SK> = DeprecatedSurfaceLemmaKind<L, SK>,
	D extends DeprecatedSurfaceDiscriminator<L, SK, LK> = DeprecatedSurfaceDiscriminator<
		L,
		SK,
		LK
	>,
> = DeprecatedSurfaceKind<L> extends SK
	? DeprecatedSurfaceUnionForLanguage<L>
	: DeprecatedSchemaOutput<DeprecatedSurfaceSchemaFor<L, SK, LK, D>>;

/**
 * @public
 * Valid orthographic statuses for hydrated selections in a given language.
 */
export type DeprecatedSelectionOrthographicStatus<
	L extends DeprecatedDumlingLanguage,
> = keyof (typeof DeprecatedSelectionSchema)[L];

/**
 * @public
 * Valid surface kinds within a language and orthographic status.
 */
export type DeprecatedSelectionSurfaceKind<
	L extends DeprecatedDumlingLanguage,
	OS extends DeprecatedSelectionOrthographicStatus<L>,
> = keyof (typeof DeprecatedSelectionSchema)[L][OS];

/**
 * @public
 * Valid lemma kinds within a language, orthographic status, and surface kind.
 */
export type DeprecatedSelectionLemmaKind<
	L extends DeprecatedDumlingLanguage,
	OS extends DeprecatedSelectionOrthographicStatus<L>,
	SK extends DeprecatedSelectionSurfaceKind<L, OS>,
> = keyof (typeof DeprecatedSelectionSchema)[L][OS][SK];

/**
 * @public
 * Valid selection discriminators within a language, orthographic status, surface kind, and lemma kind.
 */
export type DeprecatedSelectionDiscriminator<
	L extends DeprecatedDumlingLanguage,
	OS extends DeprecatedSelectionOrthographicStatus<L>,
	SK extends DeprecatedSelectionSurfaceKind<L, OS>,
	LK extends DeprecatedSelectionLemmaKind<L, OS, SK>,
> = keyof (typeof DeprecatedSelectionSchema)[L][OS][SK][LK];

/** @public */
export type DeprecatedSelectionUnionForLanguage<L extends DeprecatedDumlingLanguage> = {
	[OS in keyof (typeof DeprecatedSelectionSchema)[L]]: {
		[SK in keyof (typeof DeprecatedSelectionSchema)[L][OS]]: {
			[LK in keyof (typeof DeprecatedSelectionSchema)[L][OS][SK]]: {
				[D in keyof (typeof DeprecatedSelectionSchema)[L][OS][SK][LK]]: DeprecatedSchemaOutput<
					(typeof DeprecatedSelectionSchema)[L][OS][SK][LK][D]
				>;
			}[keyof (typeof DeprecatedSelectionSchema)[L][OS][SK][LK]];
		}[keyof (typeof DeprecatedSelectionSchema)[L][OS][SK]];
	}[keyof (typeof DeprecatedSelectionSchema)[L][OS]];
}[keyof (typeof DeprecatedSelectionSchema)[L]];

/** @public */
export type DeprecatedSelectionSchemaFor<
	L extends DeprecatedDumlingLanguage,
	OS extends DeprecatedSelectionOrthographicStatus<L>,
	SK extends DeprecatedSelectionSurfaceKind<L, OS>,
	LK extends DeprecatedSelectionLemmaKind<L, OS, SK>,
	D extends DeprecatedSelectionDiscriminator<L, OS, SK, LK>,
> = (typeof DeprecatedSelectionSchema)[L][OS][SK][LK][D];

/**
 * @public
 * Public hydrated selection DTOs inferred from the selection registries.
 * These always include the nested surface payload and a resolved orthographic status.
 */
export type DeprecatedSelection<
	L extends DeprecatedDumlingLanguage = DeprecatedDumlingLanguage,
	OS extends DeprecatedSelectionOrthographicStatus<L> = DeprecatedSelectionOrthographicStatus<L>,
	SK extends DeprecatedSelectionSurfaceKind<L, OS> = DeprecatedSelectionSurfaceKind<L, OS>,
	LK extends DeprecatedSelectionLemmaKind<L, OS, SK> = DeprecatedSelectionLemmaKind<L, OS, SK>,
	D extends DeprecatedSelectionDiscriminator<L, OS, SK, LK> = DeprecatedSelectionDiscriminator<
		L,
		OS,
		SK,
		LK
	>,
> = DeprecatedSelectionOrthographicStatus<L> extends OS
	? DeprecatedSelectionUnionForLanguage<L>
	: DeprecatedSchemaOutput<DeprecatedSelectionSchemaFor<L, OS, SK, LK, D>>;

/**
 * @public
 * Public learner-selection DTOs before hydration resolves the exact orthographic status and nested surface payload.
 */
export type DeprecatedObservedSelection<
	L extends DeprecatedDumlingLanguage = DeprecatedDumlingLanguage,
> = DeprecatedSchemaOutput<(typeof DeprecatedObservedSelectionSchema)[L]>;
