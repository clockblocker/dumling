import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { DeprecatedHebrewAdjectiveSchemas } from "./pos/hebrew-adjective";
import { DeprecatedHebrewAdpositionSchemas } from "./pos/hebrew-adposition";
import { DeprecatedHebrewAdverbSchemas } from "./pos/hebrew-adverb";
import { DeprecatedHebrewAuxiliarySchemas } from "./pos/hebrew-auxiliary";
import { DeprecatedHebrewCoordinatingConjunctionSchemas } from "./pos/hebrew-coordinating-conjunction";
import { DeprecatedHebrewDeterminerSchemas } from "./pos/hebrew-determiner";
import { DeprecatedHebrewInterjectionSchemas } from "./pos/hebrew-interjection";
import { DeprecatedHebrewNounSchemas } from "./pos/hebrew-noun";
import { DeprecatedHebrewNumeralSchemas } from "./pos/hebrew-numeral";
import { DeprecatedHebrewOtherSchemas } from "./pos/hebrew-other";
import { DeprecatedHebrewPronounSchemas } from "./pos/hebrew-pronoun";
import { DeprecatedHebrewProperNounSchemas } from "./pos/hebrew-proper-noun";
import { DeprecatedHebrewPunctuationSchemas } from "./pos/hebrew-punctuation";
import { DeprecatedHebrewSubordinatingConjunctionSchemas } from "./pos/hebrew-subordinating-conjunction";
import { DeprecatedHebrewSymbolSchemas } from "./pos/hebrew-symbol";
import { DeprecatedHebrewVerbSchemas } from "./pos/hebrew-verb";

export const DeprecatedHebrewLexemeLemmaSchemas = {
	ADJ: DeprecatedHebrewAdjectiveSchemas.LemmaSchema,
	ADP: DeprecatedHebrewAdpositionSchemas.LemmaSchema,
	ADV: DeprecatedHebrewAdverbSchemas.LemmaSchema,
	AUX: DeprecatedHebrewAuxiliarySchemas.LemmaSchema,
	CCONJ: DeprecatedHebrewCoordinatingConjunctionSchemas.LemmaSchema,
	DET: DeprecatedHebrewDeterminerSchemas.LemmaSchema,
	INTJ: DeprecatedHebrewInterjectionSchemas.LemmaSchema,
	NOUN: DeprecatedHebrewNounSchemas.LemmaSchema,
	NUM: DeprecatedHebrewNumeralSchemas.LemmaSchema,
	PRON: DeprecatedHebrewPronounSchemas.LemmaSchema,
	PROPN: DeprecatedHebrewProperNounSchemas.LemmaSchema,
	PUNCT: DeprecatedHebrewPunctuationSchemas.LemmaSchema,
	SCONJ: DeprecatedHebrewSubordinatingConjunctionSchemas.LemmaSchema,
	SYM: DeprecatedHebrewSymbolSchemas.LemmaSchema,
	VERB: DeprecatedHebrewVerbSchemas.LemmaSchema,
	X: DeprecatedHebrewOtherSchemas.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Lexeme"];

export const DeprecatedHebrewInflectionLexemeSurfaceSchemas = {
	ADJ: DeprecatedHebrewAdjectiveSchemas.InflectionSurfaceSchema,
	ADP: DeprecatedHebrewAdpositionSchemas.InflectionSurfaceSchema,
	ADV: DeprecatedHebrewAdverbSchemas.InflectionSurfaceSchema,
	AUX: DeprecatedHebrewAuxiliarySchemas.InflectionSurfaceSchema,
	CCONJ: DeprecatedHebrewCoordinatingConjunctionSchemas.InflectionSurfaceSchema,
	DET: DeprecatedHebrewDeterminerSchemas.InflectionSurfaceSchema,
	INTJ: DeprecatedHebrewInterjectionSchemas.InflectionSurfaceSchema,
	NOUN: DeprecatedHebrewNounSchemas.InflectionSurfaceSchema,
	NUM: DeprecatedHebrewNumeralSchemas.InflectionSurfaceSchema,
	PRON: DeprecatedHebrewPronounSchemas.InflectionSurfaceSchema,
	PROPN: DeprecatedHebrewProperNounSchemas.InflectionSurfaceSchema,
	PUNCT: DeprecatedHebrewPunctuationSchemas.InflectionSurfaceSchema,
	SCONJ: DeprecatedHebrewSubordinatingConjunctionSchemas.InflectionSurfaceSchema,
	SYM: DeprecatedHebrewSymbolSchemas.InflectionSurfaceSchema,
	VERB: DeprecatedHebrewVerbSchemas.InflectionSurfaceSchema,
	X: DeprecatedHebrewOtherSchemas.InflectionSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Inflection"]["Lexeme"];

export const DeprecatedHebrewLemmaLexemeSurfaceSchemas = {
	ADJ: DeprecatedHebrewAdjectiveSchemas.LemmaSurfaceSchema,
	ADP: DeprecatedHebrewAdpositionSchemas.LemmaSurfaceSchema,
	ADV: DeprecatedHebrewAdverbSchemas.LemmaSurfaceSchema,
	AUX: DeprecatedHebrewAuxiliarySchemas.LemmaSurfaceSchema,
	CCONJ: DeprecatedHebrewCoordinatingConjunctionSchemas.LemmaSurfaceSchema,
	DET: DeprecatedHebrewDeterminerSchemas.LemmaSurfaceSchema,
	INTJ: DeprecatedHebrewInterjectionSchemas.LemmaSurfaceSchema,
	NOUN: DeprecatedHebrewNounSchemas.LemmaSurfaceSchema,
	NUM: DeprecatedHebrewNumeralSchemas.LemmaSurfaceSchema,
	PRON: DeprecatedHebrewPronounSchemas.LemmaSurfaceSchema,
	PROPN: DeprecatedHebrewProperNounSchemas.LemmaSurfaceSchema,
	PUNCT: DeprecatedHebrewPunctuationSchemas.LemmaSurfaceSchema,
	SCONJ: DeprecatedHebrewSubordinatingConjunctionSchemas.LemmaSurfaceSchema,
	SYM: DeprecatedHebrewSymbolSchemas.LemmaSurfaceSchema,
	VERB: DeprecatedHebrewVerbSchemas.LemmaSurfaceSchema,
	X: DeprecatedHebrewOtherSchemas.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Lexeme"];
