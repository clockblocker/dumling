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
	type EnInflectableLexemeSchemaBundleFor,
	buildEnInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";
import {
	enNumberSchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enProperNounInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["PROPN"]),
	style: abstractFeatureAtomSchemas.style.extract(["Expr"]),
} as const;

export const enProperNounInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enProperNounInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "PROPN">
	>;

const enProperNounInflectionalFeatureShape = {
	number: enNumberSchema,
} as const;

export const enProperNounInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enProperNounInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "PROPN">
	>;

export const enProperNounLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PROPN",
	inherentFeaturesSchema: enProperNounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "PROPN">>;

export const enProperNounSchemas = buildEnInflectableLexemeSchemaBundle<"PROPN">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enProperNounLemmaSchema,
	inflectionalFeaturesSchema: enProperNounInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"PROPN">;
