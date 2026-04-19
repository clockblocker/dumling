import { z } from "zod/v3";
import type {
	DeAdpositionInherentFeatures,
	DeAdpositionLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-adposition";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	type DeUninflectableLexemeSchemaBundleFor,
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
}) satisfies z.ZodType<DeAdpositionLemma>;

export const deAdpositionSchemas =
	buildDeUninflectableLexemeSchemaBundle<"ADP">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deAdpositionLemmaSchema,
	}) satisfies DeUninflectableLexemeSchemaBundleFor<"ADP">;
