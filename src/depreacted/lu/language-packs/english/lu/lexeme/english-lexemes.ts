import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { DeprecatedEnglishAdjectiveSchemas } from "./pos/english-adjective";
import { DeprecatedEnglishAdpositionSchemas } from "./pos/english-adposition";
import { DeprecatedEnglishAdverbSchemas } from "./pos/english-adverb";
import { DeprecatedEnglishAuxiliarySchemas } from "./pos/english-auxiliary";
import { DeprecatedEnglishCoordinatingConjunctionSchemas } from "./pos/english-coordinating-conjunction";
import { DeprecatedEnglishDeterminerSchemas } from "./pos/english-determiner";
import { DeprecatedEnglishInterjectionSchemas } from "./pos/english-interjection";
import { DeprecatedEnglishNounSchemas } from "./pos/english-noun";
import { DeprecatedEnglishNumeralSchemas } from "./pos/english-numeral";
import { DeprecatedEnglishOtherSchemas } from "./pos/english-other";
import { DeprecatedEnglishParticleSchemas } from "./pos/english-particle";
import { DeprecatedEnglishPronounSchemas } from "./pos/english-pronoun";
import { DeprecatedEnglishProperNounSchemas } from "./pos/english-proper-noun";
import { DeprecatedEnglishPunctuationSchemas } from "./pos/english-punctuation";
import { DeprecatedEnglishSubordinatingConjunctionSchemas } from "./pos/english-subordinating-conjunction";
import { DeprecatedEnglishSymbolSchemas } from "./pos/english-symbol";
import { DeprecatedEnglishVerbSchemas } from "./pos/english-verb";

export const DeprecatedEnglishLexemeLemmaSchemas = {
	ADJ: DeprecatedEnglishAdjectiveSchemas.LemmaSchema,
	ADP: DeprecatedEnglishAdpositionSchemas.LemmaSchema,
	ADV: DeprecatedEnglishAdverbSchemas.LemmaSchema,
	AUX: DeprecatedEnglishAuxiliarySchemas.LemmaSchema,
	CCONJ: DeprecatedEnglishCoordinatingConjunctionSchemas.LemmaSchema,
	DET: DeprecatedEnglishDeterminerSchemas.LemmaSchema,
	INTJ: DeprecatedEnglishInterjectionSchemas.LemmaSchema,
	NOUN: DeprecatedEnglishNounSchemas.LemmaSchema,
	NUM: DeprecatedEnglishNumeralSchemas.LemmaSchema,
	PART: DeprecatedEnglishParticleSchemas.LemmaSchema,
	PRON: DeprecatedEnglishPronounSchemas.LemmaSchema,
	PROPN: DeprecatedEnglishProperNounSchemas.LemmaSchema,
	PUNCT: DeprecatedEnglishPunctuationSchemas.LemmaSchema,
	SCONJ: DeprecatedEnglishSubordinatingConjunctionSchemas.LemmaSchema,
	SYM: DeprecatedEnglishSymbolSchemas.LemmaSchema,
	VERB: DeprecatedEnglishVerbSchemas.LemmaSchema,
	X: DeprecatedEnglishOtherSchemas.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Lexeme"];

export const DeprecatedEnglishInflectionLexemeSurfaceSchemas = {
	ADJ: DeprecatedEnglishAdjectiveSchemas.InflectionSurfaceSchema,
	ADP: DeprecatedEnglishAdpositionSchemas.InflectionSurfaceSchema,
	ADV: DeprecatedEnglishAdverbSchemas.InflectionSurfaceSchema,
	AUX: DeprecatedEnglishAuxiliarySchemas.InflectionSurfaceSchema,
	CCONJ: DeprecatedEnglishCoordinatingConjunctionSchemas.InflectionSurfaceSchema,
	DET: DeprecatedEnglishDeterminerSchemas.InflectionSurfaceSchema,
	INTJ: DeprecatedEnglishInterjectionSchemas.InflectionSurfaceSchema,
	NOUN: DeprecatedEnglishNounSchemas.InflectionSurfaceSchema,
	NUM: DeprecatedEnglishNumeralSchemas.InflectionSurfaceSchema,
	PART: DeprecatedEnglishParticleSchemas.InflectionSurfaceSchema,
	PRON: DeprecatedEnglishPronounSchemas.InflectionSurfaceSchema,
	PROPN: DeprecatedEnglishProperNounSchemas.InflectionSurfaceSchema,
	PUNCT: DeprecatedEnglishPunctuationSchemas.InflectionSurfaceSchema,
	SCONJ: DeprecatedEnglishSubordinatingConjunctionSchemas.InflectionSurfaceSchema,
	SYM: DeprecatedEnglishSymbolSchemas.InflectionSurfaceSchema,
	VERB: DeprecatedEnglishVerbSchemas.InflectionSurfaceSchema,
	X: DeprecatedEnglishOtherSchemas.InflectionSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Inflection"]["Lexeme"];

export const DeprecatedEnglishLemmaLexemeSurfaceSchemas = {
	ADJ: DeprecatedEnglishAdjectiveSchemas.LemmaSurfaceSchema,
	ADP: DeprecatedEnglishAdpositionSchemas.LemmaSurfaceSchema,
	ADV: DeprecatedEnglishAdverbSchemas.LemmaSurfaceSchema,
	AUX: DeprecatedEnglishAuxiliarySchemas.LemmaSurfaceSchema,
	CCONJ: DeprecatedEnglishCoordinatingConjunctionSchemas.LemmaSurfaceSchema,
	DET: DeprecatedEnglishDeterminerSchemas.LemmaSurfaceSchema,
	INTJ: DeprecatedEnglishInterjectionSchemas.LemmaSurfaceSchema,
	NOUN: DeprecatedEnglishNounSchemas.LemmaSurfaceSchema,
	NUM: DeprecatedEnglishNumeralSchemas.LemmaSurfaceSchema,
	PART: DeprecatedEnglishParticleSchemas.LemmaSurfaceSchema,
	PRON: DeprecatedEnglishPronounSchemas.LemmaSurfaceSchema,
	PROPN: DeprecatedEnglishProperNounSchemas.LemmaSurfaceSchema,
	PUNCT: DeprecatedEnglishPunctuationSchemas.LemmaSurfaceSchema,
	SCONJ: DeprecatedEnglishSubordinatingConjunctionSchemas.LemmaSurfaceSchema,
	SYM: DeprecatedEnglishSymbolSchemas.LemmaSurfaceSchema,
	VERB: DeprecatedEnglishVerbSchemas.LemmaSurfaceSchema,
	X: DeprecatedEnglishOtherSchemas.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Lexeme"];
