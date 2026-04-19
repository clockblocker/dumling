import { z } from "zod/v3";
import type { Lemma } from "../../../../public-types";
import type {
	DePrefixMorphemeInherentFeatures,
} from "../../../../types/language-packs/de/morpheme/de-morphemes";
import type { EmptyFeatures } from "../../../../types/language-packs/de/shared";
import { buildOptionalFeatureObjectSchema } from "../../../shared/feature-helpers";
import { buildUnionSchema } from "../../../shared/builders";
import { abstractFeatureAtomSchemas } from "../../../abstract/feature-schemas";
import {
	buildDeMorphemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-de-morpheme-schema-bundle";

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

const deCircumfixSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deCircumfixLemmaSchema,
});
const deCliticSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deCliticLemmaSchema,
});
const deDuplifixSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deDuplifixLemmaSchema,
});
const deInfixSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deInfixLemmaSchema,
});
const deInterfixSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deInterfixLemmaSchema,
});
const dePrefixSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: dePrefixLemmaSchema,
});
const deRootSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deRootLemmaSchema,
});
const deSuffixSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deSuffixLemmaSchema,
});
const deSuffixoidSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deSuffixoidLemmaSchema,
});
const deToneMarkingSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deToneMarkingLemmaSchema,
});
const deTransfixSchemas = buildDeMorphemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deTransfixLemmaSchema,
});

export const deMorphemeLemmaSchemaTree = {
	circumfix: deCircumfixSchemas.lemma,
	clitic: deCliticSchemas.lemma,
	duplifix: deDuplifixSchemas.lemma,
	infix: deInfixSchemas.lemma,
	interfix: deInterfixSchemas.lemma,
	prefix: dePrefixSchemas.lemma,
	root: deRootSchemas.lemma,
	suffix: deSuffixSchemas.lemma,
	suffixoid: deSuffixoidSchemas.lemma,
	tonemarking: deToneMarkingSchemas.lemma,
	transfix: deTransfixSchemas.lemma,
} as const;

export const deMorphemeLemmaSurfaceSchemaTree = {
	circumfix: deCircumfixSchemas.surface.lemma,
	clitic: deCliticSchemas.surface.lemma,
	duplifix: deDuplifixSchemas.surface.lemma,
	infix: deInfixSchemas.surface.lemma,
	interfix: deInterfixSchemas.surface.lemma,
	prefix: dePrefixSchemas.surface.lemma,
	root: deRootSchemas.surface.lemma,
	suffix: deSuffixSchemas.surface.lemma,
	suffixoid: deSuffixoidSchemas.surface.lemma,
	tonemarking: deToneMarkingSchemas.surface.lemma,
	transfix: deTransfixSchemas.surface.lemma,
} as const;

export const deMorphemeLemmaSelectionSchemaTree = {
	standard: {
		circumfix: deCircumfixSchemas.selection.standard.lemma,
		clitic: deCliticSchemas.selection.standard.lemma,
		duplifix: deDuplifixSchemas.selection.standard.lemma,
		infix: deInfixSchemas.selection.standard.lemma,
		interfix: deInterfixSchemas.selection.standard.lemma,
		prefix: dePrefixSchemas.selection.standard.lemma,
		root: deRootSchemas.selection.standard.lemma,
		suffix: deSuffixSchemas.selection.standard.lemma,
		suffixoid: deSuffixoidSchemas.selection.standard.lemma,
		tonemarking: deToneMarkingSchemas.selection.standard.lemma,
		transfix: deTransfixSchemas.selection.standard.lemma,
	},
	typo: {
		circumfix: deCircumfixSchemas.selection.typo.lemma,
		clitic: deCliticSchemas.selection.typo.lemma,
		duplifix: deDuplifixSchemas.selection.typo.lemma,
		infix: deInfixSchemas.selection.typo.lemma,
		interfix: deInterfixSchemas.selection.typo.lemma,
		prefix: dePrefixSchemas.selection.typo.lemma,
		root: deRootSchemas.selection.typo.lemma,
		suffix: deSuffixSchemas.selection.typo.lemma,
		suffixoid: deSuffixoidSchemas.selection.typo.lemma,
		tonemarking: deToneMarkingSchemas.selection.typo.lemma,
		transfix: deTransfixSchemas.selection.typo.lemma,
	},
} as const;

const deMorphemeLemmaSchemas = [
	deCircumfixSchemas.lemmaSchema,
	deCliticSchemas.lemmaSchema,
	deDuplifixSchemas.lemmaSchema,
	deInfixSchemas.lemmaSchema,
	deInterfixSchemas.lemmaSchema,
	dePrefixSchemas.lemmaSchema,
	deRootSchemas.lemmaSchema,
	deSuffixSchemas.lemmaSchema,
	deSuffixoidSchemas.lemmaSchema,
	deToneMarkingSchemas.lemmaSchema,
	deTransfixSchemas.lemmaSchema,
] as const satisfies readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]];

const deMorphemeSurfaceSchemas = [
	...deCircumfixSchemas.surfaceSchemas,
	...deCliticSchemas.surfaceSchemas,
	...deDuplifixSchemas.surfaceSchemas,
	...deInfixSchemas.surfaceSchemas,
	...deInterfixSchemas.surfaceSchemas,
	...dePrefixSchemas.surfaceSchemas,
	...deRootSchemas.surfaceSchemas,
	...deSuffixSchemas.surfaceSchemas,
	...deSuffixoidSchemas.surfaceSchemas,
	...deToneMarkingSchemas.surfaceSchemas,
	...deTransfixSchemas.surfaceSchemas,
] as const satisfies readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]];

const deMorphemeSelectionSchemas = [
	...deCircumfixSchemas.lemmaSelectionSchemas,
	...deCliticSchemas.lemmaSelectionSchemas,
	...deDuplifixSchemas.lemmaSelectionSchemas,
	...deInfixSchemas.lemmaSelectionSchemas,
	...deInterfixSchemas.lemmaSelectionSchemas,
	...dePrefixSchemas.lemmaSelectionSchemas,
	...deRootSchemas.lemmaSelectionSchemas,
	...deSuffixSchemas.lemmaSelectionSchemas,
	...deSuffixoidSchemas.lemmaSelectionSchemas,
	...deToneMarkingSchemas.lemmaSelectionSchemas,
	...deTransfixSchemas.lemmaSelectionSchemas,
] as const satisfies readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]];

export const deMorphemeRuntimeSchemas = {
	lemma: buildUnionSchema(deMorphemeLemmaSchemas),
	surface: buildUnionSchema(deMorphemeSurfaceSchemas),
	selection: buildUnionSchema(deMorphemeSelectionSchemas),
} as const;
