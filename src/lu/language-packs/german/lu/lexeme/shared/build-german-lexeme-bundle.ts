import z from "zod/v3";
import type { Pos } from "../../../../../universal/enums/kind/pos";
import { buildKnownSelectionSchema } from "../../../../../universal/factories/buildKnownSelection";
import { buildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { defineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import { MeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";

export function buildGermanLexemeBundle<
	P extends Pos,
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
	const lemma = defineLemmaSchemaDescriptor({
		language: "German",
		schema: z
			.object({
				canonicalLemma: z.string(),
				inherentFeatures: inherentFeaturesSchema,
				language: z.literal("German"),
				lemmaKind: z.literal("Lexeme"),
				meaningInEmojis: MeaningInEmojisSchema,
				pos: z.literal(pos),
			})
			.strict(),
	});
	const lemmaSurface = buildSurfaceSchema({
		lemma,
		lemmaIdentityShape,
		surfaceShape: {
			surfaceKind: z.literal("Lemma"),
		},
	});
	const inflectionSurface = buildSurfaceSchema({
		lemma,
		lemmaIdentityShape,
		surfaceShape: {
			inflectionalFeatures: inflectionalFeaturesSchema,
			surfaceKind: z.literal("Inflection"),
		},
	});

	return {
		InflectionSelectionSchema: buildKnownSelectionSchema({
			orthographicStatus: "Standard",
			surface: inflectionSurface,
		}),
		InflectionSurfaceSchema: inflectionSurface.schema,
		LemmaSchema: lemma.schema,
		LemmaSelectionSchema: buildKnownSelectionSchema({
			orthographicStatus: "Standard",
			surface: lemmaSurface,
		}),
		LemmaSurfaceSchema: lemmaSurface.schema,
		TypoInflectionSelectionSchema: buildKnownSelectionSchema({
			orthographicStatus: "Typo",
			surface: inflectionSurface,
		}),
		TypoLemmaSelectionSchema: buildKnownSelectionSchema({
			orthographicStatus: "Typo",
			surface: lemmaSurface,
		}),
	};
}
