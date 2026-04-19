import { z } from "zod/v3";
import type {
	DeSymbolInherentFeatures,
	DeSymbolInflectionalFeatures,
	DeSymbolLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-symbol";
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
) satisfies z.ZodType<DeSymbolInherentFeatures>;

export const deSymbolInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema({
			case: deCaseSchema,
			gender: deGenderSchema,
			number: deNumberSchema,
		}),
	) satisfies z.ZodType<DeSymbolInflectionalFeatures>;

export const deSymbolLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SYM",
	inherentFeaturesSchema: deSymbolInherentFeaturesSchema,
}) satisfies z.ZodType<DeSymbolLemma>;

export const deSymbolSchemas = buildDeInflectableLexemeSchemaBundle<"SYM">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deSymbolLemmaSchema,
	inflectionalFeaturesSchema: deSymbolInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"SYM">;
