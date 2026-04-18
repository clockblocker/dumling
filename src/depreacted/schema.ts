import type z from "zod/v3";
import {
	DeprecatedLemmaSchema as LemmaSchemaInternal,
	DeprecatedObservedSelectionSchema as ObservedSelectionSchemaInternal,
	DeprecatedSelectionSchema as SelectionSchemaInternal,
	DeprecatedSurfaceSchema as SurfaceSchemaInternal,
} from "./lu/public-entities";

/** @public */
export type DeprecatedDumlingSchemaLanguage = "English" | "German" | "Hebrew";

/** @public */
export type DeprecatedLemmaSchemaRegistry = {
	readonly [L in DeprecatedDumlingSchemaLanguage]: Readonly<
		Record<string, Readonly<Record<string, z.ZodTypeAny>>>
	>;
};

/** @public */
export type DeprecatedSurfaceSchemaRegistry = {
	readonly [L in DeprecatedDumlingSchemaLanguage]: Readonly<
		Record<string, Readonly<Record<string, Readonly<Record<string, z.ZodTypeAny>>>>>
	>;
};

/** @public */
export type DeprecatedSelectionSchemaRegistry = {
	readonly [L in DeprecatedDumlingSchemaLanguage]: Readonly<
		Record<
			string,
			Readonly<Record<string, Readonly<Record<string, Readonly<Record<string, z.ZodTypeAny>>>>>>
		>
	>;
};

/** @public */
export type DeprecatedObservedSelectionSchemaRegistry = {
	readonly [L in DeprecatedDumlingSchemaLanguage]: z.ZodTypeAny;
};

/**
 * @public
 * Zod lemma schema registries grouped by language and lemma kind.
 */
export const DeprecatedLemmaSchema: DeprecatedLemmaSchemaRegistry =
	LemmaSchemaInternal as DeprecatedLemmaSchemaRegistry;

/**
 * @public
 * Zod surface schema registries grouped by language and surface kind.
 */
export const DeprecatedSurfaceSchema: DeprecatedSurfaceSchemaRegistry =
	SurfaceSchemaInternal as DeprecatedSurfaceSchemaRegistry;

/**
 * @public
 * Zod hydrated selection schema registries grouped by language, orthographic status, surface kind, and lemma kind.
 */
export const DeprecatedSelectionSchema: DeprecatedSelectionSchemaRegistry =
	SelectionSchemaInternal as DeprecatedSelectionSchemaRegistry;

/**
 * @public
 * Zod schemas for learner selections before hydration has resolved the exact status and nested surface payload.
 */
export const DeprecatedObservedSelectionSchema: DeprecatedObservedSelectionSchemaRegistry =
	ObservedSelectionSchemaInternal as DeprecatedObservedSelectionSchemaRegistry;

/**
 * @public
 * The top-level `schemaFor` registry shape, keyed first by DTO family and then by the same runtime axes used in the underlying registries.
 */
export type DeprecatedDumlingSchemaRegistry = {
	readonly Lemma: DeprecatedLemmaSchemaRegistry;
	readonly Surface: DeprecatedSurfaceSchemaRegistry;
	readonly Selection: DeprecatedSelectionSchemaRegistry;
	readonly ObservedSelection: DeprecatedObservedSelectionSchemaRegistry;
};

/**
 * @public
 * Unified access to every public runtime schema.
 * Use `schemaFor` when the entity family is chosen at runtime, and the per-kind registries when you already know you only need `LemmaSchema`, `SurfaceSchema`, `SelectionSchema`, or `ObservedSelectionSchema`.
 */
export const deprecatedSchemaFor: DeprecatedDumlingSchemaRegistry = {
	Lemma: DeprecatedLemmaSchema,
	ObservedSelection: DeprecatedObservedSelectionSchema,
	Selection: DeprecatedSelectionSchema,
	Surface: DeprecatedSurfaceSchema,
};
