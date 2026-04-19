import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DeAdverbInherentFeatures,
	DeAdverbInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-adverb";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import { deDegreeSchema } from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deAdverbInherentFeatureShape = {
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Mult"]),
	pronType: abstractFeatureAtomSchemas.pronType.extract([
		"Dem",
		"Ind",
		"Int",
		"Neg",
		"Rel",
	]),
} as const;

export const deAdverbInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	deAdverbInherentFeatureShape,
) satisfies z.ZodType<DeAdverbInherentFeatures>;

export const deAdverbInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		degree: deDegreeSchema,
	}),
) satisfies z.ZodType<DeAdverbInflectionalFeatures>;

export const deAdverbLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADV",
	inherentFeaturesSchema: deAdverbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "ADV">>;

export const deAdverbSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAdverbLemmaSchema,
	inflectionalFeaturesSchema: deAdverbInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "ADV">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "ADV">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "ADV">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "ADV">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "ADV">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "ADV">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "ADV">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "ADV">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "ADV">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "ADV">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "ADV">>;
	};
};
