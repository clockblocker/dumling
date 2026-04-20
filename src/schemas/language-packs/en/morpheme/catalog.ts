import { z } from "zod/v3";
import type { Lemma } from "../../../../public-types";
import type { EnMorphemeLemmaBySubKind } from "../../../../types/language-packs/en/morpheme/en-morphemes";
import type { EmptyFeatures } from "../../../../types/language-packs/shared";
import { buildOptionalFeatureObjectSchema } from "../../../shared/feature-helpers";
import {
    buildFamilySchemaCatalog,
    defineSchemaCatalog,
    type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import {
    buildEnMorphemeSchemaBundle,
    buildLemmaSchema,
} from "./shared/build-en-morpheme-schema-bundle";

const enLanguageSchema = z.literal("en");
const emptyFeaturesSchema = buildOptionalFeatureObjectSchema({}) satisfies z.ZodType<EmptyFeatures>;

const enCircumfixLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Circumfix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Circumfix">>;
const enCliticLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Clitic", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Clitic">>;
const enDuplifixLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Duplifix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Duplifix">>;
const enInfixLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Infix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Infix">>;
const enInterfixLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Interfix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Interfix">>;
const enPrefixLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Prefix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Prefix">>;
const enRootLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Root", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Root">>;
const enSuffixLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Suffix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Suffix">>;
const enSuffixoidLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Suffixoid", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Suffixoid">>;
const enToneMarkingLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "ToneMarking", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "ToneMarking">>;
const enTransfixLemmaSchema = buildLemmaSchema({ languageSchema: enLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Transfix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"en", "Morpheme", "Transfix">>;

export const enMorphemeSchemaCatalog = defineSchemaCatalog({
    circumfix: { key: "circumfix", lemmaSubKind: "Circumfix", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enCircumfixLemmaSchema }) },
    clitic: { key: "clitic", lemmaSubKind: "Clitic", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enCliticLemmaSchema }) },
    duplifix: { key: "duplifix", lemmaSubKind: "Duplifix", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enDuplifixLemmaSchema }) },
    infix: { key: "infix", lemmaSubKind: "Infix", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enInfixLemmaSchema }) },
    interfix: { key: "interfix", lemmaSubKind: "Interfix", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enInterfixLemmaSchema }) },
    prefix: { key: "prefix", lemmaSubKind: "Prefix", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enPrefixLemmaSchema }) },
    root: { key: "root", lemmaSubKind: "Root", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enRootLemmaSchema }) },
    suffix: { key: "suffix", lemmaSubKind: "Suffix", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enSuffixLemmaSchema }) },
    suffixoid: { key: "suffixoid", lemmaSubKind: "Suffixoid", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enSuffixoidLemmaSchema }) },
    tonemarking: { key: "tonemarking", lemmaSubKind: "ToneMarking", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enToneMarkingLemmaSchema }) },
    transfix: { key: "transfix", lemmaSubKind: "Transfix", hasInflection: false, bundle: buildEnMorphemeSchemaBundle({ languageSchema: enLanguageSchema, lemmaSchema: enTransfixLemmaSchema }) },
} satisfies SchemaCatalogDefinition<keyof EnMorphemeLemmaBySubKind>);

export const enMorphemeCatalog = buildFamilySchemaCatalog(enMorphemeSchemaCatalog);
