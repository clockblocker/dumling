import z from "zod/v3";
import type { DeprecatedPos } from "../../../../../universal/enums/kind/pos";
import { deprecatedBuildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { deprecatedDeriveKnownSelectionSchemaProps } from "../../../../../universal/factories/deriveKnownSelectionSchemas";
import { deprecatedDefineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import { DeprecatedMeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";

export function deprecatedBuildGermanLexemeBundle<
	P extends DeprecatedPos,
	InflectionalFeaturesSchema extends z.ZodTypeAny,
	InherentFeaturesSchema extends z.ZodTypeAny,
>({
	inflectionalFeaturesSchema,
	inherentFeaturesSchema,
	pos,
}: {
	inflectionalFeaturesSchema: InflectionalFeaturesSchema;
	inherentFeaturesSchema: InherentFeaturesSchema;
	pos: P;
}) {
	const lemmaIdentityShape = {
		lemmaKind: z.literal("Lexeme"),
		pos: z.literal(pos),
	} satisfies z.ZodRawShape;
	const lemma = deprecatedDefineLemmaSchemaDescriptor({
		language: "German",
		schema: z
			.object({
				canonicalLemma: z.string(),
				inherentFeatures: inherentFeaturesSchema,
				language: z.literal("German"),
				lemmaKind: z.literal("Lexeme"),
				meaningInEmojis: DeprecatedMeaningInEmojisSchema,
				pos: z.literal(pos),
			})
			.strict(),
	});
	const lemmaSurface = deprecatedBuildSurfaceSchema({
		lemma,
		lemmaIdentityShape,
		surfaceShape: {
			surfaceKind: z.literal("Lemma"),
		},
	});
	const inflectionSurface = deprecatedBuildSurfaceSchema({
		lemma,
		lemmaIdentityShape,
		surfaceShape: {
			inflectionalFeatures: inflectionalFeaturesSchema,
			surfaceKind: z.literal("Inflection"),
		},
	});
	const surfaceSchemas = {
		InflectionSurfaceSchema: inflectionSurface.schema,
		LemmaSurfaceSchema: lemmaSurface.schema,
	};

	return {
		LemmaSchema: lemma.schema,
		...surfaceSchemas,
		...deprecatedDeriveKnownSelectionSchemaProps({
			language: lemma.language,
			surfaceSchemas,
		}),
	};
}
