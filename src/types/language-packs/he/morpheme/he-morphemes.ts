import type { OrthographicStatus } from "../../../core/enums";
import type { EmptyFeatures, ValueOf } from "../shared";
import type {
	HeMorphemeLemma,
	HeMorphemeLemmaSelection,
	HeMorphemeLemmaSurface,
} from "./shared/build-he-morpheme-bundle";

export type HeCircumfixMorphemeLemma = HeMorphemeLemma<
	"Circumfix",
	EmptyFeatures
>;
export type HeCliticMorphemeLemma = HeMorphemeLemma<"Clitic", EmptyFeatures>;
export type HeDuplifixMorphemeLemma = HeMorphemeLemma<"Duplifix", EmptyFeatures>;
export type HeInfixMorphemeLemma = HeMorphemeLemma<"Infix", EmptyFeatures>;
export type HeInterfixMorphemeLemma = HeMorphemeLemma<"Interfix", EmptyFeatures>;
export type HePrefixMorphemeLemma = HeMorphemeLemma<"Prefix", EmptyFeatures>;
export type HeRootMorphemeLemma = HeMorphemeLemma<"Root", EmptyFeatures>;
export type HeSuffixMorphemeLemma = HeMorphemeLemma<"Suffix", EmptyFeatures>;
export type HeSuffixoidMorphemeLemma = HeMorphemeLemma<
	"Suffixoid",
	EmptyFeatures
>;
export type HeToneMarkingMorphemeLemma = HeMorphemeLemma<
	"ToneMarking",
	EmptyFeatures
>;
export type HeTransfixMorphemeLemma = HeMorphemeLemma<"Transfix", EmptyFeatures>;

export type HeMorphemeLemmaBySubKind = {
	Circumfix: HeCircumfixMorphemeLemma;
	Clitic: HeCliticMorphemeLemma;
	Duplifix: HeDuplifixMorphemeLemma;
	Infix: HeInfixMorphemeLemma;
	Interfix: HeInterfixMorphemeLemma;
	Prefix: HePrefixMorphemeLemma;
	Root: HeRootMorphemeLemma;
	Suffix: HeSuffixMorphemeLemma;
	Suffixoid: HeSuffixoidMorphemeLemma;
	ToneMarking: HeToneMarkingMorphemeLemma;
	Transfix: HeTransfixMorphemeLemma;
};

export type HeMorphemeLemmaUnion = ValueOf<HeMorphemeLemmaBySubKind>;

export type HeMorphemeLemmaSurfaceBySubKind = {
	Circumfix: HeMorphemeLemmaSurface<"Circumfix", EmptyFeatures>;
	Clitic: HeMorphemeLemmaSurface<"Clitic", EmptyFeatures>;
	Duplifix: HeMorphemeLemmaSurface<"Duplifix", EmptyFeatures>;
	Infix: HeMorphemeLemmaSurface<"Infix", EmptyFeatures>;
	Interfix: HeMorphemeLemmaSurface<"Interfix", EmptyFeatures>;
	Prefix: HeMorphemeLemmaSurface<"Prefix", EmptyFeatures>;
	Root: HeMorphemeLemmaSurface<"Root", EmptyFeatures>;
	Suffix: HeMorphemeLemmaSurface<"Suffix", EmptyFeatures>;
	Suffixoid: HeMorphemeLemmaSurface<"Suffixoid", EmptyFeatures>;
	ToneMarking: HeMorphemeLemmaSurface<"ToneMarking", EmptyFeatures>;
	Transfix: HeMorphemeLemmaSurface<"Transfix", EmptyFeatures>;
};

export type HeMorphemeLemmaSurfaceUnion =
	ValueOf<HeMorphemeLemmaSurfaceBySubKind>;

export type HeMorphemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Circumfix: HeMorphemeLemmaSelection<"Circumfix", EmptyFeatures, OS>;
	Clitic: HeMorphemeLemmaSelection<"Clitic", EmptyFeatures, OS>;
	Duplifix: HeMorphemeLemmaSelection<"Duplifix", EmptyFeatures, OS>;
	Infix: HeMorphemeLemmaSelection<"Infix", EmptyFeatures, OS>;
	Interfix: HeMorphemeLemmaSelection<"Interfix", EmptyFeatures, OS>;
	Prefix: HeMorphemeLemmaSelection<"Prefix", EmptyFeatures, OS>;
	Root: HeMorphemeLemmaSelection<"Root", EmptyFeatures, OS>;
	Suffix: HeMorphemeLemmaSelection<"Suffix", EmptyFeatures, OS>;
	Suffixoid: HeMorphemeLemmaSelection<"Suffixoid", EmptyFeatures, OS>;
	ToneMarking: HeMorphemeLemmaSelection<"ToneMarking", EmptyFeatures, OS>;
	Transfix: HeMorphemeLemmaSelection<"Transfix", EmptyFeatures, OS>;
};

export type HeMorphemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HeMorphemeLemmaSelectionBySubKind<OS>>;
