import { languagePacks } from "../language-packs";
import type { RuntimeSchemas, SchemaTree } from "./internal-types";
import {
	abstractLemmaSchema,
	abstractRuntimeSchemas,
	abstractSelectionSchema,
	abstractSurfaceSchema,
} from "./abstract/registry";

export const runtimeSchemas = {
	abstract: abstractRuntimeSchemas,
	de: languagePacks.de.runtimeSchemas,
	en: languagePacks.en.runtimeSchemas,
	he: languagePacks.he.runtimeSchemas,
} satisfies RuntimeSchemas;

export const schema = {
	abstract: {
		lemma: abstractLemmaSchema,
		selection: abstractSelectionSchema,
		surface: abstractSurfaceSchema,
	},
	de: languagePacks.de.schema,
	en: languagePacks.en.schema,
	he: languagePacks.he.schema,
} satisfies SchemaTree;
