import type { DeLemmaSchemaTree } from "../../internal-types";
import { deLexemeLemmaSchemaTree } from "./lexeme/de-lexemes";
import { deMorphemeLemmaSchemaTree } from "./morpheme/de-morphemes";
import { dePhrasemeLemmaSchemaTree } from "./phraseme/de-phrasemes";

export const deLemmaSchema = {
	lexeme: deLexemeLemmaSchemaTree,
	morpheme: deMorphemeLemmaSchemaTree,
	phraseme: dePhrasemeLemmaSchemaTree,
} satisfies DeLemmaSchemaTree;
