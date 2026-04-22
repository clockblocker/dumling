import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	LemmaKindFor,
	LemmaSubKindFor,
} from "dumling/types";
import { z } from "zod/v3";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
	buildUnionSchema,
} from "../../schemas/shared/builders";
import type { ConcreteLanguage } from "../../types/concrete-language/features/feature-registry";
import type { NewSchemaTree } from "./schema-helper-types";

type FeatureSchemaFor<
	L extends ConcreteLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = z.ZodObject<{
	inherent: z.ZodType<InherentFeaturesFor<L, LK, LSK>>;
	inflectional: z.ZodType<InflectionalFeaturesFor<L, LK, LSK>>;
}>;

export type NewFeatureSchemaTree<L extends ConcreteLanguage> = {
	[LK in LemmaKindFor<L>]: {
		[LSK in LemmaSubKindFor<L, LK>]: FeatureSchemaFor<L, LK, LSK>;
	};
};

type LeafSchemas = {
	lemma: z.ZodTypeAny;
	lemmaSelection: {
		Standard: z.ZodTypeAny;
		Typo: z.ZodTypeAny;
	};
	lemmaSurface: z.ZodTypeAny;
	inflectionSelection?: {
		Standard: z.ZodTypeAny;
		Typo: z.ZodTypeAny;
	};
	inflectionSurface?: z.ZodTypeAny;
};

type MutableSchemaTree = {
	lemma: Record<string, Record<string, z.ZodTypeAny>>;
	selection: Record<
		"Standard" | "Typo",
		Record<string, Record<string, Record<string, z.ZodTypeAny>>>
	>;
	surface: Record<string, Record<string, Record<string, z.ZodTypeAny>>>;
};

function hasInflectionSurface(inflectionalFeaturesSchema: z.ZodTypeAny) {
	return !inflectionalFeaturesSchema.safeParse({}).success;
}

function buildLeafSchemas<
	const L extends ConcreteLanguage,
	const LK extends LemmaKindFor<L>,
	const LSK extends LemmaSubKindFor<L, LK>,
>(
	language: L,
	lemmaKind: LK,
	lemmaSubKind: LSK,
	featuresSchema: FeatureSchemaFor<L, LK, LSK>,
): LeafSchemas {
	const languageSchema = z.literal(language);
	const lemmaSchema = buildLemmaSchema({
		languageSchema,
		lemmaKind,
		lemmaSubKind,
		inherentFeaturesSchema: featuresSchema.shape.inherent,
	}) as z.ZodTypeAny;

	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema,
		lemmaSchema,
	}) as z.ZodTypeAny;

	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as z.ZodTypeAny;

	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as z.ZodTypeAny;

	const leaf = {
		lemma: lemmaSchema,
		lemmaSurface: lemmaSurfaceSchema,
		lemmaSelection: {
			Standard: standardLemmaSelectionSchema,
			Typo: typoLemmaSelectionSchema,
		},
	};

	if (!hasInflectionSurface(featuresSchema.shape.inflectional)) {
		return leaf;
	}

	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema,
		lemmaSchema,
		inflectionalFeaturesSchema: featuresSchema.shape.inflectional,
	}) as z.ZodTypeAny;

	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	}) as z.ZodTypeAny;

	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	}) as z.ZodTypeAny;

	return {
		...leaf,
		inflectionSurface: inflectionSurfaceSchema,
		inflectionSelection: {
			Standard: standardInflectionSelectionSchema,
			Typo: typoInflectionSelectionSchema,
		},
	};
}

function ensureFamily<TValue>(
	tree: Record<string, Record<string, TValue>>,
	kind: string,
): Record<string, TValue> {
	tree[kind] ??= {};
	return tree[kind];
}

export function buildLanguageSchema<const L extends ConcreteLanguage>(
	language: L,
	featureSchemas: NewFeatureSchemaTree<L>,
): NewSchemaTree[L] {
	const schemaTree = {
		lemma: {},
		surface: {
			Lemma: {},
			Inflection: {},
		},
		selection: {
			Standard: {
				Lemma: {},
				Inflection: {},
			},
			Typo: {
				Lemma: {},
				Inflection: {},
			},
		},
	} satisfies MutableSchemaTree;

	for (const [lemmaKind, subKindSchemas] of Object.entries(
		featureSchemas,
	) as [
		LemmaKindFor<L>,
		Record<
			LemmaSubKindFor<L, LemmaKindFor<L>>,
			FeatureSchemaFor<
				L,
				LemmaKindFor<L>,
				LemmaSubKindFor<L, LemmaKindFor<L>>
			>
		>,
	][]) {
		const lemmaFamily = ensureFamily(schemaTree.lemma, lemmaKind);
		const lemmaSurfaceFamily = ensureFamily(
			schemaTree.surface.Lemma,
			lemmaKind,
		);
		const standardLemmaSelectionFamily = ensureFamily(
			schemaTree.selection.Standard.Lemma,
			lemmaKind,
		);
		const typoLemmaSelectionFamily = ensureFamily(
			schemaTree.selection.Typo.Lemma,
			lemmaKind,
		);

		for (const [lemmaSubKind, featuresSchema] of Object.entries(
			subKindSchemas,
		) as [
			LemmaSubKindFor<L, typeof lemmaKind>,
			FeatureSchemaFor<
				L,
				typeof lemmaKind,
				LemmaSubKindFor<L, typeof lemmaKind>
			>,
		][]) {
			const leaf = buildLeafSchemas(
				language,
				lemmaKind,
				lemmaSubKind,
				featuresSchema,
			);

			lemmaFamily[lemmaSubKind] = leaf.lemma;
			lemmaSurfaceFamily[lemmaSubKind] = leaf.lemmaSurface;
			standardLemmaSelectionFamily[lemmaSubKind] =
				leaf.lemmaSelection.Standard;
			typoLemmaSelectionFamily[lemmaSubKind] = leaf.lemmaSelection.Typo;

			if (!leaf.inflectionSurface || !leaf.inflectionSelection) {
				continue;
			}

			const inflectionSurfaceFamily = ensureFamily(
				schemaTree.surface.Inflection,
				lemmaKind,
			);
			const standardInflectionSelectionFamily = ensureFamily(
				schemaTree.selection.Standard.Inflection,
				lemmaKind,
			);
			const typoInflectionSelectionFamily = ensureFamily(
				schemaTree.selection.Typo.Inflection,
				lemmaKind,
			);

			inflectionSurfaceFamily[lemmaSubKind] = leaf.inflectionSurface;
			standardInflectionSelectionFamily[lemmaSubKind] =
				leaf.inflectionSelection.Standard;
			typoInflectionSelectionFamily[lemmaSubKind] =
				leaf.inflectionSelection.Typo;
		}
	}

	return schemaTree as NewSchemaTree[L];
}

export {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
	buildUnionSchema,
};
