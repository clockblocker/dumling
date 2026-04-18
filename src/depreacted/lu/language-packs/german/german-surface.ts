import type { DeprecatedSurfaceSchemaLanguageShape } from "../../registry-shapes";
import {
	DeprecatedGermanInflectionLexemeSurfaceSchemas,
	DeprecatedGermanLemmaLexemeSurfaceSchemas,
} from "./lu/lexeme/german-lexemes";
import { DeprecatedGermanLemmaMorphemeSurfaceSchemas } from "./lu/morpheme/german-morphemes";
import { DeprecatedGermanLemmaPhrasemeSurfaceSchemas } from "./lu/phraseme/german-phrasemes";

export const DeprecatedGermanSurfaceSchema = {
	Inflection: {
		Lexeme: DeprecatedGermanInflectionLexemeSurfaceSchemas,
	},
	Lemma: {
		Lexeme: DeprecatedGermanLemmaLexemeSurfaceSchemas,
		Morpheme: DeprecatedGermanLemmaMorphemeSurfaceSchemas,
		Phraseme: DeprecatedGermanLemmaPhrasemeSurfaceSchemas,
	},
} satisfies DeprecatedSurfaceSchemaLanguageShape;
