import { z } from "zod/v3";

import { UniversalFeatureBagSchema, UniversalLanguage } from "../ontology";

export function buildUniversalSurfaceSchema<
	LemmaSchema extends z.ZodTypeAny,
	InflectionalFeaturesSchema extends z.ZodTypeAny,
>({
	lemma,
	inflectionalFeatures,
}: {
	lemma: LemmaSchema;
	inflectionalFeatures?: InflectionalFeaturesSchema;
}) {
	const inflectionalFeaturesSchema =
		inflectionalFeatures ?? UniversalFeatureBagSchema;

	return z.discriminatedUnion("surfaceKind", [
		z.object({
			language: UniversalLanguage,
			normalizedFullSurface: z.string().min(1),
			surfaceKind: z.literal("Lemma"),
			lemma,
		}),
		z.object({
			language: UniversalLanguage,
			normalizedFullSurface: z.string().min(1),
			surfaceKind: z.literal("Inflection"),
			lemma,
			inflectionalFeatures: inflectionalFeaturesSchema,
		}),
	]);
}
