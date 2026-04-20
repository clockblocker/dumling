import { z } from "zod/v3";
import type { Lemma } from "../../../../types/public-types";
import type { HePhrasemeLemmaBySubKind } from "../../../../types/concrete-language/language-packs/he/phraseme/he-phrasemes";
import type { EmptyFeatures } from "../../../../types/concrete-language/shared";
import { buildOptionalFeatureObjectSchema } from "../../../shared/feature-helpers";
import {
	buildFamilySchemaCatalog,
	defineSchemaCatalog,
	type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import {
	buildHePhrasemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-he-phraseme-schema-bundle";

const heLanguageSchema = z.literal("he");
const emptyFeaturesSchema = buildOptionalFeatureObjectSchema({}) satisfies z.ZodType<EmptyFeatures>;

const heAphorismLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Aphorism",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Phraseme", "Aphorism">>;
const heDiscourseFormulaLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "DiscourseFormula",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Phraseme", "DiscourseFormula">>;
const heIdiomLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Idiom",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Phraseme", "Idiom">>;
const heProverbLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Phraseme",
	lemmaSubKind: "Proverb",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Phraseme", "Proverb">>;

export const hePhrasemeSchemaCatalog = defineSchemaCatalog({
	aphorism: {
		key: "aphorism",
		lemmaSubKind: "Aphorism",
		hasInflection: false,
		bundle: buildHePhrasemeSchemaBundle({
			languageSchema: heLanguageSchema,
			lemmaSchema: heAphorismLemmaSchema,
		}),
	},
	discourseformula: {
		key: "discourseformula",
		lemmaSubKind: "DiscourseFormula",
		hasInflection: false,
		bundle: buildHePhrasemeSchemaBundle({
			languageSchema: heLanguageSchema,
			lemmaSchema: heDiscourseFormulaLemmaSchema,
		}),
	},
	idiom: {
		key: "idiom",
		lemmaSubKind: "Idiom",
		hasInflection: false,
		bundle: buildHePhrasemeSchemaBundle({
			languageSchema: heLanguageSchema,
			lemmaSchema: heIdiomLemmaSchema,
		}),
	},
	proverb: {
		key: "proverb",
		lemmaSubKind: "Proverb",
		hasInflection: false,
		bundle: buildHePhrasemeSchemaBundle({
			languageSchema: heLanguageSchema,
			lemmaSchema: heProverbLemmaSchema,
		}),
	},
} satisfies SchemaCatalogDefinition<keyof HePhrasemeLemmaBySubKind>);

export const hePhrasemeCatalog = buildFamilySchemaCatalog(hePhrasemeSchemaCatalog);
