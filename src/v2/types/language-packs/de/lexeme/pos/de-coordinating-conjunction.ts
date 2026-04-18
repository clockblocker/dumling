import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";

type DeCoordinatingConjunctionType = "Comp";

export type DeCoordinatingConjunctionInherentFeatures = {
	conjType?: DeCoordinatingConjunctionType;
};

export type DeCoordinatingConjunctionLemma = DeLexemeLemma<
	"CCONJ",
	DeCoordinatingConjunctionInherentFeatures
>;
export type DeCoordinatingConjunctionLemmaSurface = DeLexemeLemmaSurface<
	"CCONJ",
	DeCoordinatingConjunctionInherentFeatures
>;
export type DeCoordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"CCONJ", DeCoordinatingConjunctionInherentFeatures, OS>;

export type DeCoordinatingConjunctionTypes = {
	Lemma: DeCoordinatingConjunctionLemma;
	LemmaSelection: DeCoordinatingConjunctionLemmaSelection;
	LemmaSurface: DeCoordinatingConjunctionLemmaSurface;
};
