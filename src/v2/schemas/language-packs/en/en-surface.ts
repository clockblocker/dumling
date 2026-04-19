import type { EnSurfaceSchemaTree } from "../../internal-types";
import {
	enInflectionLexemeSurfaceSchemaTree,
	enLemmaLexemeSurfaceSchemaTree,
} from "./lexeme/en-lexemes";
import { enMorphemeLemmaSurfaceSchemaTree } from "./morpheme/en-morphemes";
import { enPhrasemeLemmaSurfaceSchemaTree } from "./phraseme/en-phrasemes";

export const enSurfaceSchema = {
	lemma: {
		lexeme: enLemmaLexemeSurfaceSchemaTree,
		morpheme: enMorphemeLemmaSurfaceSchemaTree,
		phraseme: enPhrasemeLemmaSurfaceSchemaTree,
	},
	inflection: {
		lexeme: enInflectionLexemeSurfaceSchemaTree,
	},
} satisfies EnSurfaceSchemaTree;
