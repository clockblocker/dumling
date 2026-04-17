import z from "zod/v3";
import { UniversalFeature } from "../../../../../universal/enums/feature";
import type { MorphemeKind } from "../../../../../universal/enums/kind/morpheme-kind";
import { buildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { deriveKnownSelectionSchemaProps } from "../../../../../universal/factories/deriveKnownSelectionSchemas";
import { defineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import { MeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";
import { MorphemeCanonicalLemmaSchema } from "../../../../../universal/morpheme-canonical-lemma";

export function buildGermanMorphemeBundle<MK extends MorphemeKind>({
	morphemeKind,
}: {
	morphemeKind: MK;
}) {
	const lemmaIdentityShape = {
		lemmaKind: z.literal("Morpheme"),
		morphemeKind: z.literal(morphemeKind),
	} satisfies z.ZodRawShape;
	const lemma = defineLemmaSchemaDescriptor({
		language: "German",
		schema: z
			.object({
				canonicalLemma: MorphemeCanonicalLemmaSchema,
				hasSepPrefix:
					morphemeKind === "Prefix"
						? UniversalFeature.HasSepPrefix.optional()
						: z.undefined().optional(),
				isClosedSet: z.boolean().optional(),
				language: z.literal("German"),
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
