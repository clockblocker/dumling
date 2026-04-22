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

type EnLexemeLemmaBySubKind = FamilyLemmaBySubKind<"en", "Lexeme">;
type EnLemmaLexemeSurfaceBySubKind = FamilyLemmaSurfaceBySubKind<
	"en",
	"Lexeme"
>;
type EnInflectionLexemeSurfaceBySubKind = FamilyInflectionSurfaceBySubKind<
	"en",
	"Lexeme"
>;
type EnInflectableLexemeSubKind = FamilyInflectableSubKind<"en", "Lexeme">;
type EnLemmaLexemeSelectionBySubKind<
	OS extends "Standard" | "Typo" = "Standard" | "Typo",
> = FamilyLemmaSelectionBySubKind<"en", "Lexeme", OS>;
type EnInflectionLexemeSelectionBySubKind<
	OS extends "Standard" | "Typo" = "Standard" | "Typo",
> = FamilyInflectionSelectionBySubKind<"en", "Lexeme", OS>;

type SchemaLeaf<T> = () => z.ZodType<T>;

type EnLexemeLeafBundleBaseFor<LSK extends keyof EnLexemeLemmaBySubKind> = {
	lemma: SchemaLeaf<EnLexemeLemmaBySubKind[LSK]>;
	lemmaSchema: z.ZodType<EnLexemeLemmaBySubKind[LSK]>;
	lemmaSelectionSchemas: [
		z.ZodType<EnLemmaLexemeSelectionBySubKind<"Standard">[LSK]>,
		z.ZodType<EnLemmaLexemeSelectionBySubKind<"Typo">[LSK]>,
	];
	lemmaSurfaceSchema: z.ZodType<EnLemmaLexemeSurfaceBySubKind[LSK]>;
	selection: {
		standard: {
			lemma: SchemaLeaf<EnLemmaLexemeSelectionBySubKind<"Standard">[LSK]>;
		};
		typo: {
			lemma: SchemaLeaf<EnLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
		};
	};
	surface: {
		lemma: SchemaLeaf<EnLemmaLexemeSurfaceBySubKind[LSK]>;
	};
	surfaceSchemas: [z.ZodType<EnLemmaLexemeSurfaceBySubKind[LSK]>];
};

export type EnUninflectableLexemeSchemaBundleFor<
	LSK extends keyof EnLexemeLemmaBySubKind,
> = EnLexemeLeafBundleBaseFor<LSK>;

export type EnInflectableLexemeSchemaBundleFor<
	LSK extends EnInflectableLexemeSubKind,
> = Omit<
	EnLexemeLeafBundleBaseFor<LSK>,
	"selection" | "surface" | "surfaceSchemas"
> & {
	inflectionSelectionSchemas: [
		z.ZodType<EnInflectionLexemeSelectionBySubKind<"Standard">[LSK]>,
		z.ZodType<EnInflectionLexemeSelectionBySubKind<"Typo">[LSK]>,
	];
	inflectionSurfaceSchema: z.ZodType<EnInflectionLexemeSurfaceBySubKind[LSK]>;
	selection: {
		standard: {
			inflection: SchemaLeaf<
				EnInflectionLexemeSelectionBySubKind<"Standard">[LSK]
			>;
			lemma: SchemaLeaf<EnLemmaLexemeSelectionBySubKind<"Standard">[LSK]>;
		};
		typo: {
			inflection: SchemaLeaf<
				EnInflectionLexemeSelectionBySubKind<"Typo">[LSK]
			>;
			lemma: SchemaLeaf<EnLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
		};
	};
	surface: {
		inflection: SchemaLeaf<EnInflectionLexemeSurfaceBySubKind[LSK]>;
		lemma: SchemaLeaf<EnLemmaLexemeSurfaceBySubKind[LSK]>;
	};
	surfaceSchemas: [
		z.ZodType<EnLemmaLexemeSurfaceBySubKind[LSK]>,
		z.ZodType<EnInflectionLexemeSurfaceBySubKind[LSK]>,
	];
};

export function buildEnInflectableLexemeSchemaBundle<
	LSK extends EnInflectableLexemeSubKind,
>(options: {
	inflectionalFeaturesSchema: z.ZodType<
		EnInflectionLexemeSurfaceBySubKind[LSK]["inflectionalFeatures"]
	>;
	languageSchema: z.ZodType<"en">;
	lemmaSchema: z.ZodType<EnLexemeLemmaBySubKind[LSK]>;
}): EnInflectableLexemeSchemaBundleFor<LSK> {
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<EnLemmaLexemeSurfaceBySubKind[LSK]>;
	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
		inflectionalFeaturesSchema: options.inflectionalFeaturesSchema,
	}) as unknown as z.ZodType<EnInflectionLexemeSurfaceBySubKind[LSK]>;

	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		EnLemmaLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<EnLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		EnInflectionLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		EnInflectionLexemeSelectionBySubKind<"Typo">[LSK]
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

export function buildEnUninflectableLexemeSchemaBundle<
	LSK extends keyof EnLexemeLemmaBySubKind,
>(options: {
	languageSchema: z.ZodType<"en">;
	lemmaSchema: z.ZodType<EnLexemeLemmaBySubKind[LSK]>;
}): EnUninflectableLexemeSchemaBundleFor<LSK> {
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<EnLemmaLexemeSurfaceBySubKind[LSK]>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		EnLemmaLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<EnLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;

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
