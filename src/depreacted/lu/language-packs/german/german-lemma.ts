import type { DeprecatedLemmaSchemaLanguageShape } from "../../registry-shapes";
import { DeprecatedGermanLexemeLemmaSchemas } from "./lu/lexeme/german-lexemes";
import { DeprecatedGermanMorphemeLemmaSchemas } from "./lu/morpheme/german-morphemes";
import { DeprecatedGermanPhrasemeLemmaSchemas } from "./lu/phraseme/german-phrasemes";

export const DeprecatedGermanLemmaSchema = {
	Lexeme: DeprecatedGermanLexemeLemmaSchemas,
	Morpheme: DeprecatedGermanMorphemeLemmaSchemas,
	Phraseme: DeprecatedGermanPhrasemeLemmaSchemas,
} satisfies DeprecatedLemmaSchemaLanguageShape;
