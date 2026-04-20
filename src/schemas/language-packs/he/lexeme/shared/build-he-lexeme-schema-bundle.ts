import type { z } from "zod/v3";
import type {
	FamilyInflectableSubKind,
	FamilyInflectionSelectionBySubKind,
	FamilyInflectionSurfaceBySubKind,
	FamilyLemmaBySubKind,
	FamilyLemmaSelectionBySubKind,
	FamilyLemmaSurfaceBySubKind,
} from "../../../../../types/concrete-language/family-types";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
} from "../../../../shared/builders";

type HeLexemeLemmaBySubKind = FamilyLemmaBySubKind<"he", "Lexeme">;
type HeLemmaLexemeSurfaceBySubKind = FamilyLemmaSurfaceBySubKind<"he", "Lexeme">;
type HeInflectionLexemeSurfaceBySubKind = FamilyInflectionSurfaceBySubKind<
	"he",
	"Lexeme"
>;
type HeInflectableLexemeSubKind = FamilyInflectableSubKind<"he", "Lexeme">;
type HeLemmaLexemeSelectionBySubKind<
	OS extends "Standard" | "Typo" = "Standard" | "Typo",
> = FamilyLemmaSelectionBySubKind<"he", "Lexeme", OS>;
type HeInflectionLexemeSelectionBySubKind<
	OS extends "Standard" | "Typo" = "Standard" | "Typo",
> = FamilyInflectionSelectionBySubKind<"he", "Lexeme", OS>;

type SchemaLeaf<T> = () => z.ZodType<T>;

type HeLexemeLeafBundleBaseFor<LSK extends keyof HeLexemeLemmaBySubKind> = {
	lemma: SchemaLeaf<HeLexemeLemmaBySubKind[LSK]>;
	lemmaSchema: z.ZodType<HeLexemeLemmaBySubKind[LSK]>;
	lemmaSelectionSchemas: [
		z.ZodType<HeLemmaLexemeSelectionBySubKind<"Standard">[LSK]>,
		z.ZodType<HeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>,
	];
	lemmaSurfaceSchema: z.ZodType<HeLemmaLexemeSurfaceBySubKind[LSK]>;
	selection: {
		standard: {
			lemma: SchemaLeaf<HeLemmaLexemeSelectionBySubKind<"Standard">[LSK]>;
		};
		typo: {
			lemma: SchemaLeaf<HeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
		};
	};
	surface: {
		lemma: SchemaLeaf<HeLemmaLexemeSurfaceBySubKind[LSK]>;
	};
	surfaceSchemas: [z.ZodType<HeLemmaLexemeSurfaceBySubKind[LSK]>];
};

export type HeUninflectableLexemeSchemaBundleFor<
	LSK extends keyof HeLexemeLemmaBySubKind,
> = HeLexemeLeafBundleBaseFor<LSK>;

export type HeInflectableLexemeSchemaBundleFor<
	LSK extends HeInflectableLexemeSubKind,
> = Omit<HeLexemeLeafBundleBaseFor<LSK>, "selection" | "surface" | "surfaceSchemas"> & {
	inflectionSelectionSchemas: [
		z.ZodType<HeInflectionLexemeSelectionBySubKind<"Standard">[LSK]>,
		z.ZodType<HeInflectionLexemeSelectionBySubKind<"Typo">[LSK]>,
	];
	inflectionSurfaceSchema: z.ZodType<HeInflectionLexemeSurfaceBySubKind[LSK]>;
	selection: {
		standard: {
			inflection: SchemaLeaf<
				HeInflectionLexemeSelectionBySubKind<"Standard">[LSK]
			>;
			lemma: SchemaLeaf<HeLemmaLexemeSelectionBySubKind<"Standard">[LSK]>;
		};
		typo: {
			inflection: SchemaLeaf<
				HeInflectionLexemeSelectionBySubKind<"Typo">[LSK]
			>;
			lemma: SchemaLeaf<HeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
		};
	};
	surface: {
		inflection: SchemaLeaf<HeInflectionLexemeSurfaceBySubKind[LSK]>;
		lemma: SchemaLeaf<HeLemmaLexemeSurfaceBySubKind[LSK]>;
	};
	surfaceSchemas: [
		z.ZodType<HeLemmaLexemeSurfaceBySubKind[LSK]>,
		z.ZodType<HeInflectionLexemeSurfaceBySubKind[LSK]>,
	];
};

export function buildHeInflectableLexemeSchemaBundle<
	const LSK extends HeInflectableLexemeSubKind,
>(options: {
	inflectionalFeaturesSchema: z.ZodType<
		HeInflectionLexemeSurfaceBySubKind[LSK]["inflectionalFeatures"]
	>;
	languageSchema: z.ZodType<"he">;
	lemmaSchema: z.ZodType<HeLexemeLemmaBySubKind[LSK]>;
}): HeInflectableLexemeSchemaBundleFor<LSK> {
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<HeLemmaLexemeSurfaceBySubKind[LSK]>;
	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
		inflectionalFeaturesSchema: options.inflectionalFeaturesSchema,
	}) as unknown as z.ZodType<HeInflectionLexemeSurfaceBySubKind[LSK]>;

	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		HeLemmaLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<HeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		HeInflectionLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		HeInflectionLexemeSelectionBySubKind<"Typo">[LSK]
	>;

	return {
		lemmaSchema: options.lemmaSchema,
		lemmaSurfaceSchema,
		inflectionSurfaceSchema,
		lemmaSelectionSchemas: [
			standardLemmaSelectionSchema,
			typoLemmaSelectionSchema,
		],
		inflectionSelectionSchemas: [
			standardInflectionSelectionSchema,
			typoInflectionSelectionSchema,
		],
		surfaceSchemas: [lemmaSurfaceSchema, inflectionSurfaceSchema],
		lemma: () => options.lemmaSchema,
		surface: {
			lemma: () => lemmaSurfaceSchema,
			inflection: () => inflectionSurfaceSchema,
		},
		selection: {
			standard: {
				lemma: () => standardLemmaSelectionSchema,
				inflection: () => standardInflectionSelectionSchema,
			},
			typo: {
				lemma: () => typoLemmaSelectionSchema,
				inflection: () => typoInflectionSelectionSchema,
			},
		},
	};
}

export function buildHeUninflectableLexemeSchemaBundle<
	const LSK extends keyof HeLexemeLemmaBySubKind,
>(options: {
	languageSchema: z.ZodType<"he">;
	lemmaSchema: z.ZodType<HeLexemeLemmaBySubKind[LSK]>;
}): HeUninflectableLexemeSchemaBundleFor<LSK> {
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<HeLemmaLexemeSurfaceBySubKind[LSK]>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		HeLemmaLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<HeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;

	return {
		lemmaSchema: options.lemmaSchema,
		lemmaSurfaceSchema,
		lemmaSelectionSchemas: [
			standardLemmaSelectionSchema,
			typoLemmaSelectionSchema,
		],
		surfaceSchemas: [lemmaSurfaceSchema],
		lemma: () => options.lemmaSchema,
		surface: {
			lemma: () => lemmaSurfaceSchema,
		},
		selection: {
			standard: {
				lemma: () => standardLemmaSelectionSchema,
			},
			typo: {
				lemma: () => typoLemmaSelectionSchema,
			},
		},
	};
}

export { buildLemmaSchema };
