import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { DeprecatedGermanAdjectiveSchemas } from "./pos/german-adjective";
import { DeprecatedGermanAdpositionSchemas } from "./pos/german-adposition";
import { DeprecatedGermanAdverbSchemas } from "./pos/german-adverb";
import { DeprecatedGermanAuxiliarySchemas } from "./pos/german-auxiliary";
import { DeprecatedGermanCoordinatingConjunctionSchemas } from "./pos/german-coordinating-conjunction";
import { DeprecatedGermanDeterminerSchemas } from "./pos/german-determiner";
import { DeprecatedGermanInterjectionSchemas } from "./pos/german-interjection";
import { DeprecatedGermanNounSchemas } from "./pos/german-noun";
import { DeprecatedGermanNumeralSchemas } from "./pos/german-numeral";
import { DeprecatedGermanOtherSchemas } from "./pos/german-other";
import { DeprecatedGermanParticleSchemas } from "./pos/german-particle";
import { DeprecatedGermanPronounSchemas } from "./pos/german-pronoun";
import { DeprecatedGermanProperNounSchemas } from "./pos/german-proper-noun";
import { DeprecatedGermanPunctuationSchemas } from "./pos/german-punctuation";
import { DeprecatedGermanSubordinatingConjunctionSchemas } from "./pos/german-subordinating-conjunction";
import { DeprecatedGermanSymbolSchemas } from "./pos/german-symbol";
import { DeprecatedGermanVerbSchemas } from "./pos/german-verb";

export const DeprecatedGermanLexemeLemmaSchemas = {
	ADJ: DeprecatedGermanAdjectiveSchemas.LemmaSchema,
	ADP: DeprecatedGermanAdpositionSchemas.LemmaSchema,
	ADV: DeprecatedGermanAdverbSchemas.LemmaSchema,
	AUX: DeprecatedGermanAuxiliarySchemas.LemmaSchema,
	CCONJ: DeprecatedGermanCoordinatingConjunctionSchemas.LemmaSchema,
	DET: DeprecatedGermanDeterminerSchemas.LemmaSchema,
	INTJ: DeprecatedGermanInterjectionSchemas.LemmaSchema,
	NOUN: DeprecatedGermanNounSchemas.LemmaSchema,
	NUM: DeprecatedGermanNumeralSchemas.LemmaSchema,
	PART: DeprecatedGermanParticleSchemas.LemmaSchema,
	PRON: DeprecatedGermanPronounSchemas.LemmaSchema,
	PROPN: DeprecatedGermanProperNounSchemas.LemmaSchema,
	PUNCT: DeprecatedGermanPunctuationSchemas.LemmaSchema,
	SCONJ: DeprecatedGermanSubordinatingConjunctionSchemas.LemmaSchema,
	SYM: DeprecatedGermanSymbolSchemas.LemmaSchema,
	VERB: DeprecatedGermanVerbSchemas.LemmaSchema,
	X: DeprecatedGermanOtherSchemas.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Lexeme"];

export const DeprecatedGermanInflectionLexemeSurfaceSchemas = {
	ADJ: DeprecatedGermanAdjectiveSchemas.InflectionSurfaceSchema,
	ADP: DeprecatedGermanAdpositionSchemas.InflectionSurfaceSchema,
	ADV: DeprecatedGermanAdverbSchemas.InflectionSurfaceSchema,
	AUX: DeprecatedGermanAuxiliarySchemas.InflectionSurfaceSchema,
	CCONJ: DeprecatedGermanCoordinatingConjunctionSchemas.InflectionSurfaceSchema,
	DET: DeprecatedGermanDeterminerSchemas.InflectionSurfaceSchema,
	INTJ: DeprecatedGermanInterjectionSchemas.InflectionSurfaceSchema,
	NOUN: DeprecatedGermanNounSchemas.InflectionSurfaceSchema,
	NUM: DeprecatedGermanNumeralSchemas.InflectionSurfaceSchema,
	PART: DeprecatedGermanParticleSchemas.InflectionSurfaceSchema,
	PRON: DeprecatedGermanPronounSchemas.InflectionSurfaceSchema,
	PROPN: DeprecatedGermanProperNounSchemas.InflectionSurfaceSchema,
	PUNCT: DeprecatedGermanPunctuationSchemas.InflectionSurfaceSchema,
	SCONJ: DeprecatedGermanSubordinatingConjunctionSchemas.InflectionSurfaceSchema,
	SYM: DeprecatedGermanSymbolSchemas.InflectionSurfaceSchema,
	VERB: DeprecatedGermanVerbSchemas.InflectionSurfaceSchema,
	X: DeprecatedGermanOtherSchemas.InflectionSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Inflection"]["Lexeme"];

export const DeprecatedGermanLemmaLexemeSurfaceSchemas = {
	ADJ: DeprecatedGermanAdjectiveSchemas.LemmaSurfaceSchema,
	ADP: DeprecatedGermanAdpositionSchemas.LemmaSurfaceSchema,
	ADV: DeprecatedGermanAdverbSchemas.LemmaSurfaceSchema,
	AUX: DeprecatedGermanAuxiliarySchemas.LemmaSurfaceSchema,
	CCONJ: DeprecatedGermanCoordinatingConjunctionSchemas.LemmaSurfaceSchema,
	DET: DeprecatedGermanDeterminerSchemas.LemmaSurfaceSchema,
	INTJ: DeprecatedGermanInterjectionSchemas.LemmaSurfaceSchema,
	NOUN: DeprecatedGermanNounSchemas.LemmaSurfaceSchema,
	NUM: DeprecatedGermanNumeralSchemas.LemmaSurfaceSchema,
	PART: DeprecatedGermanParticleSchemas.LemmaSurfaceSchema,
	PRON: DeprecatedGermanPronounSchemas.LemmaSurfaceSchema,
	PROPN: DeprecatedGermanProperNounSchemas.LemmaSurfaceSchema,
	PUNCT: DeprecatedGermanPunctuationSchemas.LemmaSurfaceSchema,
	SCONJ: DeprecatedGermanSubordinatingConjunctionSchemas.LemmaSurfaceSchema,
	SYM: DeprecatedGermanSymbolSchemas.LemmaSurfaceSchema,
	VERB: DeprecatedGermanVerbSchemas.LemmaSurfaceSchema,
	X: DeprecatedGermanOtherSchemas.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Lexeme"];
