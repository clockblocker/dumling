import type { SurfaceSchemaLanguageShape } from "../../registry-shapes";
import {
	HebrewInflectionLexemeSurfaceSchemas,
	HebrewLemmaLexemeSurfaceSchemas,
} from "./lu/lexeme/hebrew-lexemes";
import { HebrewLemmaMorphemeSurfaceSchemas } from "./lu/morpheme/hebrew-morphemes";
import { HebrewLemmaPhrasemeSurfaceSchemas } from "./lu/phraseme/hebrew-phrasemes";

export const HebrewSurfaceSchema = {
	Inflection: {
		Lexeme: HebrewInflectionLexemeSurfaceSchemas,
	},
	Lemma: {
		Lexeme: HebrewLemmaLexemeSurfaceSchemas,
		Morpheme: HebrewLemmaMorphemeSurfaceSchemas,
		Phraseme: HebrewLemmaPhrasemeSurfaceSchemas,
	},
} satisfies SurfaceSchemaLanguageShape;
