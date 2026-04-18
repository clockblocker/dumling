import type { OrthographicStatus } from "../../../../core/enums";
import type {
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";

type DeSubordinatingConjunctionType = "Comp";

export type DeSubordinatingConjunctionInherentFeatures = {
	conjType?: DeSubordinatingConjunctionType;
};

export type DeSubordinatingConjunctionLemma = DeLexemeLemma<
	"SCONJ",
	DeSubordinatingConjunctionInherentFeatures
>;
export type DeSubordinatingConjunctionLemmaSurface = DeLexemeLemmaSurface<
	"SCONJ",
	DeSubordinatingConjunctionInherentFeatures
>;
export type DeSubordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"SCONJ", DeSubordinatingConjunctionInherentFeatures, OS>;

export type DeSubordinatingConjunctionTypes = {
	Lemma: DeSubordinatingConjunctionLemma;
	LemmaSelection: DeSubordinatingConjunctionLemmaSelection;
	LemmaSurface: DeSubordinatingConjunctionLemmaSurface;
};
