import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type {
	DeLexemeInflectionSelection,
	DeLexemeInflectionSurface,
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";
import type { DeCase, DeGender, DeNumber } from "../shared/de-common-enums";

type DeSymbolNumType = Extract<AbstractFeatureValue<"numType">, "Card" | "Range">;

export type DeSymbolInherentFeatures = {
	foreign?: AbstractFeatureValue<"foreign">;
	numType?: DeSymbolNumType;
};

export type DeSymbolInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	gender?: DeGender;
	number?: DeNumber;
}>;

export type DeSymbolLemma = DeLexemeLemma<"SYM", DeSymbolInherentFeatures>;
export type DeSymbolLemmaSurface = DeLexemeLemmaSurface<
	"SYM",
	DeSymbolInherentFeatures
>;
export type DeSymbolInflectionSurface = DeLexemeInflectionSurface<
	"SYM",
	DeSymbolInherentFeatures,
	DeSymbolInflectionalFeatures
>;
export type DeSymbolLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"SYM", DeSymbolInherentFeatures, OS>;
export type DeSymbolInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"SYM",
	DeSymbolInherentFeatures,
	DeSymbolInflectionalFeatures,
	OS
>;

export type DeSymbolTypes = {
	InflectionSelection: DeSymbolInflectionSelection;
	InflectionSurface: DeSymbolInflectionSurface;
	Lemma: DeSymbolLemma;
	LemmaSelection: DeSymbolLemmaSelection;
	LemmaSurface: DeSymbolLemmaSurface;
};
