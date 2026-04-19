import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DeNounInherentFeatures,
	DeNounInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-noun";
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

export const deNounInherentFeaturesSchema = buildOptionalFeatureObjectSchema({
	gender: deGenderSchema,
	hyph: abstractFeatureAtomSchemas.hyph,
}) satisfies z.ZodType<DeNounInherentFeatures>;

export const deNounInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		case: deCaseSchema,
		number: deNumberSchema,
	}),
) satisfies z.ZodType<DeNounInflectionalFeatures>;

export const deNounLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeaturesSchema: deNounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "NOUN">>;

export const deNounSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deNounLemmaSchema,
	inflectionalFeaturesSchema: deNounInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "NOUN">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "NOUN">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "NOUN">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "NOUN">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "NOUN">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "NOUN">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "NOUN">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "NOUN">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "NOUN">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "NOUN">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "NOUN">>;
	};
};
