import { z } from "zod/v3";
import type {
	AbstractLemma,
	AbstractSelection,
	AbstractSurface,
} from "../../types/public-types";
import {
	AbstractLanguageTag,
	LexemeSubKind,
	MorphemeSubKind,
	PhrasemeSubKind,
} from "../../types/core/enums";
import {
	buildInflectionSurfaceSchema,
	buildLemmaSchema,
	buildLemmaSurfaceSchema,
	buildSelectionSchema,
	buildUnionSchema,
} from "../shared/builders";
import {
	abstractInherentFeaturesSchema,
	abstractInflectionalFeaturesSchema,
} from "./feature-schemas";

type AbstractLeafBundle = {
	inflectionSurfaceSchema: z.ZodType<AbstractSurface<string, "Inflection">>;
	lemma: () => z.ZodType<AbstractLemma<string>>;
	lemmaSchema: z.ZodType<AbstractLemma<string>>;
	lemmaSurfaceSchema: z.ZodType<AbstractSurface<string, "Lemma">>;
	selection: {
		standard: {
			inflection: () => z.ZodType<AbstractSelection<string, "Standard", "Inflection">>;
			lemma: () => z.ZodType<AbstractSelection<string, "Standard", "Lemma">>;
		};
		typo: {
			inflection: () => z.ZodType<AbstractSelection<string, "Typo", "Inflection">>;
			lemma: () => z.ZodType<AbstractSelection<string, "Typo", "Lemma">>;
		};
	};
	surface: {
		inflection: () => z.ZodType<AbstractSurface<string, "Inflection">>;
		lemma: () => z.ZodType<AbstractSurface<string, "Lemma">>;
	};
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
		lemma: () => lemmaSchema,
		surface: {
			lemma: () => lemmaSurfaceSchema,
			inflection: () => inflectionSurfaceSchema,
		},
		selection: {
			standard: {
				lemma: () => standardLemmaSelectionSchema,
				inflection: () => standardInflectionSelectionSchema,
			},
			typo: {
				lemma: () => typoLemmaSelectionSchema,
				inflection: () => typoInflectionSelectionSchema,
			},
		},
	};
}

const abstractLemmaTree: Record<string, Record<string, () => z.ZodTypeAny>> = {};
const abstractLemmaSurfaceTree: Record<string, Record<string, () => z.ZodTypeAny>> = {};
const abstractInflectionSurfaceTree: Record<string, Record<string, () => z.ZodTypeAny>> =
	{};
const abstractStandardLemmaSelectionTree: Record<
	string,
	Record<string, () => z.ZodTypeAny>
> = {};
const abstractTypoLemmaSelectionTree: Record<
	string,
	Record<string, () => z.ZodTypeAny>
> = {};
const abstractStandardInflectionSelectionTree: Record<
	string,
	Record<string, () => z.ZodTypeAny>
> = {};
const abstractTypoInflectionSelectionTree: Record<
	string,
	Record<string, () => z.ZodTypeAny>
> = {};

const abstractLemmaSchemas: z.ZodTypeAny[] = [];
const abstractSurfaceSchemas: z.ZodTypeAny[] = [];
const abstractSelectionSchemas: z.ZodTypeAny[] = [];

for (const [lemmaKind, subKinds] of [
	["Lexeme", LexemeSubKind.options],
	["Morpheme", MorphemeSubKind.options],
	["Phraseme", PhrasemeSubKind.options],
] as const) {
	const lemmaKindKey = lemmaKind.toLowerCase();
	abstractLemmaTree[lemmaKindKey] = {};
	abstractLemmaSurfaceTree[lemmaKindKey] = {};
	abstractInflectionSurfaceTree[lemmaKindKey] = {};
	abstractStandardLemmaSelectionTree[lemmaKindKey] = {};
	abstractTypoLemmaSelectionTree[lemmaKindKey] = {};
	abstractStandardInflectionSelectionTree[lemmaKindKey] = {};
	abstractTypoInflectionSelectionTree[lemmaKindKey] = {};

	for (const lemmaSubKind of subKinds) {
		const bundle = buildAbstractLeafBundle(lemmaKind, lemmaSubKind);
		const lemmaSubKindKey = lemmaSubKind.toLowerCase();

		abstractLemmaTree[lemmaKindKey][lemmaSubKindKey] = bundle.lemma;
		abstractLemmaSurfaceTree[lemmaKindKey][lemmaSubKindKey] = bundle.surface.lemma;
		abstractInflectionSurfaceTree[lemmaKindKey][lemmaSubKindKey] =
			bundle.surface.inflection;
		abstractStandardLemmaSelectionTree[lemmaKindKey][lemmaSubKindKey] =
			bundle.selection.standard.lemma;
		abstractTypoLemmaSelectionTree[lemmaKindKey][lemmaSubKindKey] =
			bundle.selection.typo.lemma;
		abstractStandardInflectionSelectionTree[lemmaKindKey][lemmaSubKindKey] =
			bundle.selection.standard.inflection;
		abstractTypoInflectionSelectionTree[lemmaKindKey][lemmaSubKindKey] =
			bundle.selection.typo.inflection;

		abstractLemmaSchemas.push(bundle.lemmaSchema);
		abstractSurfaceSchemas.push(
			bundle.lemmaSurfaceSchema,
			bundle.inflectionSurfaceSchema,
		);
		abstractSelectionSchemas.push(
			bundle.selection.standard.lemma(),
			bundle.selection.typo.lemma(),
			bundle.selection.standard.inflection(),
			bundle.selection.typo.inflection(),
		);
	}
}

export const abstractLemmaSchema = abstractLemmaTree;
export const abstractSurfaceSchema = {
	lemma: abstractLemmaSurfaceTree,
	inflection: abstractInflectionSurfaceTree,
};
export const abstractSelectionSchema = {
	standard: {
		lemma: abstractStandardLemmaSelectionTree,
		inflection: abstractStandardInflectionSelectionTree,
	},
	typo: {
		lemma: abstractTypoLemmaSelectionTree,
		inflection: abstractTypoInflectionSelectionTree,
	},
};

export const abstractRuntimeSchemas = {
	lemma: buildUnionSchema(
		abstractLemmaSchemas as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]],
	) as z.ZodType<AbstractLemma<string>>,
	surface: buildUnionSchema(
		abstractSurfaceSchemas as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]],
	) as z.ZodType<AbstractSurface<string>>,
	selection: buildUnionSchema(
		abstractSelectionSchemas as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]],
	) as z.ZodType<AbstractSelection<string>>,
} as const;
