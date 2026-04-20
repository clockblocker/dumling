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

const deSymbolInherentFeatureShape = {
	foreign: abstractFeatureAtomSchemas.foreign,
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Range"]),
} as const;

export const deSymbolInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	deSymbolInherentFeatureShape,
) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "SYM">>;

export const deSymbolInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		case: deCaseSchema,
		gender: deGenderSchema,
		number: deNumberSchema,
	}),
) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "SYM">>;

export const deSymbolLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SYM",
	inherentFeaturesSchema: deSymbolInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "SYM">>;

export const deSymbolSchemas = buildDeInflectableLexemeSchemaBundle<"SYM">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deSymbolLemmaSchema,
	inflectionalFeaturesSchema: deSymbolInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"SYM">;
