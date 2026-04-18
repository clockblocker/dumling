import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";

export type DePunctuationInherentFeatures = {
	punctType?: AbstractFeatureValue<"punctType">;
};

export type DePunctuationLemma = DeLexemeLemma<
	"PUNCT",
	DePunctuationInherentFeatures
>;
export type DePunctuationLemmaSurface = DeLexemeLemmaSurface<
	"PUNCT",
	DePunctuationInherentFeatures
>;
export type DePunctuationLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"PUNCT", DePunctuationInherentFeatures, OS>;

export type DePunctuationTypes = {
	Lemma: DePunctuationLemma;
	LemmaSelection: DePunctuationLemmaSelection;
	LemmaSurface: DePunctuationLemmaSurface;
};
