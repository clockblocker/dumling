import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";

type DeInterjectionPartType = "Res";

export type DeInterjectionInherentFeatures = {
	partType?: DeInterjectionPartType;
};

export type DeInterjectionLemma = DeLexemeLemma<
	"INTJ",
	DeInterjectionInherentFeatures
>;
export type DeInterjectionLemmaSurface = DeLexemeLemmaSurface<
	"INTJ",
	DeInterjectionInherentFeatures
>;
export type DeInterjectionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"INTJ", DeInterjectionInherentFeatures, OS>;

export type DeInterjectionTypes = {
	Lemma: DeInterjectionLemma;
	LemmaSelection: DeInterjectionLemmaSelection;
	LemmaSurface: DeInterjectionLemmaSurface;
};
