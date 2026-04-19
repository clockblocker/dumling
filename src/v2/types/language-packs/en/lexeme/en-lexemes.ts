import type { OrthographicStatus } from "../../../core/enums";
import type { ValueOf } from "../shared";
import type {
    EnAdjectiveInflectionSelection,
    EnAdjectiveInflectionSurface,
    EnAdjectiveLemma,
    EnAdjectiveLemmaSelection,
    EnAdjectiveLemmaSurface,
} from "./pos/en-adjective";
import type {
    EnAdpositionLemma,
    EnAdpositionLemmaSelection,
    EnAdpositionLemmaSurface,
} from "./pos/en-adposition";
import type {
    EnAdverbInflectionSelection,
    EnAdverbInflectionSurface,
    EnAdverbLemma,
    EnAdverbLemmaSelection,
    EnAdverbLemmaSurface,
} from "./pos/en-adverb";
import type {
    EnAuxiliaryInflectionSelection,
    EnAuxiliaryInflectionSurface,
    EnAuxiliaryLemma,
    EnAuxiliaryLemmaSelection,
    EnAuxiliaryLemmaSurface,
} from "./pos/en-auxiliary";
import type {
    EnCoordinatingConjunctionLemma,
    EnCoordinatingConjunctionLemmaSelection,
    EnCoordinatingConjunctionLemmaSurface,
} from "./pos/en-coordinating-conjunction";
import type {
    EnDeterminerInflectionSelection,
    EnDeterminerInflectionSurface,
    EnDeterminerLemma,
    EnDeterminerLemmaSelection,
    EnDeterminerLemmaSurface,
} from "./pos/en-determiner";
import type {
    EnInterjectionLemma,
    EnInterjectionLemmaSelection,
    EnInterjectionLemmaSurface,
} from "./pos/en-interjection";
import type {
    EnNounInflectionSelection,
    EnNounInflectionSurface,
    EnNounLemma,
    EnNounLemmaSelection,
    EnNounLemmaSurface,
} from "./pos/en-noun";
import type {
    EnNumeralLemma,
    EnNumeralLemmaSelection,
    EnNumeralLemmaSurface,
} from "./pos/en-numeral";
import type {
    EnOtherLemma,
    EnOtherLemmaSelection,
    EnOtherLemmaSurface,
} from "./pos/en-other";
import type {
    EnParticleLemma,
    EnParticleLemmaSelection,
    EnParticleLemmaSurface,
} from "./pos/en-particle";
import type {
    EnPronounInflectionSelection,
    EnPronounInflectionSurface,
    EnPronounLemma,
    EnPronounLemmaSelection,
    EnPronounLemmaSurface,
} from "./pos/en-pronoun";
import type {
    EnProperNounInflectionSelection,
    EnProperNounInflectionSurface,
    EnProperNounLemma,
    EnProperNounLemmaSelection,
    EnProperNounLemmaSurface,
} from "./pos/en-proper-noun";
import type {
    EnPunctuationLemma,
    EnPunctuationLemmaSelection,
    EnPunctuationLemmaSurface,
} from "./pos/en-punctuation";
import type {
    EnSubordinatingConjunctionLemma,
    EnSubordinatingConjunctionLemmaSelection,
    EnSubordinatingConjunctionLemmaSurface,
} from "./pos/en-subordinating-conjunction";
import type {
    EnSymbolInflectionSelection,
    EnSymbolInflectionSurface,
    EnSymbolLemma,
    EnSymbolLemmaSelection,
    EnSymbolLemmaSurface,
} from "./pos/en-symbol";
import type {
    EnVerbInflectionSelection,
    EnVerbInflectionSurface,
    EnVerbLemma,
    EnVerbLemmaSelection,
    EnVerbLemmaSurface,
} from "./pos/en-verb";

export type EnLexemeLemmaBySubKind = {
    ADJ: EnAdjectiveLemma;
    ADP: EnAdpositionLemma;
    ADV: EnAdverbLemma;
    AUX: EnAuxiliaryLemma;
    CCONJ: EnCoordinatingConjunctionLemma;
    DET: EnDeterminerLemma;
    INTJ: EnInterjectionLemma;
    NOUN: EnNounLemma;
    NUM: EnNumeralLemma;
    PART: EnParticleLemma;
    PRON: EnPronounLemma;
    PROPN: EnProperNounLemma;
    PUNCT: EnPunctuationLemma;
    SCONJ: EnSubordinatingConjunctionLemma;
    SYM: EnSymbolLemma;
    VERB: EnVerbLemma;
    X: EnOtherLemma;
};

