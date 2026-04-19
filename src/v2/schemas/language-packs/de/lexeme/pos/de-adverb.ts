import { z } from "zod/v3";
import type {
	DeAdverbInherentFeatures,
	DeAdverbInflectionalFeatures,
	DeAdverbLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-adverb";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	type DeInflectableLexemeSchemaBundleFor,
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import { deDegreeSchema } from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deAdverbInherentFeatureShape = {
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Mult"]),
	pronType: abstractFeatureAtomSchemas.pronType.extract([
		"Dem",
		"Ind",
		"Int",
		"Neg",
		"Rel",
	]),
} as const;

export const deAdverbInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	deAdverbInherentFeatureShape,
) satisfies z.ZodType<DeAdverbInherentFeatures>;

export const deAdverbInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		degree: deDegreeSchema,
	}),
) satisfies z.ZodType<DeAdverbInflectionalFeatures>;

export const deAdverbLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADV",
	inherentFeaturesSchema: deAdverbInherentFeaturesSchema,
}) satisfies z.ZodType<DeAdverbLemma>;

export const deAdverbSchemas = buildDeInflectableLexemeSchemaBundle<"ADV">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAdverbLemmaSchema,
	inflectionalFeaturesSchema: deAdverbInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"ADV">;
