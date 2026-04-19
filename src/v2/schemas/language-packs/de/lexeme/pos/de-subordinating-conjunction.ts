import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DeSubordinatingConjunctionInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-subordinating-conjunction";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

export const deSubordinatingConjunctionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema({
		conjType: z.literal("Comp"),
	}) satisfies z.ZodType<DeSubordinatingConjunctionInherentFeatures>;

export const deSubordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SCONJ",
	inherentFeaturesSchema: deSubordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "SCONJ">>;

export const deSubordinatingConjunctionSchemas =
	buildDeUninflectableLexemeSchemaBundle({
		languageSchema: deLanguageSchema,
		lemmaSchema: deSubordinatingConjunctionLemmaSchema,
	}) as {
		lemma: () => z.ZodType<Lemma<"de", "Lexeme", "SCONJ">>;
		lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "SCONJ">>;
		lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "SCONJ">>;
		selection: {
			standard: {
				lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "SCONJ">>;
			};
			typo: {
				lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "SCONJ">>;
			};
		};
		surface: {
			lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "SCONJ">>;
		};
	};
