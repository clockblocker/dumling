import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
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
	) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "PROPN">>;

export const deProperNounInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			number: deNumberSchema,
		}),
	) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "PROPN">>;

export const deProperNounLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PROPN",
	inherentFeaturesSchema: deProperNounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "PROPN">>;

export const deProperNounSchemas =
	buildDeInflectableLexemeSchemaBundle<"PROPN">({
		languageSchema: deLanguageSchema,
		lemmaSchema: deProperNounLemmaSchema,
		inflectionalFeaturesSchema: deProperNounInflectionalFeaturesSchema,
	}) satisfies DeInflectableLexemeSchemaBundleFor<"PROPN">;
