import { z } from "zod/v3";
import type {
	DeNumeralInherentFeatures,
	DeNumeralInflectionalFeatures,
	DeNumeralLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-numeral";
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

const deNumeralInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract([
		"Card",
		"Frac",
		"Mult",
		"Range",
	]),
} as const;

export const deNumeralInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deNumeralInherentFeatureShape,
	) satisfies z.ZodType<DeNumeralInherentFeatures>;

export const deNumeralInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			gender: deGenderSchema,
			number: deNumberSchema,
		}),
	) satisfies z.ZodType<DeNumeralInflectionalFeatures>;

export const deNumeralLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NUM",
	inherentFeaturesSchema: deNumeralInherentFeaturesSchema,
}) satisfies z.ZodType<DeNumeralLemma>;

export const deNumeralSchemas = buildDeInflectableLexemeSchemaBundle<"NUM">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deNumeralLemmaSchema,
	inflectionalFeaturesSchema: deNumeralInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"NUM">;
