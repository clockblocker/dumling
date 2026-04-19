import { heLexemeLemmaSchemaTree } from "./lexeme/he-lexemes";
import { heMorphemeLemmaSchemaTree } from "./morpheme/he-morphemes";
import { hePhrasemeLemmaSchemaTree } from "./phraseme/he-phrasemes";

export const heLemmaSchema = {
	lexeme: heLexemeLemmaSchemaTree,
	morpheme: heMorphemeLemmaSchemaTree,
	phraseme: hePhrasemeLemmaSchemaTree,
};
