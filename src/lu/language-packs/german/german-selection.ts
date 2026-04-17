import z from "zod/v3";
import type {
	ObservedSelectionSchemaLanguageShape,
	SelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { ObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import {
	GermanStandardInflectionLexemeSelectionSchemas,
	GermanStandardLemmaLexemeSelectionSchemas,
	GermanTypoInflectionLexemeSelectionSchemas,
	GermanTypoLemmaLexemeSelectionSchemas,
} from "./lu/lexeme/german-lexemes";
import {
	GermanStandardLemmaMorphemeSelectionSchemas,
	GermanTypoLemmaMorphemeSelectionSchemas,
} from "./lu/morpheme/german-morphemes";
import {
	GermanStandardLemmaPhrasemeSelectionSchemas,
	GermanTypoLemmaPhrasemeSelectionSchemas,
} from "./lu/phraseme/german-phrasemes";

export const GermanObservedSelectionSchema = z
	.object({
		language: z.literal("German"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies ObservedSelectionSchemaFor;

export const GermanSelectionSchema = {
	Standard: {
		Inflection: {
			Lexeme: GermanStandardInflectionLexemeSelectionSchemas,
		},
		Lemma: {
			Lexeme: GermanStandardLemmaLexemeSelectionSchemas,
			Morpheme: GermanStandardLemmaMorphemeSelectionSchemas,
			Phraseme: GermanStandardLemmaPhrasemeSelectionSchemas,
		},
	},
	Typo: {
		Inflection: {
			Lexeme: GermanTypoInflectionLexemeSelectionSchemas,
		},
		Lemma: {
			Lexeme: GermanTypoLemmaLexemeSelectionSchemas,
			Morpheme: GermanTypoLemmaMorphemeSelectionSchemas,
			Phraseme: GermanTypoLemmaPhrasemeSelectionSchemas,
		},
	},
} satisfies SelectionSchemaLanguageShape;

const _germanObservedSelectionSchemaShapeCheck =
	GermanObservedSelectionSchema satisfies ObservedSelectionSchemaLanguageShape;
