import z from "zod/v3";
import type {
	ObservedSelectionSchemaLanguageShape,
	SelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { ObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import {
	HebrewStandardInflectionLexemeSelectionSchemas,
	HebrewStandardLemmaLexemeSelectionSchemas,
	HebrewTypoInflectionLexemeSelectionSchemas,
	HebrewTypoLemmaLexemeSelectionSchemas,
} from "./lu/lexeme/hebrew-lexemes";
import {
	HebrewStandardLemmaMorphemeSelectionSchemas,
	HebrewTypoLemmaMorphemeSelectionSchemas,
} from "./lu/morpheme/hebrew-morphemes";
import {
	HebrewStandardLemmaPhrasemeSelectionSchemas,
	HebrewTypoLemmaPhrasemeSelectionSchemas,
} from "./lu/phraseme/hebrew-phrasemes";

export const HebrewObservedSelectionSchema = z
	.object({
		language: z.literal("Hebrew"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies ObservedSelectionSchemaFor;

export const HebrewSelectionSchema = {
	Standard: {
		Inflection: {
			Lexeme: HebrewStandardInflectionLexemeSelectionSchemas,
		},
		Lemma: {
			Lexeme: HebrewStandardLemmaLexemeSelectionSchemas,
			Morpheme: HebrewStandardLemmaMorphemeSelectionSchemas,
			Phraseme: HebrewStandardLemmaPhrasemeSelectionSchemas,
		},
	},
	Typo: {
		Inflection: {
			Lexeme: HebrewTypoInflectionLexemeSelectionSchemas,
		},
		Lemma: {
			Lexeme: HebrewTypoLemmaLexemeSelectionSchemas,
			Morpheme: HebrewTypoLemmaMorphemeSelectionSchemas,
			Phraseme: HebrewTypoLemmaPhrasemeSelectionSchemas,
		},
	},
} satisfies SelectionSchemaLanguageShape;

const _hebrewObservedSelectionSchemaShapeCheck =
	HebrewObservedSelectionSchema satisfies ObservedSelectionSchemaLanguageShape;
