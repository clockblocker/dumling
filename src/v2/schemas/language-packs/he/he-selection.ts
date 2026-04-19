import {
	heInflectionLexemeSelectionSchemaTree,
	heLemmaLexemeSelectionSchemaTree,
} from "./lexeme/he-lexemes";
import { heLemmaMorphemeSelectionSchemaTree } from "./morpheme/he-morphemes";
import { heLemmaPhrasemeSelectionSchemaTree } from "./phraseme/he-phrasemes";

export const heSelectionSchema = {
	standard: {
		inflection: {
			lexeme: heInflectionLexemeSelectionSchemaTree.standard,
		},
		lemma: {
			lexeme: heLemmaLexemeSelectionSchemaTree.standard,
			morpheme: heLemmaMorphemeSelectionSchemaTree.standard,
			phraseme: heLemmaPhrasemeSelectionSchemaTree.standard,
		},
	},
	typo: {
		inflection: {
			lexeme: heInflectionLexemeSelectionSchemaTree.typo,
		},
		lemma: {
			lexeme: heLemmaLexemeSelectionSchemaTree.typo,
			morpheme: heLemmaMorphemeSelectionSchemaTree.typo,
			phraseme: heLemmaPhrasemeSelectionSchemaTree.typo,
		},
	},
};
