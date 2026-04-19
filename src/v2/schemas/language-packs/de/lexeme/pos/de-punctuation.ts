import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DePunctuationInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-punctuation";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const dePunctuationInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	{
		punctType: abstractFeatureAtomSchemas.punctType,
	},
) satisfies z.ZodType<DePunctuationInherentFeatures>;

export const dePunctuationLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PUNCT",
	inherentFeaturesSchema: dePunctuationInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "PUNCT">>;

export const dePunctuationSchemas = buildDeUninflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: dePunctuationLemmaSchema,
}) as {
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "PUNCT">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "PUNCT">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "PUNCT">>;
	selection: {
		standard: {
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "PUNCT">>;
		};
		typo: {
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "PUNCT">>;
		};
	};
	surface: {
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "PUNCT">>;
	};
};
