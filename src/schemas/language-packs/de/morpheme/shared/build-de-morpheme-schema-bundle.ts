import type { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../types/public-types";
import type { MorphemeSubKind } from "../../../../../types/core/enums";
import {
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
} from "../../../../shared/builders";

export function buildDeMorphemeSchemaBundle<
	TLemma extends Lemma<"de", "Morpheme", MorphemeSubKind>,
>(options: {
	languageSchema: z.ZodType<"de">;
	lemmaSchema: z.ZodType<TLemma>;
}) {
	type TLemmaSubKind = TLemma["lemmaSubKind"];

	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<Surface<"de", "Lemma", "Morpheme", TLemmaSubKind>>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		Selection<"de", "Standard", "Lemma", "Morpheme", TLemmaSubKind>
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		Selection<"de", "Typo", "Lemma", "Morpheme", TLemmaSubKind>
	>;

	return {
		lemmaSchema: options.lemmaSchema,
		lemmaSurfaceSchema,
		lemmaSelectionSchemas: [
			standardLemmaSelectionSchema,
			typoLemmaSelectionSchema,
		] as const,
		surfaceSchemas: [lemmaSurfaceSchema] as const,
		lemma: () => options.lemmaSchema,
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

export { buildLemmaSchema };
