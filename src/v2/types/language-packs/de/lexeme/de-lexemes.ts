import type { OrthographicStatus } from "../../../core/enums";
import type { ValueOf } from "../shared";
import type {
	DeAdjectiveInflectionSelection,
	DeAdjectiveInflectionSurface,
	DeAdjectiveLemma,
	DeAdjectiveLemmaSelection,
	DeAdjectiveLemmaSurface,
} from "./pos/de-adjective";
import type {
	DeAdpositionLemma,
	DeAdpositionLemmaSelection,
	DeAdpositionLemmaSurface,
} from "./pos/de-adposition";
import type {
	DeAdverbInflectionSelection,
	DeAdverbInflectionSurface,
	DeAdverbLemma,
	DeAdverbLemmaSelection,
	DeAdverbLemmaSurface,
} from "./pos/de-adverb";
import type {
	DeAuxiliaryInflectionSelection,
	DeAuxiliaryInflectionSurface,
	DeAuxiliaryLemma,
	DeAuxiliaryLemmaSelection,
	DeAuxiliaryLemmaSurface,
} from "./pos/de-auxiliary";
import type {
	DeCoordinatingConjunctionLemma,
	DeCoordinatingConjunctionLemmaSelection,
	DeCoordinatingConjunctionLemmaSurface,
} from "./pos/de-coordinating-conjunction";
import type {
	DeDeterminerInflectionSelection,
	DeDeterminerInflectionSurface,
	DeDeterminerLemma,
	DeDeterminerLemmaSelection,
	DeDeterminerLemmaSurface,
} from "./pos/de-determiner";
import type {
	DeInterjectionLemma,
	DeInterjectionLemmaSelection,
	DeInterjectionLemmaSurface,
} from "./pos/de-interjection";
import type {
	DeNounInflectionSelection,
	DeNounInflectionSurface,
	DeNounLemma,
	DeNounLemmaSelection,
	DeNounLemmaSurface,
} from "./pos/de-noun";
import type {
	DeNumeralInflectionSelection,
	DeNumeralInflectionSurface,
	DeNumeralLemma,
	DeNumeralLemmaSelection,
	DeNumeralLemmaSurface,
} from "./pos/de-numeral";
import type {
	DeOtherInflectionSelection,
	DeOtherInflectionSurface,
	DeOtherLemma,
	DeOtherLemmaSelection,
	DeOtherLemmaSurface,
} from "./pos/de-other";
import type {
	DeParticleLemma,
	DeParticleLemmaSelection,
	DeParticleLemmaSurface,
} from "./pos/de-particle";
import type {
	DePronounInflectionSelection,
	DePronounInflectionSurface,
	DePronounLemma,
	DePronounLemmaSelection,
	DePronounLemmaSurface,
} from "./pos/de-pronoun";
import type {
	DeProperNounInflectionSelection,
	DeProperNounInflectionSurface,
	DeProperNounLemma,
	DeProperNounLemmaSelection,
	DeProperNounLemmaSurface,
} from "./pos/de-proper-noun";
import type {
	DePunctuationLemma,
	DePunctuationLemmaSelection,
	DePunctuationLemmaSurface,
} from "./pos/de-punctuation";
import type {
	DeSubordinatingConjunctionLemma,
	DeSubordinatingConjunctionLemmaSelection,
	DeSubordinatingConjunctionLemmaSurface,
} from "./pos/de-subordinating-conjunction";
import type {
	DeSymbolInflectionSelection,
	DeSymbolInflectionSurface,
	DeSymbolLemma,
	DeSymbolLemmaSelection,
	DeSymbolLemmaSurface,
} from "./pos/de-symbol";
import type {
	DeVerbInflectionSelection,
	DeVerbInflectionSurface,
	DeVerbLemma,
	DeVerbLemmaSelection,
	DeVerbLemmaSurface,
} from "./pos/de-verb";

export type DeLexemeLemmaBySubKind = {
	ADJ: DeAdjectiveLemma;
	ADP: DeAdpositionLemma;
	ADV: DeAdverbLemma;
	AUX: DeAuxiliaryLemma;
	CCONJ: DeCoordinatingConjunctionLemma;
	DET: DeDeterminerLemma;
	INTJ: DeInterjectionLemma;
	NOUN: DeNounLemma;
	NUM: DeNumeralLemma;
	PART: DeParticleLemma;
	PRON: DePronounLemma;
	PROPN: DeProperNounLemma;
	PUNCT: DePunctuationLemma;
	SCONJ: DeSubordinatingConjunctionLemma;
	SYM: DeSymbolLemma;
	VERB: DeVerbLemma;
	X: DeOtherLemma;
};

