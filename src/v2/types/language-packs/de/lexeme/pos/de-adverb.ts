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
import type { DeDegree } from "../shared/de-common-enums";

type DeAdverbNumType = Extract<AbstractFeatureValue<"numType">, "Card" | "Mult">;
type DeAdverbPronType = Extract<
	AbstractFeatureValue<"pronType">,
	"Dem" | "Ind" | "Int" | "Neg" | "Rel"
>;

export type DeAdverbInherentFeatures = {
	foreign?: AbstractFeatureValue<"foreign">;
	numType?: DeAdverbNumType;
	pronType?: DeAdverbPronType;
};

export type DeAdverbInflectionalFeatures = RequireAtLeastOne<{
	degree?: DeDegree;
}>;

export type DeAdverbLemma = DeLexemeLemma<"ADV", DeAdverbInherentFeatures>;
export type DeAdverbLemmaSurface = DeLexemeLemmaSurface<
	"ADV",
	DeAdverbInherentFeatures
>;
export type DeAdverbInflectionSurface = DeLexemeInflectionSurface<
	"ADV",
	DeAdverbInherentFeatures,
	DeAdverbInflectionalFeatures
>;
export type DeAdverbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"ADV", DeAdverbInherentFeatures, OS>;
export type DeAdverbInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"ADV",
	DeAdverbInherentFeatures,
	DeAdverbInflectionalFeatures,
	OS
>;

export type DeAdverbTypes = {
	InflectionSelection: DeAdverbInflectionSelection;
	InflectionSurface: DeAdverbInflectionSurface;
	Lemma: DeAdverbLemma;
	LemmaSelection: DeAdverbLemmaSelection;
	LemmaSurface: DeAdverbLemmaSurface;
};
