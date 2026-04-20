import { z } from "zod/v3";
import type { Lemma } from "../../../../public-types";
import type {
	EnDiscourseFormulaInherentFeatures,
	EnPhrasemeLemmaBySubKind,
} from "../../../../types/language-packs/en/phraseme/en-phrasemes";
import type { EmptyFeatures } from "../../../../types/language-packs/en/shared";
import { abstractFeatureAtomSchemas } from "../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../shared/feature-helpers";
import {
	buildFamilySchemaCatalog,
	defineSchemaCatalog,
	type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import {
	buildEnPhrasemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-en-phraseme-schema-bundle";

const enLanguageSchema = z.literal("en");

const emptyFeaturesSchema = buildOptionalFeatureObjectSchema({}) satisfies z.ZodType<EmptyFeatures>;
const enDiscourseFormulaInherentFeaturesSchema = buildOptionalFeatureObjectSchema({
	discourseFormulaRole: abstractFeatureAtomSchemas.discourseFormulaRole,
}) satisfies z.ZodType<EnDiscourseFormulaInherentFeatures>;

const enAphorismLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Aphorism",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Phraseme", "Aphorism">>;
const enDiscourseFormulaLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "DiscourseFormula",
	inherentFeaturesSchema: enDiscourseFormulaInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Phraseme", "DiscourseFormula">>;
const enIdiomLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Idiom",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Phraseme", "Idiom">>;
const enProverbLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Proverb",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Phraseme", "Proverb">>;

export const enPhrasemeSchemaCatalog = defineSchemaCatalog({
	aphorism: {
		key: "aphorism",
		lemmaSubKind: "Aphorism",
		hasInflection: false,
		bundle: buildEnPhrasemeSchemaBundle({
			languageSchema: enLanguageSchema,
			lemmaSchema: enAphorismLemmaSchema,
		}),
	},
	discourseformula: {
		key: "discourseformula",
		lemmaSubKind: "DiscourseFormula",
		hasInflection: false,
		bundle: buildEnPhrasemeSchemaBundle({
			languageSchema: enLanguageSchema,
			lemmaSchema: enDiscourseFormulaLemmaSchema,
		}),
	},
	idiom: {
		key: "idiom",
		lemmaSubKind: "Idiom",
		hasInflection: false,
		bundle: buildEnPhrasemeSchemaBundle({
			languageSchema: enLanguageSchema,
			lemmaSchema: enIdiomLemmaSchema,
		}),
	},
	proverb: {
		key: "proverb",
		lemmaSubKind: "Proverb",
		hasInflection: false,
		bundle: buildEnPhrasemeSchemaBundle({
			languageSchema: enLanguageSchema,
			lemmaSchema: enProverbLemmaSchema,
		}),
	},
} satisfies SchemaCatalogDefinition<keyof EnPhrasemeLemmaBySubKind>);

export const enPhrasemeCatalog = buildFamilySchemaCatalog(enPhrasemeSchemaCatalog);
