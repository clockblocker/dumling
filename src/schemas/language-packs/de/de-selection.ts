import type { DeSelectionSchemaTree } from "../../internal-types";
import {
	deInflectionLexemeSelectionSchemaTree,
	deLemmaLexemeSelectionSchemaTree,
} from "./lexeme/de-lexemes";
import { deMorphemeLemmaSelectionSchemaTree } from "./morpheme/de-morphemes";
import { dePhrasemeLemmaSelectionSchemaTree } from "./phraseme/de-phrasemes";

export const deSelectionSchema = {
	standard: {
		lemma: {
			lexeme: deLemmaLexemeSelectionSchemaTree.standard,
			morpheme: deMorphemeLemmaSelectionSchemaTree.standard,
			phraseme: dePhrasemeLemmaSelectionSchemaTree.standard,
		},
		inflection: {
			lexeme: deInflectionLexemeSelectionSchemaTree.standard,
		},
	},
	typo: {
		lemma: {
			lexeme: deLemmaLexemeSelectionSchemaTree.typo,
			morpheme: deMorphemeLemmaSelectionSchemaTree.typo,
			phraseme: dePhrasemeLemmaSelectionSchemaTree.typo,
		},
		inflection: {
			lexeme: deInflectionLexemeSelectionSchemaTree.typo,
		},
	},
} satisfies DeSelectionSchemaTree;
