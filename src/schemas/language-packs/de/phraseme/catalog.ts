import { z } from "zod/v3";
import type { Lemma } from "../../../../types/public-types";
import type {
	FamilyLemmaBySubKind,
} from "../../../../types/concrete-language/family-types";
import type { EmptyFeatures } from "../../../../types/concrete-language/shared";
import { abstractFeatureAtomSchemas } from "../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../shared/feature-helpers";
import {
	buildFamilySchemaCatalog,
	defineSchemaCatalog,
	type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import {
	buildDePhrasemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-de-phraseme-schema-bundle";

type DePhrasemeLemmaBySubKind = FamilyLemmaBySubKind<"de", "Phraseme">;
type DeDiscourseFormulaInherentFeatures =
	DePhrasemeLemmaBySubKind["DiscourseFormula"]["inherentFeatures"];

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

export const dePhrasemeSchemaCatalog = defineSchemaCatalog({
	aphorism: {
		key: "aphorism",
		lemmaSubKind: "Aphorism",
		hasInflection: false,
		bundle: buildDePhrasemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deAphorismLemmaSchema,
		}),
	},
	discourseformula: {
		key: "discourseformula",
		lemmaSubKind: "DiscourseFormula",
		hasInflection: false,
		bundle: buildDePhrasemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deDiscourseFormulaLemmaSchema,
		}),
	},
	idiom: {
		key: "idiom",
		lemmaSubKind: "Idiom",
		hasInflection: false,
		bundle: buildDePhrasemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deIdiomLemmaSchema,
		}),
	},
	proverb: {
		key: "proverb",
		lemmaSubKind: "Proverb",
		hasInflection: false,
		bundle: buildDePhrasemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deProverbLemmaSchema,
		}),
	},
} satisfies SchemaCatalogDefinition<keyof DePhrasemeLemmaBySubKind>);

export const dePhrasemeCatalog = buildFamilySchemaCatalog(dePhrasemeSchemaCatalog);
