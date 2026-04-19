import { z } from "zod/v3";
import type {
	InherentFeaturesFor,
	Lemma,
} from "../../../../../public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
} from "../../../../shared/feature-helpers";
import {
	type EnUninflectableLexemeSchemaBundleFor,
	buildEnUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";

const enLanguageSchema = z.literal("en");

const enAdpositionInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADP", "ADV", "SCONJ"]),
} as const;

export const enAdpositionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enAdpositionInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "ADP">
	>;

export const enAdpositionLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADP",
	inherentFeaturesSchema: enAdpositionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "ADP">>;

export const enAdpositionSchemas = buildEnUninflectableLexemeSchemaBundle<"ADP">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enAdpositionLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"ADP">;
