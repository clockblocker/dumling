import type {
	LemmaSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { GermanAdjectiveSchemas } from "./pos/german-adjective";
import { GermanAdpositionSchemas } from "./pos/german-adposition";
import { GermanAdverbSchemas } from "./pos/german-adverb";
import { GermanAuxiliarySchemas } from "./pos/german-auxiliary";
import { GermanCoordinatingConjunctionSchemas } from "./pos/german-coordinating-conjunction";
import { GermanDeterminerSchemas } from "./pos/german-determiner";
import { GermanInterjectionSchemas } from "./pos/german-interjection";
import { GermanNounSchemas } from "./pos/german-noun";
import { GermanNumeralSchemas } from "./pos/german-numeral";
import { GermanOtherSchemas } from "./pos/german-other";
import { GermanParticleSchemas } from "./pos/german-particle";
import { GermanPronounSchemas } from "./pos/german-pronoun";
import { GermanProperNounSchemas } from "./pos/german-proper-noun";
import { GermanPunctuationSchemas } from "./pos/german-punctuation";
import { GermanSubordinatingConjunctionSchemas } from "./pos/german-subordinating-conjunction";
import { GermanSymbolSchemas } from "./pos/german-symbol";
import { GermanVerbSchemas } from "./pos/german-verb";

export const GermanLexemeLemmaSchemas = {
	ADJ: GermanAdjectiveSchemas.LemmaSchema,
	ADP: GermanAdpositionSchemas.LemmaSchema,
	ADV: GermanAdverbSchemas.LemmaSchema,
	AUX: GermanAuxiliarySchemas.LemmaSchema,
	CCONJ: GermanCoordinatingConjunctionSchemas.LemmaSchema,
	DET: GermanDeterminerSchemas.LemmaSchema,
	INTJ: GermanInterjectionSchemas.LemmaSchema,
	NOUN: GermanNounSchemas.LemmaSchema,
	NUM: GermanNumeralSchemas.LemmaSchema,
	PART: GermanParticleSchemas.LemmaSchema,
	PRON: GermanPronounSchemas.LemmaSchema,
	PROPN: GermanProperNounSchemas.LemmaSchema,
	PUNCT: GermanPunctuationSchemas.LemmaSchema,
	SCONJ: GermanSubordinatingConjunctionSchemas.LemmaSchema,
	SYM: GermanSymbolSchemas.LemmaSchema,
	VERB: GermanVerbSchemas.LemmaSchema,
	X: GermanOtherSchemas.LemmaSchema,
} satisfies LemmaSchemaLanguageShape["Lexeme"];

export const GermanInflectionLexemeSurfaceSchemas = {
	ADJ: GermanAdjectiveSchemas.InflectionSurfaceSchema,
	ADP: GermanAdpositionSchemas.InflectionSurfaceSchema,
	ADV: GermanAdverbSchemas.InflectionSurfaceSchema,
	AUX: GermanAuxiliarySchemas.InflectionSurfaceSchema,
	CCONJ: GermanCoordinatingConjunctionSchemas.InflectionSurfaceSchema,
	DET: GermanDeterminerSchemas.InflectionSurfaceSchema,
	INTJ: GermanInterjectionSchemas.InflectionSurfaceSchema,
	NOUN: GermanNounSchemas.InflectionSurfaceSchema,
	NUM: GermanNumeralSchemas.InflectionSurfaceSchema,
	PART: GermanParticleSchemas.InflectionSurfaceSchema,
	PRON: GermanPronounSchemas.InflectionSurfaceSchema,
	PROPN: GermanProperNounSchemas.InflectionSurfaceSchema,
	PUNCT: GermanPunctuationSchemas.InflectionSurfaceSchema,
	SCONJ: GermanSubordinatingConjunctionSchemas.InflectionSurfaceSchema,
	SYM: GermanSymbolSchemas.InflectionSurfaceSchema,
	VERB: GermanVerbSchemas.InflectionSurfaceSchema,
	X: GermanOtherSchemas.InflectionSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Inflection"]["Lexeme"];

export const GermanLemmaLexemeSurfaceSchemas = {
	ADJ: GermanAdjectiveSchemas.LemmaSurfaceSchema,
	ADP: GermanAdpositionSchemas.LemmaSurfaceSchema,
	ADV: GermanAdverbSchemas.LemmaSurfaceSchema,
	AUX: GermanAuxiliarySchemas.LemmaSurfaceSchema,
	CCONJ: GermanCoordinatingConjunctionSchemas.LemmaSurfaceSchema,
	DET: GermanDeterminerSchemas.LemmaSurfaceSchema,
	INTJ: GermanInterjectionSchemas.LemmaSurfaceSchema,
	NOUN: GermanNounSchemas.LemmaSurfaceSchema,
	NUM: GermanNumeralSchemas.LemmaSurfaceSchema,
	PART: GermanParticleSchemas.LemmaSurfaceSchema,
	PRON: GermanPronounSchemas.LemmaSurfaceSchema,
	PROPN: GermanProperNounSchemas.LemmaSurfaceSchema,
	PUNCT: GermanPunctuationSchemas.LemmaSurfaceSchema,
	SCONJ: GermanSubordinatingConjunctionSchemas.LemmaSurfaceSchema,
	SYM: GermanSymbolSchemas.LemmaSurfaceSchema,
	VERB: GermanVerbSchemas.LemmaSurfaceSchema,
	X: GermanOtherSchemas.LemmaSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Lexeme"];
