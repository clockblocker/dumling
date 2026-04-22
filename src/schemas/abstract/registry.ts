import type { z } from "zod/v3";
import {
	AbstractLanguageTag,
	MorphemeKind,
	PhrasemeKind,
	Pos,
} from "../../types/core/enums";
import type {
	AbstractLemma,
	AbstractSelection,
	AbstractSurface,
} from "../../types/public-types";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
	buildUnionSchema,
} from "../shared/builders";
import {
	abstractInflectionalFeaturesSchema,
	abstractInherentFeaturesSchema,
} from "./feature-schemas";

type AbstractLeafBundle = {
	inflectionSurfaceSchema: z.ZodType<AbstractSurface<string, "Inflection">>;
	lemmaSchema: z.ZodType<AbstractLemma<string>>;
	lemmaSurfaceSchema: z.ZodType<AbstractSurface<string, "Lemma">>;
	selectionSchemas: readonly z.ZodTypeAny[];
};

function buildAbstractLeafBundle(
	lemmaKind: "Lexeme" | "Morpheme" | "Phraseme",
	lemmaSubKind: string,
): AbstractLeafBundle {
	const lemmaSchema = buildLemmaSchema({
		languageSchema: AbstractLanguageTag,
		lemmaKind,
		lemmaSubKind,
		inherentFeaturesSchema: abstractInherentFeaturesSchema,
	}) as z.ZodType<AbstractLemma<string>>;
	const lemmaSurfaceSchema = buildLemmaSurfaceSchema({
		languageSchema: AbstractLanguageTag,
		lemmaSchema,
	}) as z.ZodType<AbstractSurface<string, "Lemma">>;
	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema: AbstractLanguageTag,
		lemmaSchema,
		inflectionalFeaturesSchema: abstractInflectionalFeaturesSchema,
	}) as z.ZodType<AbstractSurface<string, "Inflection">>;
	const standardLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: AbstractLanguageTag,
		orthographicStatus: "Standard",
		surfaceSchema: lemmaSurfaceSchema,
	}) as z.ZodType<AbstractSelection<string, "Standard", "Lemma">>;
	const typoLemmaSelectionSchema = buildSelectionSchema({
		languageSchema: AbstractLanguageTag,
		orthographicStatus: "Typo",
		surfaceSchema: lemmaSurfaceSchema,
	}) as z.ZodType<AbstractSelection<string, "Typo", "Lemma">>;
	const standardInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: AbstractLanguageTag,
		orthographicStatus: "Standard",
		surfaceSchema: inflectionSurfaceSchema,
	}) as z.ZodType<AbstractSelection<string, "Standard", "Inflection">>;
	const typoInflectionSelectionSchema = buildSelectionSchema({
		languageSchema: AbstractLanguageTag,
		orthographicStatus: "Typo",
		surfaceSchema: inflectionSurfaceSchema,
	}) as z.ZodType<AbstractSelection<string, "Typo", "Inflection">>;

	return {
		lemmaSchema,
		lemmaSurfaceSchema,
		inflectionSurfaceSchema,
		selectionSchemas: [
			standardLemmaSelectionSchema,
			typoLemmaSelectionSchema,
			standardInflectionSelectionSchema,
			typoInflectionSelectionSchema,
		],
	};
}

const abstractLemmaSchemas: z.ZodTypeAny[] = [];
const abstractSurfaceSchemas: z.ZodTypeAny[] = [];
const abstractSelectionSchemas: z.ZodTypeAny[] = [];

for (const [lemmaKind, subKinds] of [
	["Lexeme", Pos.options],
	["Morpheme", MorphemeKind.options],
	["Phraseme", PhrasemeKind.options],
] as const) {
	for (const lemmaSubKind of subKinds) {
		const bundle = buildAbstractLeafBundle(lemmaKind, lemmaSubKind);

		abstractLemmaSchemas.push(bundle.lemmaSchema);
		abstractSurfaceSchemas.push(
			bundle.lemmaSurfaceSchema,
			bundle.inflectionSurfaceSchema,
		);
		abstractSelectionSchemas.push(...bundle.selectionSchemas);
	}
}

export const abstractRuntimeSchemas = {
	lemma: buildUnionSchema(
		abstractLemmaSchemas as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]],
	) as z.ZodType<AbstractLemma<string>>,
	surface: buildUnionSchema(
		abstractSurfaceSchemas as [
			z.ZodTypeAny,
			z.ZodTypeAny,
			...z.ZodTypeAny[],
		],
	) as z.ZodType<AbstractSurface<string>>,
	selection: buildUnionSchema(
		abstractSelectionSchemas as [
			z.ZodTypeAny,
			z.ZodTypeAny,
			...z.ZodTypeAny[],
		],
	) as z.ZodType<AbstractSelection<string>>,
} as const;
