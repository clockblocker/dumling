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
	buildDeMorphemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-de-morpheme-schema-bundle";

type DeMorphemeLemmaBySubKind = FamilyLemmaBySubKind<"de", "Morpheme">;
type DePrefixMorphemeInherentFeatures =
	DeMorphemeLemmaBySubKind["Prefix"]["inherentFeatures"];

const deLanguageSchema = z.literal("de");

const emptyFeaturesSchema = buildOptionalFeatureObjectSchema({}) satisfies z.ZodType<EmptyFeatures>;
const dePrefixMorphemeInherentFeaturesSchema = buildOptionalFeatureObjectSchema({
	hasSepPrefix: abstractFeatureAtomSchemas.hasSepPrefix,
}) satisfies z.ZodType<DePrefixMorphemeInherentFeatures>;

const deCircumfixLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Circumfix",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Circumfix">>;
const deCliticLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Clitic",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Clitic">>;
const deDuplifixLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Duplifix",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Duplifix">>;
const deInfixLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Infix",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Infix">>;
const deInterfixLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Interfix",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Interfix">>;
const dePrefixLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Prefix",
	inherentFeaturesSchema: dePrefixMorphemeInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Prefix">>;
const deRootLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Root",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Root">>;
const deSuffixLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Suffix",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Suffix">>;
const deSuffixoidLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Suffixoid",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Suffixoid">>;
const deToneMarkingLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "ToneMarking",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "ToneMarking">>;
const deTransfixLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Morpheme",
	lemmaSubKind: "Transfix",
	inherentFeaturesSchema: emptyFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Morpheme", "Transfix">>;

export const deMorphemeSchemaCatalog = defineSchemaCatalog({
	circumfix: {
		key: "circumfix",
		lemmaSubKind: "Circumfix",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deCircumfixLemmaSchema,
		}),
	},
	clitic: {
		key: "clitic",
		lemmaSubKind: "Clitic",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deCliticLemmaSchema,
		}),
	},
	duplifix: {
		key: "duplifix",
		lemmaSubKind: "Duplifix",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deDuplifixLemmaSchema,
		}),
	},
	infix: {
		key: "infix",
		lemmaSubKind: "Infix",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deInfixLemmaSchema,
		}),
	},
	interfix: {
		key: "interfix",
		lemmaSubKind: "Interfix",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deInterfixLemmaSchema,
		}),
	},
	prefix: {
		key: "prefix",
		lemmaSubKind: "Prefix",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: dePrefixLemmaSchema,
		}),
	},
	root: {
		key: "root",
		lemmaSubKind: "Root",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deRootLemmaSchema,
		}),
	},
	suffix: {
		key: "suffix",
		lemmaSubKind: "Suffix",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deSuffixLemmaSchema,
		}),
	},
	suffixoid: {
		key: "suffixoid",
		lemmaSubKind: "Suffixoid",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deSuffixoidLemmaSchema,
		}),
	},
	tonemarking: {
		key: "tonemarking",
		lemmaSubKind: "ToneMarking",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deToneMarkingLemmaSchema,
		}),
	},
	transfix: {
		key: "transfix",
		lemmaSubKind: "Transfix",
		hasInflection: false,
		bundle: buildDeMorphemeSchemaBundle({
			languageSchema: deLanguageSchema,
			lemmaSchema: deTransfixLemmaSchema,
		}),
	},
} satisfies SchemaCatalogDefinition<keyof DeMorphemeLemmaBySubKind>);

export const deMorphemeCatalog = buildFamilySchemaCatalog(deMorphemeSchemaCatalog);
