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

const enLanguageSchema = z.literal("en");

const enSymbolInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADP", "PROPN"]),
} as const;

export const enSymbolInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enSymbolInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "SYM">
	>;

const enSymbolInflectionalFeatureShape = {
	number: abstractFeatureAtomSchemas.number.extract(["Plur", "Sing"]),
} as const;

export const enSymbolInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enSymbolInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "SYM">
	>;

export const enSymbolLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SYM",
	inherentFeaturesSchema: enSymbolInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "SYM">>;

export const enSymbolSchemas = buildEnInflectableLexemeSchemaBundle<"SYM">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enSymbolLemmaSchema,
	inflectionalFeaturesSchema: enSymbolInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"SYM">;
