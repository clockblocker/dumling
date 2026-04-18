import type {
	LemmaSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { HebrewAdjectiveSchemas } from "./pos/hebrew-adjective";
import { HebrewAdpositionSchemas } from "./pos/hebrew-adposition";
import { HebrewAdverbSchemas } from "./pos/hebrew-adverb";
import { HebrewAuxiliarySchemas } from "./pos/hebrew-auxiliary";
import { HebrewCoordinatingConjunctionSchemas } from "./pos/hebrew-coordinating-conjunction";
import { HebrewDeterminerSchemas } from "./pos/hebrew-determiner";
import { HebrewInterjectionSchemas } from "./pos/hebrew-interjection";
import { HebrewNounSchemas } from "./pos/hebrew-noun";
import { HebrewNumeralSchemas } from "./pos/hebrew-numeral";
import { HebrewOtherSchemas } from "./pos/hebrew-other";
import { HebrewPronounSchemas } from "./pos/hebrew-pronoun";
import { HebrewProperNounSchemas } from "./pos/hebrew-proper-noun";
import { HebrewPunctuationSchemas } from "./pos/hebrew-punctuation";
import { HebrewSubordinatingConjunctionSchemas } from "./pos/hebrew-subordinating-conjunction";
import { HebrewSymbolSchemas } from "./pos/hebrew-symbol";
import { HebrewVerbSchemas } from "./pos/hebrew-verb";

export const HebrewLexemeLemmaSchemas = {
	ADJ: HebrewAdjectiveSchemas.LemmaSchema,
	ADP: HebrewAdpositionSchemas.LemmaSchema,
	ADV: HebrewAdverbSchemas.LemmaSchema,
	AUX: HebrewAuxiliarySchemas.LemmaSchema,
	CCONJ: HebrewCoordinatingConjunctionSchemas.LemmaSchema,
	DET: HebrewDeterminerSchemas.LemmaSchema,
	INTJ: HebrewInterjectionSchemas.LemmaSchema,
	NOUN: HebrewNounSchemas.LemmaSchema,
	NUM: HebrewNumeralSchemas.LemmaSchema,
	PRON: HebrewPronounSchemas.LemmaSchema,
	PROPN: HebrewProperNounSchemas.LemmaSchema,
	PUNCT: HebrewPunctuationSchemas.LemmaSchema,
	SCONJ: HebrewSubordinatingConjunctionSchemas.LemmaSchema,
	SYM: HebrewSymbolSchemas.LemmaSchema,
	VERB: HebrewVerbSchemas.LemmaSchema,
	X: HebrewOtherSchemas.LemmaSchema,
} satisfies LemmaSchemaLanguageShape["Lexeme"];

export const HebrewInflectionLexemeSurfaceSchemas = {
	ADJ: HebrewAdjectiveSchemas.InflectionSurfaceSchema,
	ADP: HebrewAdpositionSchemas.InflectionSurfaceSchema,
	ADV: HebrewAdverbSchemas.InflectionSurfaceSchema,
	AUX: HebrewAuxiliarySchemas.InflectionSurfaceSchema,
	CCONJ: HebrewCoordinatingConjunctionSchemas.InflectionSurfaceSchema,
	DET: HebrewDeterminerSchemas.InflectionSurfaceSchema,
	INTJ: HebrewInterjectionSchemas.InflectionSurfaceSchema,
	NOUN: HebrewNounSchemas.InflectionSurfaceSchema,
	NUM: HebrewNumeralSchemas.InflectionSurfaceSchema,
	PRON: HebrewPronounSchemas.InflectionSurfaceSchema,
	PROPN: HebrewProperNounSchemas.InflectionSurfaceSchema,
	PUNCT: HebrewPunctuationSchemas.InflectionSurfaceSchema,
	SCONJ: HebrewSubordinatingConjunctionSchemas.InflectionSurfaceSchema,
	SYM: HebrewSymbolSchemas.InflectionSurfaceSchema,
	VERB: HebrewVerbSchemas.InflectionSurfaceSchema,
	X: HebrewOtherSchemas.InflectionSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Inflection"]["Lexeme"];

export const HebrewLemmaLexemeSurfaceSchemas = {
	ADJ: HebrewAdjectiveSchemas.LemmaSurfaceSchema,
	ADP: HebrewAdpositionSchemas.LemmaSurfaceSchema,
	ADV: HebrewAdverbSchemas.LemmaSurfaceSchema,
	AUX: HebrewAuxiliarySchemas.LemmaSurfaceSchema,
	CCONJ: HebrewCoordinatingConjunctionSchemas.LemmaSurfaceSchema,
	DET: HebrewDeterminerSchemas.LemmaSurfaceSchema,
	INTJ: HebrewInterjectionSchemas.LemmaSurfaceSchema,
	NOUN: HebrewNounSchemas.LemmaSurfaceSchema,
	NUM: HebrewNumeralSchemas.LemmaSurfaceSchema,
	PRON: HebrewPronounSchemas.LemmaSurfaceSchema,
	PROPN: HebrewProperNounSchemas.LemmaSurfaceSchema,
	PUNCT: HebrewPunctuationSchemas.LemmaSurfaceSchema,
	SCONJ: HebrewSubordinatingConjunctionSchemas.LemmaSurfaceSchema,
	SYM: HebrewSymbolSchemas.LemmaSurfaceSchema,
	VERB: HebrewVerbSchemas.LemmaSurfaceSchema,
	X: HebrewOtherSchemas.LemmaSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Lexeme"];
