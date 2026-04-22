import { z } from "zod/v3";
import {
	type OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
} from "../../types/core/enums";
import {
	normalizedLowercaseStringSchema,
	normalizedStringSchema,
} from "./normalization";

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
