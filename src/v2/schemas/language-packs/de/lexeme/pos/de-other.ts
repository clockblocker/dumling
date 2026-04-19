import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DeOtherInherentFeatures,
	DeOtherInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-other";
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
	deMoodSchema,
	deNumberSchema,
	deVerbFormSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deOtherInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	hyph: abstractFeatureAtomSchemas.hyph,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Mult", "Range"]),
} as const;

export const deOtherInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deOtherInherentFeatureShape,
	) satisfies z.ZodType<DeOtherInherentFeatures>;

export const deOtherInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			gender: deGenderSchema,
			mood: deMoodSchema,
			number: deNumberSchema,
			verbForm: deVerbFormSchema,
		}),
	) satisfies z.ZodType<DeOtherInflectionalFeatures>;

export const deOtherLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "X",
	inherentFeaturesSchema: deOtherInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "X">>;

export const deOtherSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deOtherLemmaSchema,
	inflectionalFeaturesSchema: deOtherInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "X">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "X">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "X">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "X">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "X">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "X">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "X">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "X">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "X">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "X">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "X">>;
	};
};
