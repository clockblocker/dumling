import type { z } from "zod/v3";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
} from "../../schemas/shared/builders";

type FeatureSchema = z.ZodObject<{
	inherent: z.ZodType<object>;
	inflectional: z.ZodType<object>;
}>;

type SchemaLeaf = () => z.ZodTypeAny;

type UninflectableSchemaBundle = {
	lemma: SchemaLeaf;
	lemmaSchema: z.ZodTypeAny;
	lemmaSelectionSchemas: [z.ZodTypeAny, z.ZodTypeAny];
	lemmaSurfaceSchema: z.ZodTypeAny;
	selection: {
		standard: {
			lemma: SchemaLeaf;
		};
		typo: {
			lemma: SchemaLeaf;
		};
	};
	surface: {
		lemma: SchemaLeaf;
	};
	surfaceSchemas: [z.ZodTypeAny];
};

type InflectableSchemaBundle = Omit<
	UninflectableSchemaBundle,
	"selection" | "surface" | "surfaceSchemas"
> & {
	inflectionSelectionSchemas: [z.ZodTypeAny, z.ZodTypeAny];
	inflectionSurfaceSchema: z.ZodTypeAny;
	selection: {
		standard: {
			inflection: SchemaLeaf;
			lemma: SchemaLeaf;
		};
		typo: {
			inflection: SchemaLeaf;
			lemma: SchemaLeaf;
		};
	};
	surface: {
		inflection: SchemaLeaf;
		lemma: SchemaLeaf;
	};
	surfaceSchemas: [z.ZodTypeAny, z.ZodTypeAny];
};

type ConcreteSchemaBundleOptions = {
	featuresSchema: FeatureSchema;
	languageSchema: z.ZodType<string>;
	lemmaKind: string;
	lemmaSubKind: string;
};

function buildLemmaOnlySchemas(options: ConcreteSchemaBundleOptions) {
	const lemmaSchema = buildLemmaSchema({
		languageSchema: options.languageSchema,
		lemmaKind: options.lemmaKind,
		lemmaSubKind: options.lemmaSubKind,
		inherentFeaturesSchema: options.featuresSchema.shape.inherent,
	});
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema,
	});
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	});
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	});

	return {
		lemmaSchema,
		lemmaSurfaceSchema,
		standardLemmaSelectionSchema,
		typoLemmaSelectionSchema,
	};
}

export function buildUninflectableConcreteSchemaBundle(
	options: ConcreteSchemaBundleOptions,
): UninflectableSchemaBundle {
	const {
		lemmaSchema,
		lemmaSurfaceSchema,
		standardLemmaSelectionSchema,
		typoLemmaSelectionSchema,
	} = buildLemmaOnlySchemas(options);

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

export function buildInflectableConcreteSchemaBundle(
	options: ConcreteSchemaBundleOptions,
): InflectableSchemaBundle {
	const {
		lemmaSchema,
		lemmaSurfaceSchema,
		standardLemmaSelectionSchema,
		typoLemmaSelectionSchema,
	} = buildLemmaOnlySchemas(options);
	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema,
		inflectionalFeaturesSchema: options.featuresSchema.shape.inflectional,
	});
	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	});
	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	});

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
