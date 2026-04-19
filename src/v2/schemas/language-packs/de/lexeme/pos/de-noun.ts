import { z } from "zod/v3";
import type {
	DeNounInherentFeatures,
	DeNounInflectionalFeatures,
	DeNounLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-noun";
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

export const deNounInherentFeaturesSchema = buildOptionalFeatureObjectSchema({
	gender: deGenderSchema,
	hyph: abstractFeatureAtomSchemas.hyph,
}) satisfies z.ZodType<DeNounInherentFeatures>;

export const deNounInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		case: deCaseSchema,
		number: deNumberSchema,
	}),
) satisfies z.ZodType<DeNounInflectionalFeatures>;

export const deNounLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeaturesSchema: deNounInherentFeaturesSchema,
}) satisfies z.ZodType<DeNounLemma>;

export const deNounSchemas = buildDeInflectableLexemeSchemaBundle<"NOUN">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deNounLemmaSchema,
	inflectionalFeaturesSchema: deNounInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"NOUN">;
