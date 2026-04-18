import z from "zod/v3";
import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import type { DeprecatedPhrasemeKind } from "../../../../../universal/enums/kind/phraseme-kind";
import { deprecatedBuildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { deprecatedDeriveKnownSelectionSchemaProps } from "../../../../../universal/factories/deriveKnownSelectionSchemas";
import { deprecatedDefineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import { DeprecatedMeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";

function buildPhrasemeLemmaDescriptor<PK extends DeprecatedPhrasemeKind>(
	phrasemeKind: PK,
) {
	if (phrasemeKind === "DiscourseFormula") {
		return deprecatedDefineLemmaSchemaDescriptor({
			language: "German",
			schema: z
				.object({
					canonicalLemma: z.string(),
					discourseFormulaRole:
						DeprecatedUniversalFeature.DiscourseFormulaRole.optional(),
					language: z.literal("German"),
					lemmaKind: z.literal("Phraseme"),
					meaningInEmojis: DeprecatedMeaningInEmojisSchema,
					phrasemeKind: z.literal(phrasemeKind),
				})
				.strict(),
		});
	}

	return deprecatedDefineLemmaSchemaDescriptor({
		language: "German",
		schema: z
			.object({
				canonicalLemma: z.string(),
				language: z.literal("German"),
				lemmaKind: z.literal("Phraseme"),
				meaningInEmojis: DeprecatedMeaningInEmojisSchema,
				phrasemeKind: z.literal(phrasemeKind),
			})
			.strict(),
	});
}

export function deprecatedBuildGermanPhrasemeBundle<PK extends DeprecatedPhrasemeKind>({
	phrasemeKind,
}: {
	phrasemeKind: PK;
}) {
	const lemmaIdentityShape = {
		lemmaKind: z.literal("Phraseme"),
		phrasemeKind: z.literal(phrasemeKind),
	} satisfies z.ZodRawShape;
	const lemma = buildPhrasemeLemmaDescriptor(phrasemeKind);
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