export type DeLexemeLemma = ValueOf<DeLexemeLemmaBySubKind>;

export type DeLemmaLexemeSurfaceBySubKind = {
	ADJ: DeAdjectiveLemmaSurface;
	ADP: DeAdpositionLemmaSurface;
	ADV: DeAdverbLemmaSurface;
	AUX: DeAuxiliaryLemmaSurface;
	CCONJ: DeCoordinatingConjunctionLemmaSurface;
	DET: DeDeterminerLemmaSurface;
	INTJ: DeInterjectionLemmaSurface;
	NOUN: DeNounLemmaSurface;
	NUM: DeNumeralLemmaSurface;
	PART: DeParticleLemmaSurface;
	PRON: DePronounLemmaSurface;
	PROPN: DeProperNounLemmaSurface;
	PUNCT: DePunctuationLemmaSurface;
	SCONJ: DeSubordinatingConjunctionLemmaSurface;
	SYM: DeSymbolLemmaSurface;
	VERB: DeVerbLemmaSurface;
	X: DeOtherLemmaSurface;
};

export type DeLemmaLexemeSurface = ValueOf<DeLemmaLexemeSurfaceBySubKind>;

export type DeInflectionLexemeSurfaceBySubKind = {
	ADJ: DeAdjectiveInflectionSurface;
	ADV: DeAdverbInflectionSurface;
	AUX: DeAuxiliaryInflectionSurface;
	DET: DeDeterminerInflectionSurface;
	NOUN: DeNounInflectionSurface;
	NUM: DeNumeralInflectionSurface;
	PRON: DePronounInflectionSurface;
	PROPN: DeProperNounInflectionSurface;
	SYM: DeSymbolInflectionSurface;
	VERB: DeVerbInflectionSurface;
	X: DeOtherInflectionSurface;
};

export type DeInflectableLexemeSubKind = keyof DeInflectionLexemeSurfaceBySubKind;
export type DeInflectionLexemeSurface = ValueOf<DeInflectionLexemeSurfaceBySubKind>;
export type DeLexemeSurface = DeLemmaLexemeSurface | DeInflectionLexemeSurface;

export type DeLemmaLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: DeAdjectiveLemmaSelection<OS>;
	ADP: DeAdpositionLemmaSelection<OS>;
	ADV: DeAdverbLemmaSelection<OS>;
	AUX: DeAuxiliaryLemmaSelection<OS>;
	CCONJ: DeCoordinatingConjunctionLemmaSelection<OS>;
	DET: DeDeterminerLemmaSelection<OS>;
	INTJ: DeInterjectionLemmaSelection<OS>;
	NOUN: DeNounLemmaSelection<OS>;
	NUM: DeNumeralLemmaSelection<OS>;
	PART: DeParticleLemmaSelection<OS>;
	PRON: DePronounLemmaSelection<OS>;
	PROPN: DeProperNounLemmaSelection<OS>;
	PUNCT: DePunctuationLemmaSelection<OS>;
	SCONJ: DeSubordinatingConjunctionLemmaSelection<OS>;
	SYM: DeSymbolLemmaSelection<OS>;
	VERB: DeVerbLemmaSelection<OS>;
	X: DeOtherLemmaSelection<OS>;
};

export type DeLemmaLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeLemmaLexemeSelectionBySubKind<OS>>;

export type DeInflectionLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: DeAdjectiveInflectionSelection<OS>;
	ADV: DeAdverbInflectionSelection<OS>;
	AUX: DeAuxiliaryInflectionSelection<OS>;
	DET: DeDeterminerInflectionSelection<OS>;
	NOUN: DeNounInflectionSelection<OS>;
	NUM: DeNumeralInflectionSelection<OS>;
	PRON: DePronounInflectionSelection<OS>;
	PROPN: DeProperNounInflectionSelection<OS>;
	SYM: DeSymbolInflectionSelection<OS>;
	VERB: DeVerbInflectionSelection<OS>;
	X: DeOtherInflectionSelection<OS>;
};

export type DeInflectionLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeInflectionLexemeSelectionBySubKind<OS>>;

export type DeLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLemmaLexemeSelection<OS> | DeInflectionLexemeSelection<OS>;
