import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DeAdpositionInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-adposition";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";

const deLanguageSchema = z.literal("de");

const deAdpositionInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	adpType: abstractFeatureAtomSchemas.adpType.extract(["Circ", "Post", "Prep"]),
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "SCONJ"]),
	foreign: abstractFeatureAtomSchemas.foreign,
	governedCase: abstractFeatureAtomSchemas.governedCase,
	partType: abstractFeatureAtomSchemas.partType.extract(["Vbp"]),
} as const;

export const deAdpositionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deAdpositionInherentFeatureShape,
	) satisfies z.ZodType<DeAdpositionInherentFeatures>;

export const deAdpositionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADP",
	inherentFeaturesSchema: deAdpositionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "ADP">>;

export const deAdpositionSchemas = buildDeUninflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAdpositionLemmaSchema,
}) as {
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "ADP">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "ADP">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "ADP">>;
	selection: {
		standard: {
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "ADP">>;
		};
		typo: {
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "ADP">>;
		};
	};
	surface: {
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "ADP">>;
	};
};
