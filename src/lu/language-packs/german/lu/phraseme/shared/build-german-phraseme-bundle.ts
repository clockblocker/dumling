import z from "zod/v3";
import { UniversalFeature } from "../../../../../universal/enums/feature";
import type { PhrasemeKind } from "../../../../../universal/enums/kind/phraseme-kind";
import { buildKnownSelectionSchema } from "../../../../../universal/factories/buildKnownSelection";
import { buildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { defineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import { MeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";

function buildPhrasemeLemmaDescriptor<PK extends PhrasemeKind>(
	phrasemeKind: PK,
) {
	if (phrasemeKind === "DiscourseFormula") {
		return defineLemmaSchemaDescriptor({
			language: "German",
			schema: z
				.object({
					canonicalLemma: z.string(),
					discourseFormulaRole:
						UniversalFeature.DiscourseFormulaRole.optional(),
					language: z.literal("German"),
					lemmaKind: z.literal("Phraseme"),
					meaningInEmojis: MeaningInEmojisSchema,
					phrasemeKind: z.literal(phrasemeKind),
				})
				.strict(),
		});
	}

	return defineLemmaSchemaDescriptor({
		language: "German",
		schema: z
			.object({
				canonicalLemma: z.string(),
				language: z.literal("German"),
				lemmaKind: z.literal("Phraseme"),
				meaningInEmojis: MeaningInEmojisSchema,
				phrasemeKind: z.literal(phrasemeKind),
			})
			.strict(),
	});
}

export function buildGermanPhrasemeBundle<PK extends PhrasemeKind>({
	phrasemeKind,
}: {
	phrasemeKind: PK;
}) {
	const lemmaIdentityShape = {
		lemmaKind: z.literal("Phraseme"),
		phrasemeKind: z.literal(phrasemeKind),
	} satisfies z.ZodRawShape;
	const lemma = buildPhrasemeLemmaDescriptor(phrasemeKind);
	const lemmaSurface = buildSurfaceSchema({
		lemma,
		lemmaIdentityShape,
		surfaceShape: {
			surfaceKind: z.literal("Lemma"),
		},
	});

	return {
		LemmaSchema: lemma.schema,
		LemmaSurfaceSchema: lemmaSurface.schema,
		StandardLemmaSelectionSchema: buildKnownSelectionSchema({
			orthographicStatus: "Standard",
			surface: lemmaSurface,
		}),
		TypoLemmaSelectionSchema: buildKnownSelectionSchema({
			orthographicStatus: "Typo",
			surface: lemmaSurface,
		}),
	};
}
