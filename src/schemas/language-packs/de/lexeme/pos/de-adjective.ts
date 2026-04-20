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
	deDegreeSchema,
	deGenderSchema,
	deNumberSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deAdjectiveInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Ord"]),
	variant: abstractFeatureAtomSchemas.variant,
} as const;

export const deAdjectiveInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		deAdjectiveInherentFeatureShape,
	) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "ADJ">>;

const deAdjectiveInflectionalFeatureShape = {
	case: deCaseSchema,
	degree: deDegreeSchema,
	gender: deGenderSchema,
	number: deNumberSchema,
} as const;

export const deAdjectiveInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(deAdjectiveInflectionalFeatureShape),
	) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "ADJ">>;

export const deAdjectiveLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADJ",
	inherentFeaturesSchema: deAdjectiveInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "ADJ">>;

export const deAdjectiveSchemas = buildDeInflectableLexemeSchemaBundle<"ADJ">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAdjectiveLemmaSchema,
	inflectionalFeaturesSchema: deAdjectiveInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"ADJ">;
