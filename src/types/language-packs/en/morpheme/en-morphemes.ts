import type { OrthographicStatus } from "../../../core/enums";
import type { EmptyFeatures, ValueOf } from "../shared";
import type {
    EnMorphemeLemma,
    EnMorphemeLemmaSelection,
    EnMorphemeLemmaSurface,
} from "./shared/build-en-morpheme-bundle";

export type EnCircumfixMorphemeLemma = EnMorphemeLemma<"Circumfix", EmptyFeatures>;
export type EnCliticMorphemeLemma = EnMorphemeLemma<"Clitic", EmptyFeatures>;
export type EnDuplifixMorphemeLemma = EnMorphemeLemma<"Duplifix", EmptyFeatures>;
export type EnInfixMorphemeLemma = EnMorphemeLemma<"Infix", EmptyFeatures>;
export type EnInterfixMorphemeLemma = EnMorphemeLemma<"Interfix", EmptyFeatures>;
export type EnPrefixMorphemeLemma = EnMorphemeLemma<"Prefix", EmptyFeatures>;
export type EnRootMorphemeLemma = EnMorphemeLemma<"Root", EmptyFeatures>;
export type EnSuffixMorphemeLemma = EnMorphemeLemma<"Suffix", EmptyFeatures>;
export type EnSuffixoidMorphemeLemma = EnMorphemeLemma<"Suffixoid", EmptyFeatures>;
export type EnToneMarkingMorphemeLemma = EnMorphemeLemma<"ToneMarking", EmptyFeatures>;
export type EnTransfixMorphemeLemma = EnMorphemeLemma<"Transfix", EmptyFeatures>;

export type EnMorphemeLemmaBySubKind = {
    Circumfix: EnCircumfixMorphemeLemma;
    Clitic: EnCliticMorphemeLemma;
    Duplifix: EnDuplifixMorphemeLemma;
    Infix: EnInfixMorphemeLemma;
    Interfix: EnInterfixMorphemeLemma;
    Prefix: EnPrefixMorphemeLemma;
    Root: EnRootMorphemeLemma;
    Suffix: EnSuffixMorphemeLemma;
    Suffixoid: EnSuffixoidMorphemeLemma;
    ToneMarking: EnToneMarkingMorphemeLemma;
    Transfix: EnTransfixMorphemeLemma;
};

export type EnMorphemeLemmaUnion = ValueOf<EnMorphemeLemmaBySubKind>;

export type EnMorphemeLemmaSurfaceBySubKind = {
    Circumfix: EnMorphemeLemmaSurface<"Circumfix", EmptyFeatures>;
    Clitic: EnMorphemeLemmaSurface<"Clitic", EmptyFeatures>;
    Duplifix: EnMorphemeLemmaSurface<"Duplifix", EmptyFeatures>;
    Infix: EnMorphemeLemmaSurface<"Infix", EmptyFeatures>;
    Interfix: EnMorphemeLemmaSurface<"Interfix", EmptyFeatures>;
    Prefix: EnMorphemeLemmaSurface<"Prefix", EmptyFeatures>;
    Root: EnMorphemeLemmaSurface<"Root", EmptyFeatures>;
    Suffix: EnMorphemeLemmaSurface<"Suffix", EmptyFeatures>;
    Suffixoid: EnMorphemeLemmaSurface<"Suffixoid", EmptyFeatures>;
    ToneMarking: EnMorphemeLemmaSurface<"ToneMarking", EmptyFeatures>;
    Transfix: EnMorphemeLemmaSurface<"Transfix", EmptyFeatures>;
};

export type EnMorphemeLemmaSurfaceUnion = ValueOf<EnMorphemeLemmaSurfaceBySubKind>;

export type EnMorphemeLemmaSelectionBySubKind<
    OS extends OrthographicStatus = OrthographicStatus,
> = {
    Circumfix: EnMorphemeLemmaSelection<"Circumfix", EmptyFeatures, OS>;
    Clitic: EnMorphemeLemmaSelection<"Clitic", EmptyFeatures, OS>;
    Duplifix: EnMorphemeLemmaSelection<"Duplifix", EmptyFeatures, OS>;
    Infix: EnMorphemeLemmaSelection<"Infix", EmptyFeatures, OS>;
    Interfix: EnMorphemeLemmaSelection<"Interfix", EmptyFeatures, OS>;
    Prefix: EnMorphemeLemmaSelection<"Prefix", EmptyFeatures, OS>;
    Root: EnMorphemeLemmaSelection<"Root", EmptyFeatures, OS>;
    Suffix: EnMorphemeLemmaSelection<"Suffix", EmptyFeatures, OS>;
    Suffixoid: EnMorphemeLemmaSelection<"Suffixoid", EmptyFeatures, OS>;
    ToneMarking: EnMorphemeLemmaSelection<"ToneMarking", EmptyFeatures, OS>;
    Transfix: EnMorphemeLemmaSelection<"Transfix", EmptyFeatures, OS>;
};

export type EnMorphemeLemmaSelectionUnion<
    OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<EnMorphemeLemmaSelectionBySubKind<OS>>;
