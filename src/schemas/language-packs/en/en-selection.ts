import type { EnSelectionSchemaTree } from "../../internal-types";
import {
	enInflectionLexemeSelectionSchemaTree,
	enLemmaLexemeSelectionSchemaTree,
} from "./lexeme/en-lexemes";
import { enMorphemeLemmaSelectionSchemaTree } from "./morpheme/en-morphemes";
import { enPhrasemeLemmaSelectionSchemaTree } from "./phraseme/en-phrasemes";

export const enSelectionSchema = {
	standard: {
		lemma: {
			lexeme: enLemmaLexemeSelectionSchemaTree.standard,
			morpheme: enMorphemeLemmaSelectionSchemaTree.standard,
			phraseme: enPhrasemeLemmaSelectionSchemaTree.standard,
		},
		inflection: {
			lexeme: enInflectionLexemeSelectionSchemaTree.standard,
		},
	},
	typo: {
		lemma: {
			lexeme: enLemmaLexemeSelectionSchemaTree.typo,
			morpheme: enMorphemeLemmaSelectionSchemaTree.typo,
			phraseme: enPhrasemeLemmaSelectionSchemaTree.typo,
		},
		inflection: {
			lexeme: enInflectionLexemeSelectionSchemaTree.typo,
		},
	},
} satisfies EnSelectionSchemaTree;
