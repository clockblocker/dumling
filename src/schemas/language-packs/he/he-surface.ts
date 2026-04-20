import {
	heInflectionLexemeSurfaceSchemaTree,
	heLemmaLexemeSurfaceSchemaTree,
} from "./lexeme/he-lexemes";
import { heLemmaMorphemeSurfaceSchemaTree } from "./morpheme/he-morphemes";
import { heLemmaPhrasemeSurfaceSchemaTree } from "./phraseme/he-phrasemes";

export const heSurfaceSchema = {
	inflection: {
		lexeme: heInflectionLexemeSurfaceSchemaTree,
	},
	lemma: {
		lexeme: heLemmaLexemeSurfaceSchemaTree,
		morpheme: heLemmaMorphemeSurfaceSchemaTree,
		phraseme: heLemmaPhrasemeSurfaceSchemaTree,
	},
};
