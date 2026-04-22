import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	LemmaKindFor,
	LemmaSubKindFor,
} from "dumling/types";
import { z } from "zod/v3";
import type { ConcreteLanguage } from "../../types/concrete-language/features/feature-registry";
import {
	type OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
} from "../../types/core/enums";
import {
	normalizedLowercaseStringSchema,
	normalizedStringSchema,
} from "./normalization";
import type { RawLanguageEntitySchemaTree } from "./schema-helper-types";

type SchemaOutput<TSchema extends z.ZodTypeAny> = z.output<TSchema>;
type SchemaTuple = readonly [z.ZodTypeAny, ...z.ZodTypeAny[]];

export function buildLemmaSchema<
	TLanguage extends string,
	TLemmaKind extends string,
	TLemmaSubKind extends string,
	TInherentFeatures extends object,
>(options: {
	inherentFeaturesSchema: z.ZodType<TInherentFeatures>;
	languageSchema: z.ZodType<TLanguage>;
	lemmaKind: TLemmaKind;
	lemmaSubKind: TLemmaSubKind;
}): z.ZodType<{
	canonicalLemma: string;
	inherentFeatures: TInherentFeatures;
	language: TLanguage;
	lemmaKind: TLemmaKind;
	lemmaSubKind: TLemmaSubKind;
	meaningInEmojis: string;
}> {
	return z
		.object({
			language: options.languageSchema,
			canonicalLemma: normalizedLowercaseStringSchema(),
			lemmaKind: z.literal(options.lemmaKind),
			lemmaSubKind: z.literal(options.lemmaSubKind),
			inherentFeatures: options.inherentFeaturesSchema,
			meaningInEmojis: normalizedStringSchema(),
		})
		.strict() as unknown as z.ZodType<{
		canonicalLemma: string;
		inherentFeatures: TInherentFeatures;
		language: TLanguage;
		lemmaKind: TLemmaKind;
		lemmaSubKind: TLemmaSubKind;
		meaningInEmojis: string;
	}>;
}

export function buildLemmaSurfaceSchema<
	TLanguage extends string,
	TLemma extends { language: TLanguage },
>(options: {
	languageSchema: z.ZodType<TLanguage>;
	lemmaSchema: z.ZodType<TLemma>;
}): z.ZodType<{
	language: TLanguage;
	lemma: TLemma;
	normalizedFullSurface: string;
	surfaceKind: "Lemma";
}> {
	return z
		.object({
			language: options.languageSchema,
			normalizedFullSurface: normalizedLowercaseStringSchema(),
			surfaceKind: z.literal("Lemma"),
			lemma: options.lemmaSchema,
		})
		.strict() as unknown as z.ZodType<{
		language: TLanguage;
		lemma: TLemma;
		normalizedFullSurface: string;
		surfaceKind: "Lemma";
	}>;
}

export function buildInflectionSurfaceSchema<
	TLanguage extends string,
	TLemma extends { language: TLanguage },
	TInflectionalFeatures extends object,
>(options: {
	inflectionalFeaturesSchema: z.ZodType<TInflectionalFeatures>;
	languageSchema: z.ZodType<TLanguage>;
	lemmaSchema: z.ZodType<TLemma>;
}): z.ZodType<{
	inflectionalFeatures: TInflectionalFeatures;
	language: TLanguage;
	lemma: TLemma;
	normalizedFullSurface: string;
	surfaceKind: "Inflection";
}> {
	return z
		.object({
			language: options.languageSchema,
			normalizedFullSurface: normalizedLowercaseStringSchema(),
			surfaceKind: z.literal("Inflection"),
			lemma: options.lemmaSchema,
			inflectionalFeatures: options.inflectionalFeaturesSchema,
		})
		.strict() as unknown as z.ZodType<{
		inflectionalFeatures: TInflectionalFeatures;
		language: TLanguage;
		lemma: TLemma;
		normalizedFullSurface: string;
		surfaceKind: "Inflection";
	}>;
}

export function buildSelectionSchema<
	TLanguage extends string,
	TOrthographicStatus extends z.infer<typeof OrthographicStatus>,
	TSurface extends { language: TLanguage },
