import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DeAuxiliaryInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-auxiliary";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import { deVerbalInflectionalFeaturesSchema } from "../shared/de-verbal-inflectional-feature-schema";

const deLanguageSchema = z.literal("de");

export const deAuxiliaryInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	{
		verbType: z.literal("Mod"),
	},
) satisfies z.ZodType<DeAuxiliaryInherentFeatures>;

export const deAuxiliaryLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "AUX",
	inherentFeaturesSchema: deAuxiliaryInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "AUX">>;

export const deAuxiliarySchemas = buildDeInflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAuxiliaryLemmaSchema,
	inflectionalFeaturesSchema: deVerbalInflectionalFeaturesSchema,
	inflectionSurfaceSchema: undefined as unknown as z.ZodType<
		Surface<"de", "Inflection", "Lexeme", "AUX">
	>,
}) as {
	inflectionSurfaceSchema: z.ZodType<Surface<"de", "Inflection", "Lexeme", "AUX">>;
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "AUX">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "AUX">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "AUX">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<Selection<"de", "Standard", "Inflection", "Lexeme", "AUX">>;
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "AUX">>;
		};
		typo: {
			inflection: () => z.ZodType<Selection<"de", "Typo", "Inflection", "Lexeme", "AUX">>;
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "AUX">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<Surface<"de", "Inflection", "Lexeme", "AUX">>;
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "AUX">>;
	};
};
