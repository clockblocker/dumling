import type { EnLemmaSchemaTree } from "../../internal-types";
import { enLexemeLemmaSchemaTree } from "./lexeme/en-lexemes";
import { enMorphemeLemmaSchemaTree } from "./morpheme/en-morphemes";
import { enPhrasemeLemmaSchemaTree } from "./phraseme/en-phrasemes";

export const enLemmaSchema = {
	lexeme: enLexemeLemmaSchemaTree,
	morpheme: enMorphemeLemmaSchemaTree,
	phraseme: enPhrasemeLemmaSchemaTree,
} satisfies EnLemmaSchemaTree;
