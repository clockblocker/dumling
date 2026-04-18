import type { DeprecatedLemmaSchemaLanguageShape } from "../../registry-shapes";
import { DeprecatedHebrewLexemeLemmaSchemas } from "./lu/lexeme/hebrew-lexemes";
import { DeprecatedHebrewMorphemeLemmaSchemas } from "./lu/morpheme/hebrew-morphemes";
import { DeprecatedHebrewPhrasemeLemmaSchemas } from "./lu/phraseme/hebrew-phrasemes";

export const DeprecatedHebrewLemmaSchema = {
	Lexeme: DeprecatedHebrewLexemeLemmaSchemas,
	Morpheme: DeprecatedHebrewMorphemeLemmaSchemas,
	Phraseme: DeprecatedHebrewPhrasemeLemmaSchemas,
} satisfies DeprecatedLemmaSchemaLanguageShape;
