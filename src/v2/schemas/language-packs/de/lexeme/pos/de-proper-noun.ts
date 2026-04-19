import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DeProperNounInherentFeatures,
	DeProperNounInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-proper-noun";
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

const deProperNounInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	gender: deGenderSchema,
} as const;

export const deProperNounInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deProperNounInherentFeatureShape,
	) satisfies z.ZodType<DeProperNounInherentFeatures>;

export const deProperNounInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			number: deNumberSchema,
		}),
	) satisfies z.ZodType<DeProperNounInflectionalFeatures>;

export const deProperNounLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PROPN",
	inherentFeaturesSchema: deProperNounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "PROPN">>;

export const deProperNounSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deProperNounLemmaSchema,
	inflectionalFeaturesSchema: deProperNounInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "PROPN">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "PROPN">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "PROPN">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "PROPN">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "PROPN">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "PROPN">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "PROPN">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "PROPN">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "PROPN">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "PROPN">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "PROPN">>;
	};
};
