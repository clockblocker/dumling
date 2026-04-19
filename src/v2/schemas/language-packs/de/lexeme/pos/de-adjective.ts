import { z } from "zod/v3";
import type {
	Lemma,
	Selection,
	Surface,
} from "../../../../../public-types";
import type {
	DeAdjectiveInherentFeatures,
	DeAdjectiveInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-adjective";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	deCaseSchema,
	deDegreeSchema,
	deGenderSchema,
	deNumberSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deAdjectiveInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Ord"]),
	variant: abstractFeatureAtomSchemas.variant,
} as const;

export const deAdjectiveInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deAdjectiveInherentFeatureShape,
	) satisfies z.ZodType<DeAdjectiveInherentFeatures>;

const deAdjectiveInflectionalFeatureShape = {
	case: deCaseSchema,
	degree: deDegreeSchema,
	gender: deGenderSchema,
	number: deNumberSchema,
} as const;

export const deAdjectiveInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(deAdjectiveInflectionalFeatureShape),
	) satisfies z.ZodType<DeAdjectiveInflectionalFeatures>;

export const deAdjectiveLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADJ",
	inherentFeaturesSchema: deAdjectiveInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "ADJ">>;

export const deAdjectiveSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAdjectiveLemmaSchema,
	inflectionalFeaturesSchema: deAdjectiveInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "ADJ">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "ADJ">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "ADJ">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "ADJ">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "ADJ">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "ADJ">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "ADJ">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "ADJ">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "ADJ">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "ADJ">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "ADJ">>;
	};
};
