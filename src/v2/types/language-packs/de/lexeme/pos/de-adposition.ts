import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";

type DeAdpositionType = Extract<AbstractFeatureValue<"adpType">, "Circ" | "Post" | "Prep">;
type DeAdpositionExtPos = Extract<AbstractFeatureValue<"extPos">, "ADV" | "SCONJ">;
type DeAdpositionPartType = Extract<AbstractFeatureValue<"partType">, "Vbp">;

export type DeAdpositionInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	adpType?: DeAdpositionType;
	extPos?: DeAdpositionExtPos;
	foreign?: AbstractFeatureValue<"foreign">;
	governedCase?: AbstractFeatureValue<"governedCase">;
	partType?: DeAdpositionPartType;
};

export type DeAdpositionLemma = DeLexemeLemma<
	"ADP",
	DeAdpositionInherentFeatures
>;
export type DeAdpositionLemmaSurface = DeLexemeLemmaSurface<
	"ADP",
	DeAdpositionInherentFeatures
>;
export type DeAdpositionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"ADP", DeAdpositionInherentFeatures, OS>;

export type DeAdpositionTypes = {
	Lemma: DeAdpositionLemma;
	LemmaSelection: DeAdpositionLemmaSelection;
	LemmaSurface: DeAdpositionLemmaSurface;
};
