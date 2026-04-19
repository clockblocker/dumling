import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DeVerbInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-verb";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import { deVerbalInflectionalFeaturesSchema } from "../shared/de-verbal-inflectional-feature-schema";

const deLanguageSchema = z.literal("de");

export const deVerbInherentFeaturesSchema = buildOptionalFeatureObjectSchema({
	hasGovPrep: abstractFeatureAtomSchemas.hasGovPrep,
	hasSepPrefix: abstractFeatureAtomSchemas.hasSepPrefix,
	lexicallyReflexive: abstractFeatureAtomSchemas.lexicallyReflexive,
	verbType: z.literal("Mod"),
}) satisfies z.ZodType<DeVerbInherentFeatures>;

export const deVerbLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeaturesSchema: deVerbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "VERB">>;

export const deVerbSchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deVerbLemmaSchema,
	inflectionalFeaturesSchema: deVerbalInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "VERB">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "VERB">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "VERB">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "VERB">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "VERB">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "VERB">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "VERB">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "VERB">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "VERB">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "VERB">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "VERB">>;
	};
};
