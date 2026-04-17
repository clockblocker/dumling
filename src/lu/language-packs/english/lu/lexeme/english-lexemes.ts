import type {
	LemmaSchemaLanguageShape,
	SelectionSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { EnglishAdjectiveSchemas } from "./pos/english-adjective";
import { EnglishAdpositionSchemas } from "./pos/english-adposition";
import { EnglishAdverbSchemas } from "./pos/english-adverb";
import { EnglishAuxiliarySchemas } from "./pos/english-auxiliary";
import { EnglishCoordinatingConjunctionSchemas } from "./pos/english-coordinating-conjunction";
import { EnglishDeterminerSchemas } from "./pos/english-determiner";
import { EnglishInterjectionSchemas } from "./pos/english-interjection";
import { EnglishNounSchemas } from "./pos/english-noun";
import { EnglishNumeralSchemas } from "./pos/english-numeral";
import { EnglishOtherSchemas } from "./pos/english-other";
import { EnglishParticleSchemas } from "./pos/english-particle";
import { EnglishPronounSchemas } from "./pos/english-pronoun";
import { EnglishProperNounSchemas } from "./pos/english-proper-noun";
import { EnglishPunctuationSchemas } from "./pos/english-punctuation";
import { EnglishSubordinatingConjunctionSchemas } from "./pos/english-subordinating-conjunction";
import { EnglishSymbolSchemas } from "./pos/english-symbol";
import { EnglishVerbSchemas } from "./pos/english-verb";

export const EnglishLexemeLemmaSchemas = {
	ADJ: EnglishAdjectiveSchemas.LemmaSchema,
	ADP: EnglishAdpositionSchemas.LemmaSchema,
	ADV: EnglishAdverbSchemas.LemmaSchema,
	AUX: EnglishAuxiliarySchemas.LemmaSchema,
	CCONJ: EnglishCoordinatingConjunctionSchemas.LemmaSchema,
	DET: EnglishDeterminerSchemas.LemmaSchema,
	INTJ: EnglishInterjectionSchemas.LemmaSchema,
	NOUN: EnglishNounSchemas.LemmaSchema,
	NUM: EnglishNumeralSchemas.LemmaSchema,
	PART: EnglishParticleSchemas.LemmaSchema,
	PRON: EnglishPronounSchemas.LemmaSchema,
	PROPN: EnglishProperNounSchemas.LemmaSchema,
	PUNCT: EnglishPunctuationSchemas.LemmaSchema,
	SCONJ: EnglishSubordinatingConjunctionSchemas.LemmaSchema,
	SYM: EnglishSymbolSchemas.LemmaSchema,
	VERB: EnglishVerbSchemas.LemmaSchema,
	X: EnglishOtherSchemas.LemmaSchema,
} satisfies LemmaSchemaLanguageShape["Lexeme"];

export const EnglishStandardInflectionLexemeSelectionSchemas = {
	ADJ: EnglishAdjectiveSchemas.InflectionSelectionSchema,
	ADP: EnglishAdpositionSchemas.InflectionSelectionSchema,
	ADV: EnglishAdverbSchemas.InflectionSelectionSchema,
	AUX: EnglishAuxiliarySchemas.InflectionSelectionSchema,
	CCONJ: EnglishCoordinatingConjunctionSchemas.InflectionSelectionSchema,
	DET: EnglishDeterminerSchemas.InflectionSelectionSchema,
	INTJ: EnglishInterjectionSchemas.InflectionSelectionSchema,
	NOUN: EnglishNounSchemas.InflectionSelectionSchema,
	NUM: EnglishNumeralSchemas.InflectionSelectionSchema,
	PART: EnglishParticleSchemas.InflectionSelectionSchema,
	PRON: EnglishPronounSchemas.InflectionSelectionSchema,
	PROPN: EnglishProperNounSchemas.InflectionSelectionSchema,
	PUNCT: EnglishPunctuationSchemas.InflectionSelectionSchema,
	SCONJ: EnglishSubordinatingConjunctionSchemas.InflectionSelectionSchema,
	SYM: EnglishSymbolSchemas.InflectionSelectionSchema,
	VERB: EnglishVerbSchemas.InflectionSelectionSchema,
	X: EnglishOtherSchemas.InflectionSelectionSchema,
} satisfies SelectionSchemaLanguageShape["Standard"]["Inflection"]["Lexeme"];

export const EnglishInflectionLexemeSurfaceSchemas = {
	ADJ: EnglishAdjectiveSchemas.InflectionSurfaceSchema,
	ADP: EnglishAdpositionSchemas.InflectionSurfaceSchema,
	ADV: EnglishAdverbSchemas.InflectionSurfaceSchema,
	AUX: EnglishAuxiliarySchemas.InflectionSurfaceSchema,
	CCONJ: EnglishCoordinatingConjunctionSchemas.InflectionSurfaceSchema,
	DET: EnglishDeterminerSchemas.InflectionSurfaceSchema,
	INTJ: EnglishInterjectionSchemas.InflectionSurfaceSchema,
	NOUN: EnglishNounSchemas.InflectionSurfaceSchema,
	NUM: EnglishNumeralSchemas.InflectionSurfaceSchema,
	PART: EnglishParticleSchemas.InflectionSurfaceSchema,
	PRON: EnglishPronounSchemas.InflectionSurfaceSchema,
	PROPN: EnglishProperNounSchemas.InflectionSurfaceSchema,
	PUNCT: EnglishPunctuationSchemas.InflectionSurfaceSchema,
	SCONJ: EnglishSubordinatingConjunctionSchemas.InflectionSurfaceSchema,
	SYM: EnglishSymbolSchemas.InflectionSurfaceSchema,
	VERB: EnglishVerbSchemas.InflectionSurfaceSchema,
	X: EnglishOtherSchemas.InflectionSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Inflection"]["Lexeme"];

export const EnglishStandardLemmaLexemeSelectionSchemas = {
	ADJ: EnglishAdjectiveSchemas.LemmaSelectionSchema,
	ADP: EnglishAdpositionSchemas.LemmaSelectionSchema,
	ADV: EnglishAdverbSchemas.LemmaSelectionSchema,
	AUX: EnglishAuxiliarySchemas.LemmaSelectionSchema,
	CCONJ: EnglishCoordinatingConjunctionSchemas.LemmaSelectionSchema,
	DET: EnglishDeterminerSchemas.LemmaSelectionSchema,
	INTJ: EnglishInterjectionSchemas.LemmaSelectionSchema,
	NOUN: EnglishNounSchemas.LemmaSelectionSchema,
	NUM: EnglishNumeralSchemas.LemmaSelectionSchema,
	PART: EnglishParticleSchemas.LemmaSelectionSchema,
	PRON: EnglishPronounSchemas.LemmaSelectionSchema,
	PROPN: EnglishProperNounSchemas.LemmaSelectionSchema,
	PUNCT: EnglishPunctuationSchemas.LemmaSelectionSchema,
	SCONJ: EnglishSubordinatingConjunctionSchemas.LemmaSelectionSchema,
	SYM: EnglishSymbolSchemas.LemmaSelectionSchema,
	VERB: EnglishVerbSchemas.LemmaSelectionSchema,
	X: EnglishOtherSchemas.LemmaSelectionSchema,
} satisfies SelectionSchemaLanguageShape["Standard"]["Lemma"]["Lexeme"];

export const EnglishLemmaLexemeSurfaceSchemas = {
	ADJ: EnglishAdjectiveSchemas.LemmaSurfaceSchema,
	ADP: EnglishAdpositionSchemas.LemmaSurfaceSchema,
	ADV: EnglishAdverbSchemas.LemmaSurfaceSchema,
	AUX: EnglishAuxiliarySchemas.LemmaSurfaceSchema,
	CCONJ: EnglishCoordinatingConjunctionSchemas.LemmaSurfaceSchema,
	DET: EnglishDeterminerSchemas.LemmaSurfaceSchema,
	INTJ: EnglishInterjectionSchemas.LemmaSurfaceSchema,
	NOUN: EnglishNounSchemas.LemmaSurfaceSchema,
	NUM: EnglishNumeralSchemas.LemmaSurfaceSchema,
	PART: EnglishParticleSchemas.LemmaSurfaceSchema,
	PRON: EnglishPronounSchemas.LemmaSurfaceSchema,
	PROPN: EnglishProperNounSchemas.LemmaSurfaceSchema,
	PUNCT: EnglishPunctuationSchemas.LemmaSurfaceSchema,
	SCONJ: EnglishSubordinatingConjunctionSchemas.LemmaSurfaceSchema,
	SYM: EnglishSymbolSchemas.LemmaSurfaceSchema,
	VERB: EnglishVerbSchemas.LemmaSurfaceSchema,
	X: EnglishOtherSchemas.LemmaSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Lexeme"];

export const EnglishTypoInflectionLexemeSelectionSchemas = {
	ADJ: EnglishAdjectiveSchemas.TypoInflectionSelectionSchema,
	ADP: EnglishAdpositionSchemas.TypoInflectionSelectionSchema,
	ADV: EnglishAdverbSchemas.TypoInflectionSelectionSchema,
	AUX: EnglishAuxiliarySchemas.TypoInflectionSelectionSchema,
	CCONJ: EnglishCoordinatingConjunctionSchemas.TypoInflectionSelectionSchema,
	DET: EnglishDeterminerSchemas.TypoInflectionSelectionSchema,
	INTJ: EnglishInterjectionSchemas.TypoInflectionSelectionSchema,
	NOUN: EnglishNounSchemas.TypoInflectionSelectionSchema,
	NUM: EnglishNumeralSchemas.TypoInflectionSelectionSchema,
	PART: EnglishParticleSchemas.TypoInflectionSelectionSchema,
	PRON: EnglishPronounSchemas.TypoInflectionSelectionSchema,
	PROPN: EnglishProperNounSchemas.TypoInflectionSelectionSchema,
	PUNCT: EnglishPunctuationSchemas.TypoInflectionSelectionSchema,
	SCONJ: EnglishSubordinatingConjunctionSchemas.TypoInflectionSelectionSchema,
	SYM: EnglishSymbolSchemas.TypoInflectionSelectionSchema,
	VERB: EnglishVerbSchemas.TypoInflectionSelectionSchema,
	X: EnglishOtherSchemas.TypoInflectionSelectionSchema,
} satisfies SelectionSchemaLanguageShape["Typo"]["Inflection"]["Lexeme"];

export const EnglishTypoLemmaLexemeSelectionSchemas = {
	ADJ: EnglishAdjectiveSchemas.TypoLemmaSelectionSchema,
	ADP: EnglishAdpositionSchemas.TypoLemmaSelectionSchema,
	ADV: EnglishAdverbSchemas.TypoLemmaSelectionSchema,
	AUX: EnglishAuxiliarySchemas.TypoLemmaSelectionSchema,
	CCONJ: EnglishCoordinatingConjunctionSchemas.TypoLemmaSelectionSchema,
	DET: EnglishDeterminerSchemas.TypoLemmaSelectionSchema,
	INTJ: EnglishInterjectionSchemas.TypoLemmaSelectionSchema,
	NOUN: EnglishNounSchemas.TypoLemmaSelectionSchema,
	NUM: EnglishNumeralSchemas.TypoLemmaSelectionSchema,
	PART: EnglishParticleSchemas.TypoLemmaSelectionSchema,
	PRON: EnglishPronounSchemas.TypoLemmaSelectionSchema,
	PROPN: EnglishProperNounSchemas.TypoLemmaSelectionSchema,
	PUNCT: EnglishPunctuationSchemas.TypoLemmaSelectionSchema,
	SCONJ: EnglishSubordinatingConjunctionSchemas.TypoLemmaSelectionSchema,
	SYM: EnglishSymbolSchemas.TypoLemmaSelectionSchema,
	VERB: EnglishVerbSchemas.TypoLemmaSelectionSchema,
	X: EnglishOtherSchemas.TypoLemmaSelectionSchema,
} satisfies SelectionSchemaLanguageShape["Typo"]["Lemma"]["Lexeme"];