>(options: {
	languageSchema: z.ZodType<TLanguage>;
	orthographicStatus: TOrthographicStatus;
	surfaceSchema: z.ZodType<TSurface>;
}): z.ZodType<{
	language: TLanguage;
	orthographicStatus: TOrthographicStatus;
	selectionCoverage: z.infer<typeof SelectionCoverage>;
	spelledSelection: string;
	spellingRelation: z.infer<typeof SpellingRelation>;
	surface: TSurface;
}> {
	return z
		.object({
			language: options.languageSchema,
			orthographicStatus: z.literal(options.orthographicStatus),
			selectionCoverage: SelectionCoverage,
			spelledSelection: normalizedStringSchema(),
			spellingRelation: SpellingRelation,
			surface: options.surfaceSchema,
		})
		.strict() as unknown as z.ZodType<{
		language: TLanguage;
		orthographicStatus: TOrthographicStatus;
		selectionCoverage: z.infer<typeof SelectionCoverage>;
		spelledSelection: string;
		spellingRelation: z.infer<typeof SpellingRelation>;
		surface: TSurface;
	}>;
}

export function buildUnionSchema<TSchemas extends SchemaTuple>(
	schemas: TSchemas,
): z.ZodType<SchemaOutput<TSchemas[number]>> {
	if (schemas.length === 1) {
		return schemas[0] as z.ZodType<SchemaOutput<TSchemas[number]>>;
	}

	return z.union(
		schemas as unknown as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]],
	) as unknown as z.ZodType<SchemaOutput<TSchemas[number]>>;
}

type FeatureSchemaFor<
	L extends ConcreteLanguage,
	LK extends LemmaKindFor<L>,
	LSK extends LemmaSubKindFor<L, LK>,
> = z.ZodObject<{
	inherent: z.ZodType<InherentFeaturesFor<L, LK, LSK>>;
	inflectional: z.ZodType<InflectionalFeaturesFor<L, LK, LSK>>;
}>;

type FeatureSchemaTree<L extends ConcreteLanguage> = {
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
	Lemma: Record<string, Record<string, z.ZodTypeAny>>;
	Selection: Record<
		"Standard" | "Typo",
		Record<string, Record<string, Record<string, z.ZodTypeAny>>>
	>;
	Surface: Record<string, Record<string, Record<string, z.ZodTypeAny>>>;
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
	});

	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema,
		lemmaSchema,
	});

	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	});

	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	});

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
	});

	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	});

	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	});

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

export function buildLanguageSchema<L extends ConcreteLanguage>(
	language: L,
	featureSchemas: FeatureSchemaTree<L>,
): RawLanguageEntitySchemaTree<L> {
	const schemaTree = {
		Lemma: {},
		Surface: {
			Lemma: {},
			Inflection: {},
		},
		Selection: {
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
		const lemmaFamily = ensureFamily(schemaTree.Lemma, lemmaKind);
		const lemmaSurfaceFamily = ensureFamily(
			schemaTree.Surface.Lemma,
			lemmaKind,
		);
		const standardLemmaSelectionFamily = ensureFamily(
			schemaTree.Selection.Standard.Lemma,
			lemmaKind,
		);
		const typoLemmaSelectionFamily = ensureFamily(
			schemaTree.Selection.Typo.Lemma,
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
				schemaTree.Surface.Inflection,
				lemmaKind,
			);
			const standardInflectionSelectionFamily = ensureFamily(
				schemaTree.Selection.Standard.Inflection,
				lemmaKind,
			);
			const typoInflectionSelectionFamily = ensureFamily(
				schemaTree.Selection.Typo.Inflection,
				lemmaKind,
			);

			inflectionSurfaceFamily[lemmaSubKind] = leaf.inflectionSurface;
			standardInflectionSelectionFamily[lemmaSubKind] =
				leaf.inflectionSelection.Standard;
			typoInflectionSelectionFamily[lemmaSubKind] =
				leaf.inflectionSelection.Typo;
		}
	}

	return schemaTree as unknown as RawLanguageEntitySchemaTree<L>;
}
