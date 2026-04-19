import { z } from "zod/v3";
import type { Lemma } from "../../../../public-types";
import type {
	DeDiscourseFormulaInherentFeatures,
} from "../../../../types/language-packs/de/phraseme/de-phrasemes";
import type { EmptyFeatures } from "../../../../types/language-packs/de/shared";
import { buildOptionalFeatureObjectSchema } from "../../../shared/feature-helpers";
import { buildUnionSchema } from "../../../shared/builders";
import { abstractFeatureAtomSchemas } from "../../../abstract/feature-schemas";
import {
	buildDePhrasemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-de-phraseme-schema-bundle";

const deLanguageSchema = z.literal("de");

const emptyFeaturesSchema = buildOptionalFeatureObjectSchema({}) satisfies z.ZodType<EmptyFeatures>;
const deDiscourseFormulaInherentFeaturesSchema = buildOptionalFeatureObjectSchema({
	discourseFormulaRole: abstractFeatureAtomSchemas.discourseFormulaRole,
}) satisfies z.ZodType<DeDiscourseFormulaInherentFeatures>;

const deAphorismLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Aphorism",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Phraseme", "Aphorism">>;
const deDiscourseFormulaLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "DiscourseFormula",
	inherentFeaturesSchema: deDiscourseFormulaInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Phraseme", "DiscourseFormula">>;
const deIdiomLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Idiom",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Phraseme", "Idiom">>;
const deProverbLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Proverb",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Phraseme", "Proverb">>;

const deAphorismSchemas = buildDePhrasemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deAphorismLemmaSchema,
});
const deDiscourseFormulaSchemas = buildDePhrasemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deDiscourseFormulaLemmaSchema,
});
const deIdiomSchemas = buildDePhrasemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deIdiomLemmaSchema,
});
const deProverbSchemas = buildDePhrasemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deProverbLemmaSchema,
});

export const dePhrasemeLemmaSchemaTree = {
	aphorism: deAphorismSchemas.lemma,
	discourseformula: deDiscourseFormulaSchemas.lemma,
	idiom: deIdiomSchemas.lemma,
	proverb: deProverbSchemas.lemma,
} as const;

export const dePhrasemeLemmaSurfaceSchemaTree = {
	aphorism: deAphorismSchemas.surface.lemma,
	discourseformula: deDiscourseFormulaSchemas.surface.lemma,
	idiom: deIdiomSchemas.surface.lemma,
	proverb: deProverbSchemas.surface.lemma,
} as const;

export const dePhrasemeLemmaSelectionSchemaTree = {
	standard: {
		aphorism: deAphorismSchemas.selection.standard.lemma,
		discourseformula: deDiscourseFormulaSchemas.selection.standard.lemma,
		idiom: deIdiomSchemas.selection.standard.lemma,
		proverb: deProverbSchemas.selection.standard.lemma,
	},
	typo: {
		aphorism: deAphorismSchemas.selection.typo.lemma,
		discourseformula: deDiscourseFormulaSchemas.selection.typo.lemma,
		idiom: deIdiomSchemas.selection.typo.lemma,
		proverb: deProverbSchemas.selection.typo.lemma,
	},
} as const;

const dePhrasemeLemmaSchemas = [
	deAphorismSchemas.lemmaSchema,
	deDiscourseFormulaSchemas.lemmaSchema,
	deIdiomSchemas.lemmaSchema,
	deProverbSchemas.lemmaSchema,
] as const satisfies readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]];

const dePhrasemeSurfaceSchemas = [
	...deAphorismSchemas.surfaceSchemas,
	...deDiscourseFormulaSchemas.surfaceSchemas,
	...deIdiomSchemas.surfaceSchemas,
	...deProverbSchemas.surfaceSchemas,
] as const satisfies readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]];

const dePhrasemeSelectionSchemas = [
	...deAphorismSchemas.lemmaSelectionSchemas,
	...deDiscourseFormulaSchemas.lemmaSelectionSchemas,
	...deIdiomSchemas.lemmaSelectionSchemas,
	...deProverbSchemas.lemmaSelectionSchemas,
] as const satisfies readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]];

export const dePhrasemeRuntimeSchemas = {
	lemma: buildUnionSchema(dePhrasemeLemmaSchemas),
	surface: buildUnionSchema(dePhrasemeSurfaceSchemas),
	selection: buildUnionSchema(dePhrasemeSelectionSchemas),
} as const;
