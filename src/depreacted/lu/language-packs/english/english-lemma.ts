import type { DeprecatedLemmaSchemaLanguageShape } from "../../registry-shapes";
import { DeprecatedEnglishLexemeLemmaSchemas } from "./lu/lexeme/english-lexemes";
import { DeprecatedEnglishMorphemeLemmaSchemas } from "./lu/morpheme/english-morphemes";
import { DeprecatedEnglishPhrasemeLemmaSchemas } from "./lu/phraseme/english-phrasemes";

export const DeprecatedEnglishLemmaSchema = {
	Lexeme: DeprecatedEnglishLexemeLemmaSchemas,
	Morpheme: DeprecatedEnglishMorphemeLemmaSchemas,
	Phraseme: DeprecatedEnglishPhrasemeLemmaSchemas,
} satisfies DeprecatedLemmaSchemaLanguageShape;
