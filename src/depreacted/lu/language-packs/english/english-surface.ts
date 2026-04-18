import type { DeprecatedSurfaceSchemaLanguageShape } from "../../registry-shapes";
import {
	DeprecatedEnglishInflectionLexemeSurfaceSchemas,
	DeprecatedEnglishLemmaLexemeSurfaceSchemas,
} from "./lu/lexeme/english-lexemes";
import { DeprecatedEnglishLemmaMorphemeSurfaceSchemas } from "./lu/morpheme/english-morphemes";
import { DeprecatedEnglishLemmaPhrasemeSurfaceSchemas } from "./lu/phraseme/english-phrasemes";

export const DeprecatedEnglishSurfaceSchema = {
	Inflection: {
		Lexeme: DeprecatedEnglishInflectionLexemeSurfaceSchemas,
	},
	Lemma: {
		Lexeme: DeprecatedEnglishLemmaLexemeSurfaceSchemas,
		Morpheme: DeprecatedEnglishLemmaMorphemeSurfaceSchemas,
		Phraseme: DeprecatedEnglishLemmaPhrasemeSurfaceSchemas,
	},
} satisfies DeprecatedSurfaceSchemaLanguageShape;
