import z from "zod/v3";
import type {
	ObservedSelectionSchemaLanguageShape,
	SelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { ObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import {
	EnglishStandardInflectionLexemeSelectionSchemas,
	EnglishStandardLemmaLexemeSelectionSchemas,
	EnglishTypoInflectionLexemeSelectionSchemas,
	EnglishTypoLemmaLexemeSelectionSchemas,
} from "./lu/lexeme/english-lexemes";
import {
	EnglishStandardLemmaMorphemeSelectionSchemas,
	EnglishTypoLemmaMorphemeSelectionSchemas,
} from "./lu/morpheme/english-morphemes";
import {
	EnglishStandardLemmaPhrasemeSelectionSchemas,
	EnglishTypoLemmaPhrasemeSelectionSchemas,
} from "./lu/phraseme/english-phrasemes";

export const EnglishObservedSelectionSchema = z
	.object({
		language: z.literal("English"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies ObservedSelectionSchemaFor;

export const EnglishSelectionSchema = {
	Standard: {
		Inflection: {
			Lexeme: EnglishStandardInflectionLexemeSelectionSchemas,
		},
		Lemma: {
			Lexeme: EnglishStandardLemmaLexemeSelectionSchemas,
			Morpheme: EnglishStandardLemmaMorphemeSelectionSchemas,
			Phraseme: EnglishStandardLemmaPhrasemeSelectionSchemas,
		},
	},
	Typo: {
		Inflection: {
			Lexeme: EnglishTypoInflectionLexemeSelectionSchemas,
		},
		Lemma: {
			Lexeme: EnglishTypoLemmaLexemeSelectionSchemas,
			Morpheme: EnglishTypoLemmaMorphemeSelectionSchemas,
			Phraseme: EnglishTypoLemmaPhrasemeSelectionSchemas,
		},
	},
} satisfies SelectionSchemaLanguageShape;

const _englishObservedSelectionSchemaShapeCheck =
	EnglishObservedSelectionSchema satisfies ObservedSelectionSchemaLanguageShape;
