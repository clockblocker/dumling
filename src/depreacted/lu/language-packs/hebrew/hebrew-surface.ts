import type { DeprecatedSurfaceSchemaLanguageShape } from "../../registry-shapes";
import {
	DeprecatedHebrewInflectionLexemeSurfaceSchemas,
	DeprecatedHebrewLemmaLexemeSurfaceSchemas,
} from "./lu/lexeme/hebrew-lexemes";
import { DeprecatedHebrewLemmaMorphemeSurfaceSchemas } from "./lu/morpheme/hebrew-morphemes";
import { DeprecatedHebrewLemmaPhrasemeSurfaceSchemas } from "./lu/phraseme/hebrew-phrasemes";

export const DeprecatedHebrewSurfaceSchema = {
	Inflection: {
		Lexeme: DeprecatedHebrewInflectionLexemeSurfaceSchemas,
	},
	Lemma: {
		Lexeme: DeprecatedHebrewLemmaLexemeSurfaceSchemas,
		Morpheme: DeprecatedHebrewLemmaMorphemeSurfaceSchemas,
		Phraseme: DeprecatedHebrewLemmaPhrasemeSurfaceSchemas,
	},
} satisfies DeprecatedSurfaceSchemaLanguageShape;