export type EnLexemeLemma = ValueOf<EnLexemeLemmaBySubKind>;

export type EnLemmaLexemeSurfaceBySubKind = {
    ADJ: EnAdjectiveLemmaSurface;
    ADP: EnAdpositionLemmaSurface;
    ADV: EnAdverbLemmaSurface;
    AUX: EnAuxiliaryLemmaSurface;
    CCONJ: EnCoordinatingConjunctionLemmaSurface;
    DET: EnDeterminerLemmaSurface;
    INTJ: EnInterjectionLemmaSurface;
    NOUN: EnNounLemmaSurface;
    NUM: EnNumeralLemmaSurface;
    PART: EnParticleLemmaSurface;
    PRON: EnPronounLemmaSurface;
    PROPN: EnProperNounLemmaSurface;
    PUNCT: EnPunctuationLemmaSurface;
    SCONJ: EnSubordinatingConjunctionLemmaSurface;
    SYM: EnSymbolLemmaSurface;
    VERB: EnVerbLemmaSurface;
    X: EnOtherLemmaSurface;
};

export type EnLemmaLexemeSurface = ValueOf<EnLemmaLexemeSurfaceBySubKind>;

export type EnInflectionLexemeSurfaceBySubKind = {
    ADJ: EnAdjectiveInflectionSurface;
    ADV: EnAdverbInflectionSurface;
    AUX: EnAuxiliaryInflectionSurface;
    DET: EnDeterminerInflectionSurface;
    NOUN: EnNounInflectionSurface;
    PRON: EnPronounInflectionSurface;
    PROPN: EnProperNounInflectionSurface;
    SYM: EnSymbolInflectionSurface;
    VERB: EnVerbInflectionSurface;
};

export type EnInflectableLexemeSubKind = keyof EnInflectionLexemeSurfaceBySubKind;
export type EnInflectionLexemeSurface = ValueOf<EnInflectionLexemeSurfaceBySubKind>;
export type EnLexemeSurface = EnLemmaLexemeSurface | EnInflectionLexemeSurface;

export type EnLemmaLexemeSelectionBySubKind<
    OS extends OrthographicStatus = OrthographicStatus,
> = {
    ADJ: EnAdjectiveLemmaSelection<OS>;
    ADP: EnAdpositionLemmaSelection<OS>;
    ADV: EnAdverbLemmaSelection<OS>;
    AUX: EnAuxiliaryLemmaSelection<OS>;
    CCONJ: EnCoordinatingConjunctionLemmaSelection<OS>;
    DET: EnDeterminerLemmaSelection<OS>;
    INTJ: EnInterjectionLemmaSelection<OS>;
    NOUN: EnNounLemmaSelection<OS>;
    NUM: EnNumeralLemmaSelection<OS>;
    PART: EnParticleLemmaSelection<OS>;
    PRON: EnPronounLemmaSelection<OS>;
    PROPN: EnProperNounLemmaSelection<OS>;
    PUNCT: EnPunctuationLemmaSelection<OS>;
    SCONJ: EnSubordinatingConjunctionLemmaSelection<OS>;
    SYM: EnSymbolLemmaSelection<OS>;
    VERB: EnVerbLemmaSelection<OS>;
    X: EnOtherLemmaSelection<OS>;
};

export type EnLemmaLexemeSelection<
    OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnLemmaLexemeSelectionBySubKind<OS>>;

export type EnInflectionLexemeSelectionBySubKind<
    OS extends OrthographicStatus = OrthographicStatus,
> = {
    ADJ: EnAdjectiveInflectionSelection<OS>;
    ADV: EnAdverbInflectionSelection<OS>;
    AUX: EnAuxiliaryInflectionSelection<OS>;
    DET: EnDeterminerInflectionSelection<OS>;
    NOUN: EnNounInflectionSelection<OS>;
    PRON: EnPronounInflectionSelection<OS>;
    PROPN: EnProperNounInflectionSelection<OS>;
    SYM: EnSymbolInflectionSelection<OS>;
    VERB: EnVerbInflectionSelection<OS>;
};

export type EnInflectionLexemeSelection<
    OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnInflectionLexemeSelectionBySubKind<OS>>;

export type EnLexemeSelection<
    OS extends OrthographicStatus = OrthographicStatus,
> = EnLemmaLexemeSelection<OS> | EnInflectionLexemeSelection<OS>;
