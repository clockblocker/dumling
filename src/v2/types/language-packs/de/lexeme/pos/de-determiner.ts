import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { DeFeatureValueSet, RequireAtLeastOne } from "../../shared";
import type {
	DeLexemeInflectionSelection,
	DeLexemeInflectionSurface,
	DeLexemeLemma,
	DeLexemeLemmaSelection,
	DeLexemeLemmaSurface,
} from "../shared/build-de-lexeme-bundle";
import type {
	DeCase,
	DeDegree,
	DeDefinite,
	DeGender,
	DeNumber,
	DePerson,
	DePolite,
} from "../shared/de-common-enums";

type DeDeterminerNumType = Extract<AbstractFeatureValue<"numType">, "Card" | "Ord">;
type DeDeterminerExtPos = Extract<AbstractFeatureValue<"extPos">, "ADV" | "DET">;
type DeDeterminerPronType = Extract<
	AbstractFeatureValue<"pronType">,
	"Art" | "Dem" | "Emp" | "Exc" | "Ind" | "Int" | "Neg" | "Prs" | "Rel" | "Tot"
>;
type DeDeterminerInflectionalGender =
	| Extract<DeGender, "Masc" | "Neut">
	| readonly ["Masc", "Neut"]
	| readonly ["Neut", "Masc"];

export type DeDeterminerInherentFeatures = {
	definite?: DeDefinite;
	extPos?: DeDeterminerExtPos;
	foreign?: AbstractFeatureValue<"foreign">;
	numType?: DeDeterminerNumType;
	person?: DePerson;
	polite?: DePolite;
	poss?: AbstractFeatureValue<"poss">;
	pronType?: DeDeterminerPronType;
};

export type DeDeterminerInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	degree?: DeDegree;
	gender?: DeDeterminerInflectionalGender;
	"gender[psor]"?: DeFeatureValueSet<DeGender>;
	number?: DeNumber;
	"number[psor]"?: DeNumber;
}>;

export type DeDeterminerLemma = DeLexemeLemma<
	"DET",
	DeDeterminerInherentFeatures
>;
export type DeDeterminerLemmaSurface = DeLexemeLemmaSurface<
	"DET",
	DeDeterminerInherentFeatures
>;
export type DeDeterminerInflectionSurface = DeLexemeInflectionSurface<
	"DET",
	DeDeterminerInherentFeatures,
	DeDeterminerInflectionalFeatures
>;
export type DeDeterminerLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"DET", DeDeterminerInherentFeatures, OS>;
export type DeDeterminerInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"DET",
	DeDeterminerInherentFeatures,
	DeDeterminerInflectionalFeatures,
	OS
>;

export type DeDeterminerTypes = {
	InflectionSelection: DeDeterminerInflectionSelection;
	InflectionSurface: DeDeterminerInflectionSurface;
	Lemma: DeDeterminerLemma;
	LemmaSelection: DeDeterminerLemmaSelection;
	LemmaSurface: DeDeterminerLemmaSurface;
};
