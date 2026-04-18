import z from "zod/v3";
import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import type { DeprecatedMorphemeKind } from "../../../../../universal/enums/kind/morpheme-kind";
import { deprecatedBuildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { deprecatedDeriveKnownSelectionSchemaProps } from "../../../../../universal/factories/deriveKnownSelectionSchemas";
import { deprecatedDefineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import { DeprecatedMeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";
import { DeprecatedMorphemeCanonicalLemmaSchema } from "../../../../../universal/morpheme-canonical-lemma";

export function deprecatedBuildGermanMorphemeBundle<MK extends DeprecatedMorphemeKind>({
	morphemeKind,
}: {
	morphemeKind: MK;
}) {
	const lemmaIdentityShape = {
		lemmaKind: z.literal("Morpheme"),
		morphemeKind: z.literal(morphemeKind),
	} satisfies z.ZodRawShape;
	const lemma = deprecatedDefineLemmaSchemaDescriptor({
		language: "German",
		schema: z
			.object({
				canonicalLemma: DeprecatedMorphemeCanonicalLemmaSchema,
				hasSepPrefix:
					morphemeKind === "Prefix"
						? DeprecatedUniversalFeature.HasSepPrefix.optional()
						: z.undefined().optional(),
				isClosedSet: z.boolean().optional(),
				language: z.literal("German"),
				lemmaKind: z.literal("Morpheme"),
				meaningInEmojis: DeprecatedMeaningInEmojisSchema,
				morphemeKind: z.literal(morphemeKind),
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
	const surfaceSchemas = {
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
