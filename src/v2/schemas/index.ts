import { z } from "zod/v3";
import { NotImplementedYetError } from "../shared/errors";
import type { RuntimeSchemas, SchemaTree } from "./internal-types";
import {
	abstractLemmaSchema,
	abstractRuntimeSchemas,
	abstractSelectionSchema,
	abstractSurfaceSchema,
} from "./abstract/registry";
import { buildUnionSchema } from "./shared/builders";
import { deLemmaSchema } from "./language-packs/de/de-lemma";
import { deSelectionSchema } from "./language-packs/de/de-selection";
import { deSurfaceSchema } from "./language-packs/de/de-surface";
import { deLexemeRuntimeSchemas } from "./language-packs/de/lexeme/de-lexemes";
import { deMorphemeRuntimeSchemas } from "./language-packs/de/morpheme/de-morphemes";
import { dePhrasemeRuntimeSchemas } from "./language-packs/de/phraseme/de-phrasemes";

function mapLeavesToThrowers<T>(shape: T, language: "en" | "he"): T {
	if (typeof shape === "function") {
		return (() => {
			throw new NotImplementedYetError(language);
		}) as T;
	}

	return Object.fromEntries(
		Object.entries(shape as Record<string, unknown>).map(([key, value]) => [
			key,
			mapLeavesToThrowers(value, language),
		]),
	) as T;
}

const deRuntimeSchemas = {
	lemma: buildUnionSchema([
		deLexemeRuntimeSchemas.lemma,
		deMorphemeRuntimeSchemas.lemma,
		dePhrasemeRuntimeSchemas.lemma,
	]),
	surface: buildUnionSchema([
		deLexemeRuntimeSchemas.surface,
		deMorphemeRuntimeSchemas.surface,
		dePhrasemeRuntimeSchemas.surface,
	]),
	selection: buildUnionSchema([
		deLexemeRuntimeSchemas.selection,
		deMorphemeRuntimeSchemas.selection,
		dePhrasemeRuntimeSchemas.selection,
	]),
} satisfies RuntimeSchemas["de"];

export const runtimeSchemas = {
	abstract: abstractRuntimeSchemas,
	de: deRuntimeSchemas,
} satisfies RuntimeSchemas;

export const schema = {
	abstract: {
		lemma: abstractLemmaSchema,
		surface: abstractSurfaceSchema,
		selection: abstractSelectionSchema,
	},
	de: {
		lemma: deLemmaSchema,
		surface: deSurfaceSchema,
		selection: deSelectionSchema,
	},
	en: mapLeavesToThrowers(
		{
			lemma: abstractLemmaSchema,
			surface: abstractSurfaceSchema,
			selection: abstractSelectionSchema,
		},
		"en",
	),
	he: mapLeavesToThrowers(
		{
			lemma: abstractLemmaSchema,
			surface: abstractSurfaceSchema,
			selection: abstractSelectionSchema,
		},
		"he",
	),
} satisfies SchemaTree;
