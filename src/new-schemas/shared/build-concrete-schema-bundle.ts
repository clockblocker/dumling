import type { z } from "zod/v3";
import type {
	FamilyInflectableSubKind,
	FamilyInflectionSelectionBySubKind,
	FamilyInflectionSurfaceBySubKind,
	FamilyKindForLanguage,
	FamilyLemmaBySubKind,
	FamilyLemmaSelectionBySubKind,
	FamilyLemmaSurfaceBySubKind,
	InflectableFamilyKindForLanguage,
} from "../../types/concrete-language/family-types";
import type { ConcreteLanguage } from "../../types/concrete-language/features/feature-registry";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
} from "../../schemas/shared/builders";

type FeatureSchemaShape = {
	inherent: z.ZodType<object>;
	inflectional: z.ZodType<object>;
};

type FeatureSchema = z.ZodObject<FeatureSchemaShape>;

type SchemaLeaf<T> = () => z.ZodType<T>;

type UninflectableSchemaBundleFor<
	L extends ConcreteLanguage,
	LK extends FamilyKindForLanguage<L>,
	LSK extends keyof FamilyLemmaBySubKind<L, LK>,
> = {
	lemma: SchemaLeaf<FamilyLemmaBySubKind<L, LK>[LSK]>;
	lemmaSchema: z.ZodType<FamilyLemmaBySubKind<L, LK>[LSK]>;
	lemmaSelectionSchemas: [
		z.ZodType<FamilyLemmaSelectionBySubKind<L, LK, "Standard">[LSK]>,
		z.ZodType<FamilyLemmaSelectionBySubKind<L, LK, "Typo">[LSK]>,
	];
	lemmaSurfaceSchema: z.ZodType<FamilyLemmaSurfaceBySubKind<L, LK>[LSK]>;
	selection: {
		standard: {
			lemma: SchemaLeaf<FamilyLemmaSelectionBySubKind<L, LK, "Standard">[LSK]>;
		};
		typo: {
			lemma: SchemaLeaf<FamilyLemmaSelectionBySubKind<L, LK, "Typo">[LSK]>;
		};
	};
	surface: {
		lemma: SchemaLeaf<FamilyLemmaSurfaceBySubKind<L, LK>[LSK]>;
	};
	surfaceSchemas: [z.ZodType<FamilyLemmaSurfaceBySubKind<L, LK>[LSK]>];
};

type InflectableSchemaBundleFor<
	L extends ConcreteLanguage,
	LK extends InflectableFamilyKindForLanguage<L>,
	LSK extends FamilyInflectableSubKind<L, LK>,
> = Omit<
	UninflectableSchemaBundleFor<L, LK, LSK>,
	"selection" | "surface" | "surfaceSchemas"
> & {
	inflectionSelectionSchemas: [
		z.ZodType<FamilyInflectionSelectionBySubKind<L, LK, "Standard">[LSK]>,
		z.ZodType<FamilyInflectionSelectionBySubKind<L, LK, "Typo">[LSK]>,
	];
	inflectionSurfaceSchema: z.ZodType<
		FamilyInflectionSurfaceBySubKind<L, LK>[LSK]
	>;
	selection: {
		standard: {
			inflection: SchemaLeaf<
				FamilyInflectionSelectionBySubKind<L, LK, "Standard">[LSK]
			>;
			lemma: SchemaLeaf<FamilyLemmaSelectionBySubKind<L, LK, "Standard">[LSK]>;
		};
		typo: {
			inflection: SchemaLeaf<
				FamilyInflectionSelectionBySubKind<L, LK, "Typo">[LSK]
			>;
			lemma: SchemaLeaf<FamilyLemmaSelectionBySubKind<L, LK, "Typo">[LSK]>;
		};
	};
	surface: {
		inflection: SchemaLeaf<FamilyInflectionSurfaceBySubKind<L, LK>[LSK]>;
		lemma: SchemaLeaf<FamilyLemmaSurfaceBySubKind<L, LK>[LSK]>;
	};
	surfaceSchemas: [
		z.ZodType<FamilyLemmaSurfaceBySubKind<L, LK>[LSK]>,
		z.ZodType<FamilyInflectionSurfaceBySubKind<L, LK>[LSK]>,
	];
};

