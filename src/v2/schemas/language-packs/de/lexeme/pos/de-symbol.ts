import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DeSymbolInherentFeatures,
	DeSymbolInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-symbol";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	deCaseSchema,
	deGenderSchema,
	deNumberSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deSymbolInherentFeatureShape = {
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Range"]),
} as const;

export const deSymbolInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	deSymbolInherentFeatureShape,
) satisfies z.ZodType<DeSymbolInherentFeatures>;

export const deSymbolInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			gender: deGenderSchema,
			number: deNumberSchema,
		}),
	) satisfies z.ZodType<DeSymbolInflectionalFeatures>;

export const deSymbolLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SYM",
	inherentFeaturesSchema: deSymbolInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "SYM">>;

export const deSymbolSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deSymbolLemmaSchema,
	inflectionalFeaturesSchema: deSymbolInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "SYM">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "SYM">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "SYM">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "SYM">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "SYM">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "SYM">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "SYM">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "SYM">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "SYM">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "SYM">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "SYM">>;
	};
};
