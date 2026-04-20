import { z } from "zod/v3";
import type { InherentFeaturesFor, Lemma } from "../../../../../public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeUninflectableLexemeSchemaBundleFor,
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";

const deLanguageSchema = z.literal("de");

const deAdpositionInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	adpType: abstractFeatureAtomSchemas.adpType.extract([
		"Circ",
		"Post",
		"Prep",
	]),
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "SCONJ"]),
	foreign: abstractFeatureAtomSchemas.foreign,
	governedCase: abstractFeatureAtomSchemas.governedCase,
	partType: abstractFeatureAtomSchemas.partType.extract(["Vbp"]),
} as const;

export const deAdpositionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deAdpositionInherentFeatureShape,
	) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "ADP">>;

export const deAdpositionLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADP",
	inherentFeaturesSchema: deAdpositionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "ADP">>;

export const deAdpositionSchemas =
	buildDeUninflectableLexemeSchemaBundle<"ADP">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deAdpositionLemmaSchema,
	}) satisfies DeUninflectableLexemeSchemaBundleFor<"ADP">;
