import { z } from "zod/v3";
import type {
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
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

const enOtherInherentFeatureShape = {
	extPos: abstractFeatureAtomSchemas.extPos.extract(["PROPN"]),
	foreign: abstractFeatureAtomSchemas.foreign,
} as const;

export const enOtherInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enOtherInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "X">
	>;

export const enOtherLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "X",
	inherentFeaturesSchema: enOtherInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "X">>;

export const enOtherSchemas = buildEnUninflectableLexemeSchemaBundle<"X">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enOtherLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"X">;
