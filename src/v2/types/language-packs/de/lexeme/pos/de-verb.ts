import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeInflectionSelection,
	DeLexemeInflectionSurface,
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";
import type { DeVerbalInflectionalFeatures } from "../shared/de-verbal-inflection-features";

type DeVerbVerbType = "Mod";

export type DeVerbInherentFeatures = {
	hasGovPrep?: AbstractFeatureValue<"hasGovPrep">;
	hasSepPrefix?: AbstractFeatureValue<"hasSepPrefix">;
	lexicallyReflexive?: AbstractFeatureValue<"lexicallyReflexive">;
	verbType?: DeVerbVerbType;
};

export type DeVerbLemma = DeLexemeLemma<"VERB", DeVerbInherentFeatures>;
export type DeVerbLemmaSurface = DeLexemeLemmaSurface<
	"VERB",
	DeVerbInherentFeatures
>;
export type DeVerbInflectionSurface = DeLexemeInflectionSurface<
	"VERB",
	DeVerbInherentFeatures,
	DeVerbalInflectionalFeatures
>;
export type DeVerbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"VERB", DeVerbInherentFeatures, OS>;
export type DeVerbInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"VERB",
	DeVerbInherentFeatures,
	DeVerbalInflectionalFeatures,
	OS
>;

export type DeVerbTypes = {
	InflectionSelection: DeVerbInflectionSelection;
	InflectionSurface: DeVerbInflectionSurface;
	Lemma: DeVerbLemma;
	LemmaSelection: DeVerbLemmaSelection;
	LemmaSurface: DeVerbLemmaSurface;
};
