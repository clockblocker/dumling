import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DeNumeralInherentFeatures,
	DeNumeralInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-numeral";
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

const deNumeralInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract([
		"Card",
		"Frac",
		"Mult",
		"Range",
	]),
} as const;

export const deNumeralInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deNumeralInherentFeatureShape,
	) satisfies z.ZodType<DeNumeralInherentFeatures>;

export const deNumeralInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			gender: deGenderSchema,
			number: deNumberSchema,
		}),
	) satisfies z.ZodType<DeNumeralInflectionalFeatures>;

export const deNumeralLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NUM",
	inherentFeaturesSchema: deNumeralInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "NUM">>;

export const deNumeralSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deNumeralLemmaSchema,
	inflectionalFeaturesSchema: deNumeralInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "NUM">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "NUM">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "NUM">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "NUM">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "NUM">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "NUM">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "NUM">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "NUM">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "NUM">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "NUM">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "NUM">>;
	};
};
