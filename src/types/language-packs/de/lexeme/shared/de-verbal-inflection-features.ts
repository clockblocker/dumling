import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { RequireAtLeastOne } from "../../shared";
import type {
	DeAspect,
	DeGender,
	DeMood,
	DeNumber,
	DePerson,
	DeTense,
} from "./de-common-enums";

type DeVoice = Extract<AbstractFeatureValue<"voice">, "Pass">;
type DeFiniteImperativeMood = Extract<DeMood, "Imp">;
type DeFiniteNonImperativeMood = Exclude<DeMood, "Imp">;
type DeInfinitiveVerbForm = Extract<AbstractFeatureValue<"verbForm">, "Inf">;
type DeFiniteVerbForm = Extract<AbstractFeatureValue<"verbForm">, "Fin">;
type DeParticipleVerbForm = Extract<AbstractFeatureValue<"verbForm">, "Part">;

type DeUnderspecifiedVerbalInflectionalFeatures = RequireAtLeastOne<{
	number?: DeNumber;
	tense?: DeTense;
	verbForm?: never;
	voice?: DeVoice;
}>;

type DeFiniteImperativeVerbalInflectionalFeatures = {
	mood: DeFiniteImperativeMood;
	number?: DeNumber;
	person?: DePerson;
	tense?: never;
	verbForm: DeFiniteVerbForm;
	voice?: DeVoice;
};

type DeFiniteNonImperativeVerbalInflectionalFeatures = {
	mood?: DeFiniteNonImperativeMood;
	number?: DeNumber;
	person?: DePerson;
	tense?: DeTense;
	verbForm: DeFiniteVerbForm;
	voice?: DeVoice;
};

type DeInfinitiveVerbalInflectionalFeatures = {
	mood?: never;
	number?: DeNumber;
	person?: never;
	tense?: never;
	verbForm: DeInfinitiveVerbForm;
	voice?: DeVoice;
};

type DeParticipleVerbalInflectionalFeatures = {
	aspect?: DeAspect;
	gender?: DeGender;
	mood?: never;
	number?: DeNumber;
	person?: never;
	tense?: DeTense;
	verbForm: DeParticipleVerbForm;
	voice?: DeVoice;
};

export type DeVerbalInflectionalFeatures =
	| DeUnderspecifiedVerbalInflectionalFeatures
	| DeFiniteImperativeVerbalInflectionalFeatures
	| DeFiniteNonImperativeVerbalInflectionalFeatures
	| DeInfinitiveVerbalInflectionalFeatures
	| DeParticipleVerbalInflectionalFeatures;
