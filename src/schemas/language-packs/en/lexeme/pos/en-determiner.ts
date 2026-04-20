import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	type EnInflectableLexemeSchemaBundleFor,
	buildEnInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";
import {
	enDefiniteSchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enDeterminerInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	definite: enDefiniteSchema,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "PRON"]),
	numForm: abstractFeatureAtomSchemas.numForm.extract(["Word"]),
	numType: abstractFeatureAtomSchemas.numType.extract(["Frac"]),
	pronType: featureValueSet(abstractFeatureAtomSchemas.pronType.extract(["Art", "Dem", "Ind", "Int", "Neg", "Rcp", "Rel", "Tot"])),
	style: abstractFeatureAtomSchemas.style.extract(["Vrnc"]),
} as const;

export const enDeterminerInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enDeterminerInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "DET">
	>;

const enDeterminerInflectionalFeatureShape = {
	number: abstractFeatureAtomSchemas.number.extract(["Plur", "Sing"]),
} as const;

export const enDeterminerInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enDeterminerInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "DET">
	>;

export const enDeterminerLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "DET",
	inherentFeaturesSchema: enDeterminerInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "DET">>;

export const enDeterminerSchemas = buildEnInflectableLexemeSchemaBundle<"DET">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enDeterminerLemmaSchema,
	inflectionalFeaturesSchema: enDeterminerInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"DET">;
