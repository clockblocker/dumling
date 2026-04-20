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

export const deNumeralInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	deNumeralInherentFeatureShape,
) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "NUM">>;

export const deNumeralInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		case: deCaseSchema,
		gender: deGenderSchema,
		number: deNumberSchema,
	}),
) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "NUM">>;

export const deNumeralLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NUM",
	inherentFeaturesSchema: deNumeralInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "NUM">>;

export const deNumeralSchemas = buildDeInflectableLexemeSchemaBundle<"NUM">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deNumeralLemmaSchema,
	inflectionalFeaturesSchema: deNumeralInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"NUM">;