export function buildUninflectableConcreteSchemaBundle<
	const L extends ConcreteLanguage,
	const LK extends FamilyKindForLanguage<L>,
	const LSK extends keyof FamilyLemmaBySubKind<L, LK> & string,
>(options: {
	featuresSchema: FeatureSchema;
	languageSchema: z.ZodType<L>;
	lemmaKind: LK;
	lemmaSubKind: LSK;
}): UninflectableSchemaBundleFor<L, LK, LSK> {
	const lemmaSchema = buildLemmaSchema({
		languageSchema: options.languageSchema,
		lemmaKind: options.lemmaKind,
		lemmaSubKind: options.lemmaSubKind,
		inherentFeaturesSchema: options.featuresSchema.shape.inherent,
	}) as unknown as z.ZodType<FamilyLemmaBySubKind<L, LK>[LSK]>;
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema,
	}) as unknown as z.ZodType<FamilyLemmaSurfaceBySubKind<L, LK>[LSK]>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		FamilyLemmaSelectionBySubKind<L, LK, "Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		FamilyLemmaSelectionBySubKind<L, LK, "Typo">[LSK]
	>;

	return {
		lemmaSchema,
		lemmaSurfaceSchema,
		lemmaSelectionSchemas: [
			standardLemmaSelectionSchema,
			typoLemmaSelectionSchema,
		],
		surfaceSchemas: [lemmaSurfaceSchema],
		lemma: () => lemmaSchema,
		surface: {
			lemma: () => lemmaSurfaceSchema,
		},
		selection: {
			standard: {
				lemma: () => standardLemmaSelectionSchema,
			},
			typo: {
				lemma: () => typoLemmaSelectionSchema,
			},
		},
	};
}

export function buildInflectableConcreteSchemaBundle<
	const L extends ConcreteLanguage,
	const LK extends InflectableFamilyKindForLanguage<L>,
	const LSK extends FamilyInflectableSubKind<L, LK> & string,
>(options: {
	featuresSchema: FeatureSchema;
	languageSchema: z.ZodType<L>;
	lemmaKind: LK;
	lemmaSubKind: LSK;
}): InflectableSchemaBundleFor<L, LK, LSK> {
	const lemmaSchema = buildLemmaSchema({
		languageSchema: options.languageSchema,
		lemmaKind: options.lemmaKind,
		lemmaSubKind: options.lemmaSubKind,
		inherentFeaturesSchema: options.featuresSchema.shape.inherent,
	}) as unknown as z.ZodType<FamilyLemmaBySubKind<L, LK>[LSK]>;
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema,
	}) as unknown as z.ZodType<FamilyLemmaSurfaceBySubKind<L, LK>[LSK]>;
	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema,
		inflectionalFeaturesSchema: options.featuresSchema.shape.inflectional,
	}) as unknown as z.ZodType<FamilyInflectionSurfaceBySubKind<L, LK>[LSK]>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		FamilyLemmaSelectionBySubKind<L, LK, "Standard">[LSK]
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		FamilyLemmaSelectionBySubKind<L, LK, "Typo">[LSK]
	>;
	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		FamilyInflectionSelectionBySubKind<L, LK, "Standard">[LSK]
	>;
	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	}) as unknown as z.ZodType<
		FamilyInflectionSelectionBySubKind<L, LK, "Typo">[LSK]
	>;

	return {
		lemmaSchema,
		lemmaSurfaceSchema,
		inflectionSurfaceSchema,
		lemmaSelectionSchemas: [
			standardLemmaSelectionSchema,
			typoLemmaSelectionSchema,
		],
		inflectionSelectionSchemas: [
			standardInflectionSelectionSchema,
			typoInflectionSelectionSchema,
		],
		surfaceSchemas: [lemmaSurfaceSchema, inflectionSurfaceSchema],
		lemma: () => lemmaSchema,
		surface: {
			lemma: () => lemmaSurfaceSchema,
			inflection: () => inflectionSurfaceSchema,
		},
		selection: {
			standard: {
				lemma: () => standardLemmaSelectionSchema,
				inflection: () => standardInflectionSelectionSchema,
			},
			typo: {
				lemma: () => typoLemmaSelectionSchema,
				inflection: () => typoInflectionSelectionSchema,
			},
		},
	};
}
