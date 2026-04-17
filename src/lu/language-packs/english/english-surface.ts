import type { SurfaceSchemaLanguageShape } from "../../registry-shapes";
import {
	EnglishInflectionLexemeSurfaceSchemas,
	EnglishLemmaLexemeSurfaceSchemas,
} from "./lu/lexeme/english-lexemes";
import { EnglishLemmaMorphemeSurfaceSchemas } from "./lu/morpheme/english-morphemes";
import { EnglishLemmaPhrasemeSurfaceSchemas } from "./lu/phraseme/english-phrasemes";

export const EnglishSurfaceSchema = {
	Inflection: {
		Lexeme: EnglishInflectionLexemeSurfaceSchemas,
	},
	Lemma: {
		Lexeme: EnglishLemmaLexemeSurfaceSchemas,
		Morpheme: EnglishLemmaMorphemeSurfaceSchemas,
		Phraseme: EnglishLemmaPhrasemeSurfaceSchemas,
	},
} satisfies SurfaceSchemaLanguageShape;
