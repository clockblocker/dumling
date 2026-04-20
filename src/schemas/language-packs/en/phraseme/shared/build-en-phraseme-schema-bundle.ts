import type { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../types/public-types";
import type { PhrasemeSubKind } from "../../../../../types/core/enums";
import {
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
} from "../../../../shared/builders";

export function buildEnPhrasemeSchemaBundle<
	TLemma extends Lemma<"en", "Phraseme", PhrasemeSubKind>,
>(options: {
	languageSchema: z.ZodType<"en">;
	lemmaSchema: z.ZodType<TLemma>;
}) {
	type TLemmaSubKind = TLemma["lemmaSubKind"];

	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: options.languageSchema,
		lemmaSchema: options.lemmaSchema,
	}) as unknown as z.ZodType<Surface<"en", "Lemma", "Phraseme", TLemmaSubKind>>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		Selection<"en", "Standard", "Lemma", "Phraseme", TLemmaSubKind>
	>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: options.languageSchema,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as unknown as z.ZodType<
		Selection<"en", "Typo", "Lemma", "Phraseme", TLemmaSubKind>
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
