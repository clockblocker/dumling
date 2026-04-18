import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type DeAspect = Extract<AbstractFeatureValue<"aspect">, "Perf">;
export type DeCase = Extract<
	AbstractFeatureValue<"case">,
	"Acc" | "Dat" | "Gen" | "Nom"
>;
export type DeDefinite = Extract<AbstractFeatureValue<"definite">, "Def" | "Ind">;
export type DeDegree = Extract<AbstractFeatureValue<"degree">, "Cmp" | "Pos" | "Sup">;
export type DeGender = Extract<AbstractFeatureValue<"gender">, "Fem" | "Masc" | "Neut">;
export type DeMood = Extract<AbstractFeatureValue<"mood">, "Imp" | "Ind" | "Sub">;
export type DeNumber = Extract<AbstractFeatureValue<"number">, "Plur" | "Sing">;
export type DePerson = Extract<AbstractFeatureValue<"person">, "1" | "2" | "3">;
export type DePolarity = Extract<AbstractFeatureValue<"polarity">, "Neg" | "Pos">;
export type DePolite = Extract<AbstractFeatureValue<"polite">, "Form" | "Infm">;
export type DeTense = Extract<AbstractFeatureValue<"tense">, "Past" | "Pres">;
export type DeVerbForm = Extract<AbstractFeatureValue<"verbForm">, "Fin" | "Inf" | "Part">;
