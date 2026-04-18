import type z from "zod/v3";
import {
	LemmaSchema as LemmaSchemaInternal,
	ObservedSelectionSchema as ObservedSelectionSchemaInternal,
	SelectionSchema as SelectionSchemaInternal,
	SurfaceSchema as SurfaceSchemaInternal,
} from "./lu/public-entities";

/** @public */
export type DumlingSchemaLanguage = "English" | "German" | "Hebrew";

/** @public */
export type LemmaSchemaRegistry = {
	readonly [L in DumlingSchemaLanguage]: Readonly<
		Record<string, Readonly<Record<string, z.ZodTypeAny>>>
	>;
};

/** @public */
export type SurfaceSchemaRegistry = {
	readonly [L in DumlingSchemaLanguage]: Readonly<
		Record<string, Readonly<Record<string, Readonly<Record<string, z.ZodTypeAny>>>>>
	>;
};

/** @public */
export type SelectionSchemaRegistry = {
	readonly [L in DumlingSchemaLanguage]: Readonly<
		Record<
			string,
			Readonly<Record<string, Readonly<Record<string, Readonly<Record<string, z.ZodTypeAny>>>>>>
		>
	>;
};

/** @public */
export type ObservedSelectionSchemaRegistry = {
	readonly [L in DumlingSchemaLanguage]: z.ZodTypeAny;
};

/**
 * @public
 * Zod lemma schema registries grouped by language and lemma kind.
 */
export const LemmaSchema: LemmaSchemaRegistry =
	LemmaSchemaInternal as LemmaSchemaRegistry;

/**
 * @public
 * Zod surface schema registries grouped by language and surface kind.
 */
export const SurfaceSchema: SurfaceSchemaRegistry =
	SurfaceSchemaInternal as SurfaceSchemaRegistry;

/**
 * @public
 * Zod hydrated selection schema registries grouped by language, orthographic status, surface kind, and lemma kind.
 */
export const SelectionSchema: SelectionSchemaRegistry =
	SelectionSchemaInternal as SelectionSchemaRegistry;

/**
 * @public
 * Zod schemas for learner selections before hydration has resolved the exact status and nested surface payload.
 */
export const ObservedSelectionSchema: ObservedSelectionSchemaRegistry =
	ObservedSelectionSchemaInternal as ObservedSelectionSchemaRegistry;

/**
 * @public
 * The top-level `schemaFor` registry shape, keyed first by DTO family and then by the same runtime axes used in the underlying registries.
 */
export type DumlingSchemaRegistry = {
	readonly Lemma: LemmaSchemaRegistry;
	readonly Surface: SurfaceSchemaRegistry;
	readonly Selection: SelectionSchemaRegistry;
	readonly ObservedSelection: ObservedSelectionSchemaRegistry;
};

/**
 * @public
 * Unified access to every public runtime schema.
 * Use `schemaFor` when the entity family is chosen at runtime, and the per-kind registries when you already know you only need `LemmaSchema`, `SurfaceSchema`, `SelectionSchema`, or `ObservedSelectionSchema`.
 */
export const schemaFor: DumlingSchemaRegistry = {
	Lemma: LemmaSchema,
	ObservedSelection: ObservedSelectionSchema,
	Selection: SelectionSchema,
	Surface: SurfaceSchema,
};
