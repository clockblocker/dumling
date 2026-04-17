import z from "zod/v3";
import type { MorphemeKind } from "../../../../../universal/enums/kind/morpheme-kind";
import { buildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { deriveKnownSelectionSchemaProps } from "../../../../../universal/factories/deriveKnownSelectionSchemas";
import { defineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import { MeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";
import { MorphemeCanonicalLemmaSchema } from "../../../../../universal/morpheme-canonical-lemma";

export function buildEnglishMorphemeBundle<MK extends MorphemeKind>({
	morphemeKind,
}: {
	morphemeKind: MK;
}) {
	const lemmaIdentityShape = {
		lemmaKind: z.literal("Morpheme"),
		morphemeKind: z.literal(morphemeKind),
	} satisfies z.ZodRawShape;

	const lemma = defineLemmaSchemaDescriptor({
		language: "English",
		schema: z
			.object({
				canonicalLemma: MorphemeCanonicalLemmaSchema,
				isClosedSet: z.boolean().optional(),
				language: z.literal("English"),
				lemmaKind: z.literal("Morpheme"),
				meaningInEmojis: MeaningInEmojisSchema,
				morphemeKind: z.literal(morphemeKind),
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
	const surfaceSchemas = {
		LemmaSurfaceSchema: lemmaSurface.schema,
	};

	return {
		LemmaSchema: lemma.schema,
		...surfaceSchemas,
		...deriveKnownSelectionSchemaProps({
			language: lemma.language,
			surfaceSchemas,
		}),
	};
}
