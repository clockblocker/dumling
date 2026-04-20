import type { OrthographicStatus } from "../../../core/enums";
import type { ValueOf } from "../shared";
import type { DeAdjectiveBundle } from "./pos/de-adjective";
import type { DeAdpositionBundle } from "./pos/de-adposition";
import type { DeAdverbBundle } from "./pos/de-adverb";
import type { DeAuxiliaryBundle } from "./pos/de-auxiliary";
import type { DeCoordinatingConjunctionBundle } from "./pos/de-coordinating-conjunction";
import type { DeDeterminerBundle } from "./pos/de-determiner";
import type { DeInterjectionBundle } from "./pos/de-interjection";
import type { DeNounBundle } from "./pos/de-noun";
import type { DeNumeralBundle } from "./pos/de-numeral";
import type { DeOtherBundle } from "./pos/de-other";
import type { DeParticleBundle } from "./pos/de-particle";
import type { DePronounBundle } from "./pos/de-pronoun";
import type { DeProperNounBundle } from "./pos/de-proper-noun";
import type { DePunctuationBundle } from "./pos/de-punctuation";
import type { DeSubordinatingConjunctionBundle } from "./pos/de-subordinating-conjunction";
import type { DeSymbolBundle } from "./pos/de-symbol";
import type { DeVerbBundle } from "./pos/de-verb";

export type DeLexemeLemmaBySubKind = {
	ADJ: DeAdjectiveBundle["Lemma"];
	ADP: DeAdpositionBundle["Lemma"];
	ADV: DeAdverbBundle["Lemma"];
	AUX: DeAuxiliaryBundle["Lemma"];
	CCONJ: DeCoordinatingConjunctionBundle["Lemma"];
	DET: DeDeterminerBundle["Lemma"];
	INTJ: DeInterjectionBundle["Lemma"];
	NOUN: DeNounBundle["Lemma"];
	NUM: DeNumeralBundle["Lemma"];
	PART: DeParticleBundle["Lemma"];
	PRON: DePronounBundle["Lemma"];
	PROPN: DeProperNounBundle["Lemma"];
	PUNCT: DePunctuationBundle["Lemma"];
	SCONJ: DeSubordinatingConjunctionBundle["Lemma"];
	SYM: DeSymbolBundle["Lemma"];
	VERB: DeVerbBundle["Lemma"];
	X: DeOtherBundle["Lemma"];
};

export type DeLexemeLemma = ValueOf<DeLexemeLemmaBySubKind>;

export type DeLemmaLexemeSurfaceBySubKind = {
	ADJ: DeAdjectiveBundle["LemmaSurface"];
	ADP: DeAdpositionBundle["LemmaSurface"];
	ADV: DeAdverbBundle["LemmaSurface"];
	AUX: DeAuxiliaryBundle["LemmaSurface"];
	CCONJ: DeCoordinatingConjunctionBundle["LemmaSurface"];
	DET: DeDeterminerBundle["LemmaSurface"];
	INTJ: DeInterjectionBundle["LemmaSurface"];
	NOUN: DeNounBundle["LemmaSurface"];
	NUM: DeNumeralBundle["LemmaSurface"];
	PART: DeParticleBundle["LemmaSurface"];
	PRON: DePronounBundle["LemmaSurface"];
	PROPN: DeProperNounBundle["LemmaSurface"];
	PUNCT: DePunctuationBundle["LemmaSurface"];
	SCONJ: DeSubordinatingConjunctionBundle["LemmaSurface"];
	SYM: DeSymbolBundle["LemmaSurface"];
	VERB: DeVerbBundle["LemmaSurface"];
	X: DeOtherBundle["LemmaSurface"];
};

export type DeLemmaLexemeSurface = ValueOf<DeLemmaLexemeSurfaceBySubKind>;

export type DeInflectionLexemeSurfaceBySubKind = {
	ADJ: DeAdjectiveBundle["InflectionSurface"];
	ADV: DeAdverbBundle["InflectionSurface"];
	AUX: DeAuxiliaryBundle["InflectionSurface"];
	DET: DeDeterminerBundle["InflectionSurface"];
	NOUN: DeNounBundle["InflectionSurface"];
	NUM: DeNumeralBundle["InflectionSurface"];
	PRON: DePronounBundle["InflectionSurface"];
	PROPN: DeProperNounBundle["InflectionSurface"];
	SYM: DeSymbolBundle["InflectionSurface"];
	VERB: DeVerbBundle["InflectionSurface"];
	X: DeOtherBundle["InflectionSurface"];
};

export type DeInflectableLexemeSubKind =
	keyof DeInflectionLexemeSurfaceBySubKind;
export type DeInflectionLexemeSurface =
	ValueOf<DeInflectionLexemeSurfaceBySubKind>;
export type DeLexemeSurface = DeLemmaLexemeSurface | DeInflectionLexemeSurface;

export type DeLemmaLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: DeAdjectiveBundle<OS>["LemmaSelection"];
	ADP: DeAdpositionBundle<OS>["LemmaSelection"];
	ADV: DeAdverbBundle<OS>["LemmaSelection"];
	AUX: DeAuxiliaryBundle<OS>["LemmaSelection"];
	CCONJ: DeCoordinatingConjunctionBundle<OS>["LemmaSelection"];
	DET: DeDeterminerBundle<OS>["LemmaSelection"];
	INTJ: DeInterjectionBundle<OS>["LemmaSelection"];
	NOUN: DeNounBundle<OS>["LemmaSelection"];
	NUM: DeNumeralBundle<OS>["LemmaSelection"];
	PART: DeParticleBundle<OS>["LemmaSelection"];
	PRON: DePronounBundle<OS>["LemmaSelection"];
	PROPN: DeProperNounBundle<OS>["LemmaSelection"];
	PUNCT: DePunctuationBundle<OS>["LemmaSelection"];
	SCONJ: DeSubordinatingConjunctionBundle<OS>["LemmaSelection"];
	SYM: DeSymbolBundle<OS>["LemmaSelection"];
	VERB: DeVerbBundle<OS>["LemmaSelection"];
	X: DeOtherBundle<OS>["LemmaSelection"];
};

export type DeLemmaLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeLemmaLexemeSelectionBySubKind<OS>>;

export type DeInflectionLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: DeAdjectiveBundle<OS>["InflectionSelection"];
	ADV: DeAdverbBundle<OS>["InflectionSelection"];
	AUX: DeAuxiliaryBundle<OS>["InflectionSelection"];
	DET: DeDeterminerBundle<OS>["InflectionSelection"];
	NOUN: DeNounBundle<OS>["InflectionSelection"];
	NUM: DeNumeralBundle<OS>["InflectionSelection"];
	PRON: DePronounBundle<OS>["InflectionSelection"];
	PROPN: DeProperNounBundle<OS>["InflectionSelection"];
	SYM: DeSymbolBundle<OS>["InflectionSelection"];
	VERB: DeVerbBundle<OS>["InflectionSelection"];
	X: DeOtherBundle<OS>["InflectionSelection"];
};

export type DeInflectionLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeInflectionLexemeSelectionBySubKind<OS>>;

export type DeLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLemmaLexemeSelection<OS> | DeInflectionLexemeSelection<OS>;
