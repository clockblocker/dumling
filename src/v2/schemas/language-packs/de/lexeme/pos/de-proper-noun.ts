import { z } from "zod/v3";
import type {
	DeProperNounInherentFeatures,
	DeProperNounInflectionalFeatures,
	DeProperNounLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-proper-noun";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	type DeInflectableLexemeSchemaBundleFor,
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	deCaseSchema,
	deGenderSchema,
	deNumberSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deProperNounInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	gender: deGenderSchema,
} as const;

export const deProperNounInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deProperNounInherentFeatureShape,
	) satisfies z.ZodType<DeProperNounInherentFeatures>;

export const deProperNounInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			number: deNumberSchema,
		}),
	) satisfies z.ZodType<DeProperNounInflectionalFeatures>;

export const deProperNounLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PROPN",
	inherentFeaturesSchema: deProperNounInherentFeaturesSchema,
}) satisfies z.ZodType<DeProperNounLemma>;

export const deProperNounSchemas =
	buildDeInflectableLexemeSchemaBundle<"PROPN">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deProperNounLemmaSchema,
		inflectionalFeaturesSchema: deProperNounInflectionalFeaturesSchema,
	}) satisfies DeInflectableLexemeSchemaBundleFor<"PROPN">;
