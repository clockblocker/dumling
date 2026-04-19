import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type {
	DePronounInherentFeatures,
	DePronounInflectionalFeatures,
} from "../../../../../types/language-packs/de/lexeme/pos/de-pronoun";
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
	dePersonSchema,
	dePoliteSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const dePronounInherentFeatureShape = {
	extPos: abstractFeatureAtomSchemas.extPos.extract(["DET"]),
	foreign: abstractFeatureAtomSchemas.foreign,
	person: dePersonSchema,
	polite: dePoliteSchema,
	poss: abstractFeatureAtomSchemas.poss,
	pronType: abstractFeatureAtomSchemas.pronType.extract([
		"Dem",
		"Ind",
		"Int",
		"Neg",
		"Prs",
		"Rcp",
		"Rel",
		"Tot",
	]),
} as const;

export const dePronounInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	dePronounInherentFeatureShape,
) satisfies z.ZodType<DePronounInherentFeatures>;

export const dePronounInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			gender: deGenderSchema,
			number: deNumberSchema,
			reflex: abstractFeatureAtomSchemas.reflex,
		}),
	) satisfies z.ZodType<DePronounInflectionalFeatures>;

export const dePronounLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PRON",
	inherentFeaturesSchema: dePronounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "PRON">>;

export const dePronounSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: dePronounLemmaSchema,
	inflectionalFeaturesSchema: dePronounInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "PRON">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "PRON">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "PRON">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "PRON">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "PRON">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "PRON">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "PRON">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "PRON">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "PRON">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "PRON">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "PRON">>;
	};
};
