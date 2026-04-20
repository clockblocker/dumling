import type { AbstractFeatureValue } from "../../../abstract/features/features";
import type { OrthographicStatus } from "../../../core/enums";
import type { EmptyFeatures, ValueOf } from "../shared";
import type {
	DeMorphemeLemma,
	DeMorphemeLemmaSelection,
	DeMorphemeLemmaSurface,
} from "./shared/build-de-morpheme-bundle";

export type DePrefixMorphemeInherentFeatures = {
	hasSepPrefix?: AbstractFeatureValue<"hasSepPrefix">;
};

export type DeCircumfixMorphemeLemma = DeMorphemeLemma<"Circumfix", EmptyFeatures>;
export type DeCliticMorphemeLemma = DeMorphemeLemma<"Clitic", EmptyFeatures>;
export type DeDuplifixMorphemeLemma = DeMorphemeLemma<"Duplifix", EmptyFeatures>;
export type DeInfixMorphemeLemma = DeMorphemeLemma<"Infix", EmptyFeatures>;
export type DeInterfixMorphemeLemma = DeMorphemeLemma<"Interfix", EmptyFeatures>;
export type DePrefixMorphemeLemma = DeMorphemeLemma<
	"Prefix",
	DePrefixMorphemeInherentFeatures
>;
export type DeRootMorphemeLemma = DeMorphemeLemma<"Root", EmptyFeatures>;
export type DeSuffixMorphemeLemma = DeMorphemeLemma<"Suffix", EmptyFeatures>;
export type DeSuffixoidMorphemeLemma = DeMorphemeLemma<"Suffixoid", EmptyFeatures>;
export type DeToneMarkingMorphemeLemma = DeMorphemeLemma<
	"ToneMarking",
	EmptyFeatures
>;
export type DeTransfixMorphemeLemma = DeMorphemeLemma<"Transfix", EmptyFeatures>;

export type DeMorphemeLemmaBySubKind = {
	Circumfix: DeCircumfixMorphemeLemma;
	Clitic: DeCliticMorphemeLemma;
	Duplifix: DeDuplifixMorphemeLemma;
	Infix: DeInfixMorphemeLemma;
	Interfix: DeInterfixMorphemeLemma;
	Prefix: DePrefixMorphemeLemma;
	Root: DeRootMorphemeLemma;
	Suffix: DeSuffixMorphemeLemma;
	Suffixoid: DeSuffixoidMorphemeLemma;
	ToneMarking: DeToneMarkingMorphemeLemma;
	Transfix: DeTransfixMorphemeLemma;
};

export type DeMorphemeLemmaUnion = ValueOf<DeMorphemeLemmaBySubKind>;

export type DeMorphemeLemmaSurfaceBySubKind = {
	Circumfix: DeMorphemeLemmaSurface<"Circumfix", EmptyFeatures>;
	Clitic: DeMorphemeLemmaSurface<"Clitic", EmptyFeatures>;
	Duplifix: DeMorphemeLemmaSurface<"Duplifix", EmptyFeatures>;
	Infix: DeMorphemeLemmaSurface<"Infix", EmptyFeatures>;
	Interfix: DeMorphemeLemmaSurface<"Interfix", EmptyFeatures>;
	Prefix: DeMorphemeLemmaSurface<"Prefix", DePrefixMorphemeInherentFeatures>;
	Root: DeMorphemeLemmaSurface<"Root", EmptyFeatures>;
	Suffix: DeMorphemeLemmaSurface<"Suffix", EmptyFeatures>;
	Suffixoid: DeMorphemeLemmaSurface<"Suffixoid", EmptyFeatures>;
	ToneMarking: DeMorphemeLemmaSurface<"ToneMarking", EmptyFeatures>;
	Transfix: DeMorphemeLemmaSurface<"Transfix", EmptyFeatures>;
};

export type DeMorphemeLemmaSurfaceUnion = ValueOf<DeMorphemeLemmaSurfaceBySubKind>;

export type DeMorphemeLemmaSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Circumfix: DeMorphemeLemmaSelection<"Circumfix", EmptyFeatures, OS>;
	Clitic: DeMorphemeLemmaSelection<"Clitic", EmptyFeatures, OS>;
	Duplifix: DeMorphemeLemmaSelection<"Duplifix", EmptyFeatures, OS>;
	Infix: DeMorphemeLemmaSelection<"Infix", EmptyFeatures, OS>;
	Interfix: DeMorphemeLemmaSelection<"Interfix", EmptyFeatures, OS>;
	Prefix: DeMorphemeLemmaSelection<"Prefix", DePrefixMorphemeInherentFeatures, OS>;
	Root: DeMorphemeLemmaSelection<"Root", EmptyFeatures, OS>;
	Suffix: DeMorphemeLemmaSelection<"Suffix", EmptyFeatures, OS>;
	Suffixoid: DeMorphemeLemmaSelection<"Suffixoid", EmptyFeatures, OS>;
	ToneMarking: DeMorphemeLemmaSelection<"ToneMarking", EmptyFeatures, OS>;
	Transfix: DeMorphemeLemmaSelection<"Transfix", EmptyFeatures, OS>;
};

export type DeMorphemeLemmaSelectionUnion<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<DeMorphemeLemmaSelectionBySubKind<OS>>;
