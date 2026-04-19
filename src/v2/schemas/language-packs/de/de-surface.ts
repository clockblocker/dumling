import type { DeSurfaceSchemaTree } from "../../internal-types";
import {
	deInflectionLexemeSurfaceSchemaTree,
	deLemmaLexemeSurfaceSchemaTree,
} from "./lexeme/de-lexemes";
import { deMorphemeLemmaSurfaceSchemaTree } from "./morpheme/de-morphemes";
import { dePhrasemeLemmaSurfaceSchemaTree } from "./phraseme/de-phrasemes";

export const deSurfaceSchema = {
	lemma: {
		lexeme: deLemmaLexemeSurfaceSchemaTree,
		morpheme: deMorphemeLemmaSurfaceSchemaTree,
		phraseme: dePhrasemeLemmaSurfaceSchemaTree,
	},
	inflection: {
		lexeme: deInflectionLexemeSurfaceSchemaTree,
	},
} satisfies DeSurfaceSchemaTree;
