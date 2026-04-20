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
	type EnInflectableLexemeSchemaBundleFor,
	buildEnInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";
import {
	enNumberSchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enNounInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "PROPN"]),
	foreign: abstractFeatureAtomSchemas.foreign,
	numForm: abstractFeatureAtomSchemas.numForm.extract(["Combi", "Digit", "Word"]),
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Frac", "Ord"]),
	style: abstractFeatureAtomSchemas.style.extract(["Expr", "Vrnc"]),
} as const;

export const enNounInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enNounInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "NOUN">
	>;

const enNounInflectionalFeatureShape = {
	number: enNumberSchema,
} as const;

export const enNounInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enNounInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "NOUN">
	>;

export const enNounLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeaturesSchema: enNounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "NOUN">>;

export const enNounSchemas = buildEnInflectableLexemeSchemaBundle<"NOUN">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enNounLemmaSchema,
	inflectionalFeaturesSchema: enNounInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"NOUN">;
