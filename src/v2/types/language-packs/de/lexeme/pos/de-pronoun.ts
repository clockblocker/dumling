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
import type {
	DeCase,
	DeGender,
	DeNumber,
	DePerson,
	DePolite,
} from "../shared/de-common-enums";

type DePronounExtPos = Extract<AbstractFeatureValue<"extPos">, "DET">;
type DePronounType = Extract<
	AbstractFeatureValue<"pronType">,
	"Dem" | "Ind" | "Int" | "Neg" | "Prs" | "Rcp" | "Rel" | "Tot"
>;

export type DePronounInherentFeatures = {
	extPos?: DePronounExtPos;
	foreign?: AbstractFeatureValue<"foreign">;
	person?: DePerson;
	polite?: DePolite;
	poss?: AbstractFeatureValue<"poss">;
	pronType?: DePronounType;
};

export type DePronounInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	gender?: DeGender;
	number?: DeNumber;
	reflex?: AbstractFeatureValue<"reflex">;
}>;

export type DePronounLemma = DeLexemeLemma<"PRON", DePronounInherentFeatures>;
export type DePronounLemmaSurface = DeLexemeLemmaSurface<
	"PRON",
	DePronounInherentFeatures
>;
export type DePronounInflectionSurface = DeLexemeInflectionSurface<
	"PRON",
	DePronounInherentFeatures,
	DePronounInflectionalFeatures
>;
export type DePronounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeLemmaSelection<"PRON", DePronounInherentFeatures, OS>;
export type DePronounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLexemeInflectionSelection<
	"PRON",
	DePronounInherentFeatures,
	DePronounInflectionalFeatures,
	OS
>;

export type DePronounTypes = {
	InflectionSelection: DePronounInflectionSelection;
	InflectionSurface: DePronounInflectionSurface;
	Lemma: DePronounLemma;
	LemmaSelection: DePronounLemmaSelection;
	LemmaSurface: DePronounLemmaSurface;
};
