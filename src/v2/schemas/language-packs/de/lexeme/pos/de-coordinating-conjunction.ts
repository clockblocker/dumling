import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DeCoordinatingConjunctionInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-coordinating-conjunction";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const deCoordinatingConjunctionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema({
		conjType: z.literal("Comp"),
	}) satisfies z.ZodType<DeCoordinatingConjunctionInherentFeatures>;

export const deCoordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "CCONJ",
	inherentFeaturesSchema: deCoordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "CCONJ">>;

export const deCoordinatingConjunctionSchemas =
	buildDeUninflectableLexemeSchemaBundle({
		languageSchema: deLanguageSchema,
		lemmaSchema: deCoordinatingConjunctionLemmaSchema,
	}) as {
		lemma: () => z.ZodType<Lemma<"de", "Lexeme", "CCONJ">>;
		lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "CCONJ">>;
		lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "CCONJ">>;
		selection: {
			standard: {
				lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "CCONJ">>;
			};
			typo: {
				lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "CCONJ">>;
			};
		};
		surface: {
			lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "CCONJ">>;
		};
	};
