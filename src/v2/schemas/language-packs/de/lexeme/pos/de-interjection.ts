import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DeInterjectionInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-interjection";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const deInterjectionInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	{
		partType: z.literal("Res"),
	},
) satisfies z.ZodType<DeInterjectionInherentFeatures>;

export const deInterjectionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "INTJ",
	inherentFeaturesSchema: deInterjectionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "INTJ">>;

export const deInterjectionSchemas = buildDeUninflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deInterjectionLemmaSchema,
}) as {
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "INTJ">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "INTJ">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "INTJ">>;
	selection: {
		standard: {
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "INTJ">>;
		};
		typo: {
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "INTJ">>;
		};
	};
	surface: {
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "INTJ">>;
	};
};
