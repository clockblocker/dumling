import type { OrthographicStatus } from "../../../core/enums";
import type { ValueOf } from "../shared";
import type { EnAdjectiveBundle } from "./pos/en-adjective";
import type { EnAdpositionBundle } from "./pos/en-adposition";
import type { EnAdverbBundle } from "./pos/en-adverb";
import type { EnAuxiliaryBundle } from "./pos/en-auxiliary";
import type { EnCoordinatingConjunctionBundle } from "./pos/en-coordinating-conjunction";
import type { EnDeterminerBundle } from "./pos/en-determiner";
import type { EnInterjectionBundle } from "./pos/en-interjection";
import type { EnNounBundle } from "./pos/en-noun";
import type { EnNumeralBundle } from "./pos/en-numeral";
import type { EnOtherBundle } from "./pos/en-other";
import type { EnParticleBundle } from "./pos/en-particle";
import type { EnPronounBundle } from "./pos/en-pronoun";
import type { EnProperNounBundle } from "./pos/en-proper-noun";
import type { EnPunctuationBundle } from "./pos/en-punctuation";
import type { EnSubordinatingConjunctionBundle } from "./pos/en-subordinating-conjunction";
import type { EnSymbolBundle } from "./pos/en-symbol";
import type { EnVerbBundle } from "./pos/en-verb";

export type EnLexemeLemmaBySubKind = {
	ADJ: EnAdjectiveBundle["Lemma"];
	ADP: EnAdpositionBundle["Lemma"];
	ADV: EnAdverbBundle["Lemma"];
	AUX: EnAuxiliaryBundle["Lemma"];
	CCONJ: EnCoordinatingConjunctionBundle["Lemma"];
	DET: EnDeterminerBundle["Lemma"];
	INTJ: EnInterjectionBundle["Lemma"];
	NOUN: EnNounBundle["Lemma"];
	NUM: EnNumeralBundle["Lemma"];
	PART: EnParticleBundle["Lemma"];
	PRON: EnPronounBundle["Lemma"];
	PROPN: EnProperNounBundle["Lemma"];
	PUNCT: EnPunctuationBundle["Lemma"];
	SCONJ: EnSubordinatingConjunctionBundle["Lemma"];
	SYM: EnSymbolBundle["Lemma"];
	VERB: EnVerbBundle["Lemma"];
	X: EnOtherBundle["Lemma"];
};

export type EnLexemeLemma = ValueOf<EnLexemeLemmaBySubKind>;

export type EnLemmaLexemeSurfaceBySubKind = {
	ADJ: EnAdjectiveBundle["LemmaSurface"];
	ADP: EnAdpositionBundle["LemmaSurface"];
	ADV: EnAdverbBundle["LemmaSurface"];
	AUX: EnAuxiliaryBundle["LemmaSurface"];
	CCONJ: EnCoordinatingConjunctionBundle["LemmaSurface"];
	DET: EnDeterminerBundle["LemmaSurface"];
	INTJ: EnInterjectionBundle["LemmaSurface"];
	NOUN: EnNounBundle["LemmaSurface"];
	NUM: EnNumeralBundle["LemmaSurface"];
	PART: EnParticleBundle["LemmaSurface"];
	PRON: EnPronounBundle["LemmaSurface"];
	PROPN: EnProperNounBundle["LemmaSurface"];
	PUNCT: EnPunctuationBundle["LemmaSurface"];
	SCONJ: EnSubordinatingConjunctionBundle["LemmaSurface"];
	SYM: EnSymbolBundle["LemmaSurface"];
	VERB: EnVerbBundle["LemmaSurface"];
	X: EnOtherBundle["LemmaSurface"];
};

export type EnLemmaLexemeSurface = ValueOf<EnLemmaLexemeSurfaceBySubKind>;

export type EnInflectionLexemeSurfaceBySubKind = {
	ADJ: EnAdjectiveBundle["InflectionSurface"];
	ADV: EnAdverbBundle["InflectionSurface"];
	AUX: EnAuxiliaryBundle["InflectionSurface"];
	DET: EnDeterminerBundle["InflectionSurface"];
	NOUN: EnNounBundle["InflectionSurface"];
	PRON: EnPronounBundle["InflectionSurface"];
	PROPN: EnProperNounBundle["InflectionSurface"];
	SYM: EnSymbolBundle["InflectionSurface"];
	VERB: EnVerbBundle["InflectionSurface"];
};

export type EnInflectableLexemeSubKind =
	keyof EnInflectionLexemeSurfaceBySubKind;
export type EnInflectionLexemeSurface =
	ValueOf<EnInflectionLexemeSurfaceBySubKind>;
export type EnLexemeSurface = EnLemmaLexemeSurface | EnInflectionLexemeSurface;

export type EnLemmaLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: EnAdjectiveBundle<OS>["LemmaSelection"];
	ADP: EnAdpositionBundle<OS>["LemmaSelection"];
	ADV: EnAdverbBundle<OS>["LemmaSelection"];
	AUX: EnAuxiliaryBundle<OS>["LemmaSelection"];
	CCONJ: EnCoordinatingConjunctionBundle<OS>["LemmaSelection"];
	DET: EnDeterminerBundle<OS>["LemmaSelection"];
	INTJ: EnInterjectionBundle<OS>["LemmaSelection"];
	NOUN: EnNounBundle<OS>["LemmaSelection"];
	NUM: EnNumeralBundle<OS>["LemmaSelection"];
	PART: EnParticleBundle<OS>["LemmaSelection"];
	PRON: EnPronounBundle<OS>["LemmaSelection"];
	PROPN: EnProperNounBundle<OS>["LemmaSelection"];
	PUNCT: EnPunctuationBundle<OS>["LemmaSelection"];
	SCONJ: EnSubordinatingConjunctionBundle<OS>["LemmaSelection"];
	SYM: EnSymbolBundle<OS>["LemmaSelection"];
	VERB: EnVerbBundle<OS>["LemmaSelection"];
	X: EnOtherBundle<OS>["LemmaSelection"];
};

export type EnLemmaLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnLemmaLexemeSelectionBySubKind<OS>>;

export type EnInflectionLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: EnAdjectiveBundle<OS>["InflectionSelection"];
	ADV: EnAdverbBundle<OS>["InflectionSelection"];
	AUX: EnAuxiliaryBundle<OS>["InflectionSelection"];
	DET: EnDeterminerBundle<OS>["InflectionSelection"];
	NOUN: EnNounBundle<OS>["InflectionSelection"];
	PRON: EnPronounBundle<OS>["InflectionSelection"];
	PROPN: EnProperNounBundle<OS>["InflectionSelection"];
	SYM: EnSymbolBundle<OS>["InflectionSelection"];
	VERB: EnVerbBundle<OS>["InflectionSelection"];
};

export type EnInflectionLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnInflectionLexemeSelectionBySubKind<OS>>;

export type EnLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnLemmaLexemeSelection<OS> | EnInflectionLexemeSelection<OS>;
