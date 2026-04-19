import { NotImplementedYetError } from "../shared/errors";
import { languagePacks } from "../language-packs";
import type { RuntimeSchemas, SchemaTree } from "./internal-types";
import {
	abstractLemmaSchema,
	abstractRuntimeSchemas,
	abstractSelectionSchema,
	abstractSurfaceSchema,
} from "./abstract/registry";

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

export const runtimeSchemas = {
	abstract: abstractRuntimeSchemas,
	de: languagePacks.de.runtimeSchemas as RuntimeSchemas["de"],
} satisfies RuntimeSchemas;

export const schema = {
	abstract: {
		lemma: abstractLemmaSchema,
		selection: abstractSelectionSchema,
		surface: abstractSurfaceSchema,
	},
	de: languagePacks.de.schema,
	en: mapLeavesToThrowers(languagePacks.en.schema, "en"),
	he: mapLeavesToThrowers(languagePacks.he.schema, "he"),
} satisfies SchemaTree;
