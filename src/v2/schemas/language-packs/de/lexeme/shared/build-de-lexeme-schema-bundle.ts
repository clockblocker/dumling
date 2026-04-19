import type { z } from "zod/v3";
import type {
	DeInflectableLexemeSubKind,
	DeInflectionLexemeSelectionBySubKind,
	DeInflectionLexemeSurfaceBySubKind,
	DeLemmaLexemeSelectionBySubKind,
	DeLemmaLexemeSurfaceBySubKind,
	DeLexemeLemmaBySubKind,
} from "../../../../../types/language-packs/de/lexeme/de-lexemes";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
} from "../../../../shared/builders";

type SchemaLeaf<T> = () => z.ZodType<T>;

type DeLexemeLeafBundleBaseFor<LSK extends keyof DeLexemeLemmaBySubKind> = {
	lemma: SchemaLeaf<DeLexemeLemmaBySubKind[LSK]>;
	lemmaSchema: z.ZodType<DeLexemeLemmaBySubKind[LSK]>;
	lemmaSelectionSchemas: [
		z.ZodType<DeLemmaLexemeSelectionBySubKind<"Standard">[LSK]>,
		z.ZodType<DeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>,
	];
	lemmaSurfaceSchema: z.ZodType<DeLemmaLexemeSurfaceBySubKind[LSK]>;
	selection: {
		standard: {
			lemma: SchemaLeaf<DeLemmaLexemeSelectionBySubKind<"Standard">[LSK]>;
		};
		typo: {
			lemma: SchemaLeaf<DeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
		};
	};
	surface: {
		lemma: SchemaLeaf<DeLemmaLexemeSurfaceBySubKind[LSK]>;
	};
	surfaceSchemas: [z.ZodType<DeLemmaLexemeSurfaceBySubKind[LSK]>];
};

export type DeUninflectableLexemeSchemaBundleFor<
	LSK extends keyof DeLexemeLemmaBySubKind,
> = DeLexemeLeafBundleBaseFor<LSK>;

export type DeInflectableLexemeSchemaBundleFor<
	LSK extends DeInflectableLexemeSubKind,
> = Omit<DeLexemeLeafBundleBaseFor<LSK>, "selection" | "surface" | "surfaceSchemas"> & {
	inflectionSelectionSchemas: [
		z.ZodType<DeInflectionLexemeSelectionBySubKind<"Standard">[LSK]>,
		z.ZodType<DeInflectionLexemeSelectionBySubKind<"Typo">[LSK]>,
	];
	inflectionSurfaceSchema: z.ZodType<DeInflectionLexemeSurfaceBySubKind[LSK]>;
	selection: {
		standard: {
			inflection: SchemaLeaf<
				DeInflectionLexemeSelectionBySubKind<"Standard">[LSK]
			>;
			lemma: SchemaLeaf<DeLemmaLexemeSelectionBySubKind<"Standard">[LSK]>;
		};
		typo: {
			inflection: SchemaLeaf<
				DeInflectionLexemeSelectionBySubKind<"Typo">[LSK]
			>;
			lemma: SchemaLeaf<DeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
		};
	};
	surface: {
		inflection: SchemaLeaf<DeInflectionLexemeSurfaceBySubKind[LSK]>;
		lemma: SchemaLeaf<DeLemmaLexemeSurfaceBySubKind[LSK]>;
	};
	surfaceSchemas: [
		z.ZodType<DeLemmaLexemeSurfaceBySubKind[LSK]>,
		z.ZodType<DeInflectionLexemeSurfaceBySubKind[LSK]>,
	];
};

export function buildDeInflectableLexemeSchemaBundle<
	const LSK extends DeInflectableLexemeSubKind,
>(options: {
	inflectionalFeaturesSchema: z.ZodType<
		DeInflectionLexemeSurfaceBySubKind[LSK]["inflectionalFeatures"]
	>;
	languageSchema: z.ZodType<"de">;
	lemmaSchema: z.ZodType<DeLexemeLemmaBySubKind[LSK]>;
}): DeInflectableLexemeSchemaBundleFor<LSK> {
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<DeLemmaLexemeSurfaceBySubKind[LSK]>;
	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
		inflectionalFeaturesSchema: options.inflectionalFeaturesSchema,
	}) as unknown as z.ZodType<DeInflectionLexemeSurfaceBySubKind[LSK]>;

	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		DeLemmaLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<DeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;
	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		DeInflectionLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		DeInflectionLexemeSelectionBySubKind<"Typo">[LSK]
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

export function buildDeUninflectableLexemeSchemaBundle<
	const LSK extends keyof DeLexemeLemmaBySubKind,
>(options: {
	languageSchema: z.ZodType<"de">;
	lemmaSchema: z.ZodType<DeLexemeLemmaBySubKind[LSK]>;
}): DeUninflectableLexemeSchemaBundleFor<LSK> {
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<DeLemmaLexemeSurfaceBySubKind[LSK]>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		DeLemmaLexemeSelectionBySubKind<"Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<DeLemmaLexemeSelectionBySubKind<"Typo">[LSK]>;

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
