import { z } from "zod/v3";
import type { Lemma } from "../../../../types/public-types";
import type { HeMorphemeLemmaBySubKind } from "../../../../types/concrete-language/language-packs/he/morpheme/he-morphemes";
import type { EmptyFeatures } from "../../../../types/concrete-language/shared";
import { buildOptionalFeatureObjectSchema } from "../../../shared/feature-helpers";
import {
	buildFamilySchemaCatalog,
	defineSchemaCatalog,
	type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import {
	buildHeMorphemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-he-morpheme-schema-bundle";

const heLanguageSchema = z.literal("he");
const emptyFeaturesSchema = buildOptionalFeatureObjectSchema({}) satisfies z.ZodType<EmptyFeatures>;

const heCircumfixLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Circumfix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Circumfix">>;
const heCliticLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Clitic", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Clitic">>;
const heDuplifixLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Duplifix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Duplifix">>;
const heInfixLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Infix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Infix">>;
const heInterfixLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Interfix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Interfix">>;
const hePrefixLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Prefix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Prefix">>;
const heRootLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Root", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Root">>;
const heSuffixLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Suffix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Suffix">>;
const heSuffixoidLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Suffixoid", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Suffixoid">>;
const heToneMarkingLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "ToneMarking", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "ToneMarking">>;
const heTransfixLemmaSchema = buildLemmaSchema({ languageSchema: heLanguageSchema, lemmaKind: "Morpheme", lemmaSubKind: "Transfix", inherentFeaturesSchema: emptyFeaturesSchema }) satisfies z.ZodType<Lemma<"he", "Morpheme", "Transfix">>;

export const heMorphemeSchemaCatalog = defineSchemaCatalog({
	circumfix: { key: "circumfix", lemmaSubKind: "Circumfix", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heCircumfixLemmaSchema }) },
	clitic: { key: "clitic", lemmaSubKind: "Clitic", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heCliticLemmaSchema }) },
	duplifix: { key: "duplifix", lemmaSubKind: "Duplifix", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heDuplifixLemmaSchema }) },
	infix: { key: "infix", lemmaSubKind: "Infix", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heInfixLemmaSchema }) },
	interfix: { key: "interfix", lemmaSubKind: "Interfix", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heInterfixLemmaSchema }) },
	prefix: { key: "prefix", lemmaSubKind: "Prefix", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: hePrefixLemmaSchema }) },
	root: { key: "root", lemmaSubKind: "Root", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heRootLemmaSchema }) },
	suffix: { key: "suffix", lemmaSubKind: "Suffix", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heSuffixLemmaSchema }) },
	suffixoid: { key: "suffixoid", lemmaSubKind: "Suffixoid", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heSuffixoidLemmaSchema }) },
	tonemarking: { key: "tonemarking", lemmaSubKind: "ToneMarking", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heToneMarkingLemmaSchema }) },
	transfix: { key: "transfix", lemmaSubKind: "Transfix", hasInflection: false, bundle: buildHeMorphemeSchemaBundle({ languageSchema: heLanguageSchema, lemmaSchema: heTransfixLemmaSchema }) },
} satisfies SchemaCatalogDefinition<keyof HeMorphemeLemmaBySubKind>);

export const heMorphemeCatalog = buildFamilySchemaCatalog(heMorphemeSchemaCatalog);
