import type { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { LexemeSubKind } from "../../../../../types/core/enums";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
} from "../../../../shared/builders";

type SchemaLeaf<T> = () => z.ZodType<T>;

type DeLexemeLeafBundleBase<
	LSK extends LexemeSubKind,
	TLemma extends Lemma<"de", "Lexeme", LSK>,
	TLemmaSurface extends Surface<"de", "Lemma", "Lexeme", LSK>,
	TStandardLemmaSelection extends Selection<
		"de",
		"Standard",
		"Lemma",
		"Lexeme",
		LSK
	>,
	TTypoLemmaSelection extends Selection<"de", "Typo", "Lemma", "Lexeme", LSK>,
> = {
	lemma: SchemaLeaf<TLemma>;
	lemmaSchema: z.ZodType<TLemma>;
	lemmaSelectionSchemas: [
		z.ZodType<TStandardLemmaSelection>,
		z.ZodType<TTypoLemmaSelection>,
	];
	lemmaSurfaceSchema: z.ZodType<TLemmaSurface>;
	surfaceSchemas: [z.ZodType<TLemmaSurface>];
	selection: {
		standard: {
			lemma: SchemaLeaf<TStandardLemmaSelection>;
		};
		typo: {
			lemma: SchemaLeaf<TTypoLemmaSelection>;
		};
	};
	surface: {
		lemma: SchemaLeaf<TLemmaSurface>;
	};
};

type DeInflectableLexemeLeafBundle<
	LSK extends LexemeSubKind,
	TLemma extends Lemma<"de", "Lexeme", LSK>,
	TLemmaSurface extends Surface<"de", "Lemma", "Lexeme", LSK>,
	TInflectionSurface extends Surface<"de", "Inflection", "Lexeme", LSK>,
	TStandardLemmaSelection extends Selection<
		"de",
		"Standard",
		"Lemma",
		"Lexeme",
		LSK
	>,
	TTypoLemmaSelection extends Selection<"de", "Typo", "Lemma", "Lexeme", LSK>,
	TStandardInflectionSelection extends Selection<
		"de",
		"Standard",
		"Inflection",
		"Lexeme",
		LSK
	>,
	TTypoInflectionSelection extends Selection<
		"de",
		"Typo",
		"Inflection",
		"Lexeme",
		LSK
	>,
> = DeLexemeLeafBundleBase<
	LSK,
	TLemma,
	TLemmaSurface,
	TStandardLemmaSelection,
	TTypoLemmaSelection
> & {
	inflectionSelectionSchemas: [
		z.ZodType<TStandardInflectionSelection>,
		z.ZodType<TTypoInflectionSelection>,
	];
	inflectionSurfaceSchema: z.ZodType<TInflectionSurface>;
	selection: {
		standard: {
			inflection: SchemaLeaf<TStandardInflectionSelection>;
			lemma: SchemaLeaf<TStandardLemmaSelection>;
		};
		typo: {
			inflection: SchemaLeaf<TTypoInflectionSelection>;
			lemma: SchemaLeaf<TTypoLemmaSelection>;
		};
	};
	surface: {
		inflection: SchemaLeaf<TInflectionSurface>;
		lemma: SchemaLeaf<TLemmaSurface>;
	};
	surfaceSchemas: [z.ZodType<TLemmaSurface>, z.ZodType<TInflectionSurface>];
};

type DeUninflectableLexemeLeafBundle<
	LSK extends LexemeSubKind,
	TLemma extends Lemma<"de", "Lexeme", LSK>,
	TLemmaSurface extends Surface<"de", "Lemma", "Lexeme", LSK>,
	TStandardLemmaSelection extends Selection<
		"de",
		"Standard",
		"Lemma",
		"Lexeme",
		LSK
	>,
	TTypoLemmaSelection extends Selection<"de", "Typo", "Lemma", "Lexeme", LSK>,
> = DeLexemeLeafBundleBase<
	LSK,
	TLemma,
	TLemmaSurface,
	TStandardLemmaSelection,
	TTypoLemmaSelection
>;

export function buildDeInflectableLexemeSchemaBundle<
	LSK extends LexemeSubKind,
	TLemma extends Lemma<"de", "Lexeme", LSK>,
	TInflectionalFeatures extends object,
	TLemmaSurface extends Surface<"de", "Lemma", "Lexeme", LSK>,
	TInflectionSurface extends Surface<"de", "Inflection", "Lexeme", LSK>,
	TStandardLemmaSelection extends Selection<
		"de",
		"Standard",
		"Lemma",
		"Lexeme",
		LSK
	>,
	TTypoLemmaSelection extends Selection<"de", "Typo", "Lemma", "Lexeme", LSK>,
	TStandardInflectionSelection extends Selection<
		"de",
		"Standard",
		"Inflection",
		"Lexeme",
		LSK
	>,
	TTypoInflectionSelection extends Selection<
		"de",
		"Typo",
		"Inflection",
		"Lexeme",
		LSK
	>,
>(options: {
	inflectionSurfaceSchema?: z.ZodType<TInflectionSurface>;
	inflectionalFeaturesSchema: z.ZodType<TInflectionalFeatures>;
	languageSchema: z.ZodType<"de">;
	lemmaSchema: z.ZodType<TLemma>;
}) {
	const lemmaSurfaceSchema =
		buildLemmaSurfaceSchema({
			languageSchema: options.languageSchema,
			lemmaSchema: options.lemmaSchema,
		}) as unknown as z.ZodType<TLemmaSurface>;
	const inflectionSurfaceSchema =
		options.inflectionSurfaceSchema ??
		(buildInflectionSurfaceSchema({
			languageSchema: options.languageSchema,
			lemmaSchema: options.lemmaSchema,
			inflectionalFeaturesSchema: options.inflectionalFeaturesSchema,
		}) as unknown as z.ZodType<TInflectionSurface>);

	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<TStandardLemmaSelection>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<TTypoLemmaSelection>;
	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<TStandardInflectionSelection>;
	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<TTypoInflectionSelection>;

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
	LSK extends LexemeSubKind,
	TLemma extends Lemma<"de", "Lexeme", LSK>,
	TLemmaSurface extends Surface<"de", "Lemma", "Lexeme", LSK>,
	TStandardLemmaSelection extends Selection<
		"de",
		"Standard",
		"Lemma",
		"Lexeme",
		LSK
	>,
	TTypoLemmaSelection extends Selection<"de", "Typo", "Lemma", "Lexeme", LSK>,
>(options: {
	languageSchema: z.ZodType<"de">;
	lemmaSchema: z.ZodType<TLemma>;
}) {
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<TLemmaSurface>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<TStandardLemmaSelection>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<TTypoLemmaSelection>;

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
