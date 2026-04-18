import type {
	LemmaSchemaLanguageShape,
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
