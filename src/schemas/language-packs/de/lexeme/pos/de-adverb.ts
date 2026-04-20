import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../public-types";
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
) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "ADV">>;

export const deAdverbInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		degree: deDegreeSchema,
	}),
) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "ADV">>;

export const deAdverbLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADV",
	inherentFeaturesSchema: deAdverbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "ADV">>;

export const deAdverbSchemas = buildDeInflectableLexemeSchemaBundle<"ADV">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAdverbLemmaSchema,
	inflectionalFeaturesSchema: deAdverbInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"ADV">;
