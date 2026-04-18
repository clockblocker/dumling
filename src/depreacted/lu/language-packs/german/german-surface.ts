import type { SurfaceSchemaLanguageShape } from "../../registry-shapes";
import {
	GermanInflectionLexemeSurfaceSchemas,
	GermanLemmaLexemeSurfaceSchemas,
} from "./lu/lexeme/german-lexemes";
import { GermanLemmaMorphemeSurfaceSchemas } from "./lu/morpheme/german-morphemes";
import { GermanLemmaPhrasemeSurfaceSchemas } from "./lu/phraseme/german-phrasemes";

export const GermanSurfaceSchema = {
	Inflection: {
		Lexeme: GermanInflectionLexemeSurfaceSchemas,
	},
	Lemma: {
		Lexeme: GermanLemmaLexemeSurfaceSchemas,
		Morpheme: GermanLemmaMorphemeSurfaceSchemas,
		Phraseme: GermanLemmaPhrasemeSurfaceSchemas,
	},
} satisfies SurfaceSchemaLanguageShape;
