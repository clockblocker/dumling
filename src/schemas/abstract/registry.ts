import type { z } from "zod/v3";
import {
	AbstractLanguageTag,
	ConstructionKind,
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
	buildCitationSurfaceSchema,
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildSelectionSchema,
	buildUnionSchema,
} from "../shared/builders";
import {
	abstractInflectionalFeaturesSchema,
	abstractInherentFeaturesSchema,
} from "./feature-schemas";

type AbstractLeafBundle = {
	citationSurfaceSchema: z.ZodType<AbstractSurface<string, "Citation">>;
	inflectionSurfaceSchema: z.ZodType<AbstractSurface<string, "Inflection">>;
	lemmaSchema: z.ZodType<AbstractLemma<string>>;
	selectionSchemas: readonly z.ZodTypeAny[];
};

function buildAbstractLeafBundle(
	lemmaKind: "Lexeme" | "Morpheme" | "Phraseme" | "Construction",
	lemmaSubKind: string,
): AbstractLeafBundle {
	const lemmaSchema = buildLemmaSchema({
		languageSchema: AbstractLanguageTag,
		lemmaKind,
		lemmaSubKind,
		inherentFeaturesSchema: abstractInherentFeaturesSchema,
	}) as z.ZodType<AbstractLemma<string>>;
	const citationSurfaceSchema = buildCitationSurfaceSchema({
		languageSchema: AbstractLanguageTag,
		lemmaSchema,
	}) as z.ZodType<AbstractSurface<string, "Citation">>;
	const inflectionSurfaceSchema = buildInflectionSurfaceSchema({
		languageSchema: AbstractLanguageTag,
		lemmaSchema,
		inflectionalFeaturesSchema: abstractInflectionalFeaturesSchema,
	}) as z.ZodType<AbstractSurface<string, "Inflection">>;
	const standardCitationSelectionSchema = buildSelectionSchema({
		languageSchema: AbstractLanguageTag,
		orthographicStatus: "Standard",
		surfaceSchema: citationSurfaceSchema,
	}) as z.ZodType<AbstractSelection<string, "Standard", "Citation">>;
	const typoCitationSelectionSchema = buildSelectionSchema({
		languageSchema: AbstractLanguageTag,
		orthographicStatus: "Typo",
		surfaceSchema: citationSurfaceSchema,
	}) as z.ZodType<AbstractSelection<string, "Typo", "Citation">>;
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
		citationSurfaceSchema,
		inflectionSurfaceSchema,
		selectionSchemas: [
			standardCitationSelectionSchema,
			typoCitationSelectionSchema,
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
	["Construction", ConstructionKind.options],
] as const) {
	for (const lemmaSubKind of subKinds) {
		const bundle = buildAbstractLeafBundle(lemmaKind, lemmaSubKind);

		abstractLemmaSchemas.push(bundle.lemmaSchema);
		abstractSurfaceSchemas.push(
			bundle.citationSurfaceSchema,
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
