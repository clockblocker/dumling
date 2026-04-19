import type { AbstractFeatureValue } from "../../../../abstract/features/features";

export type EnCase = Extract<AbstractFeatureValue<"case">, "Acc" | "Gen" | "Nom">;
export type EnDefinite = Extract<AbstractFeatureValue<"definite">, "Def" | "Ind">;
export type EnDegree = Extract<AbstractFeatureValue<"degree">, "Cmp" | "Pos" | "Sup">;
export type EnGender = Extract<AbstractFeatureValue<"gender">, "Fem" | "Masc" | "Neut">;
export type EnMood = Extract<AbstractFeatureValue<"mood">, "Imp" | "Ind" | "Sub">;
export type EnNumber = Extract<AbstractFeatureValue<"number">, "Plur" | "Ptan" | "Sing">;
export type EnNumForm = Extract<AbstractFeatureValue<"numForm">, "Combi" | "Digit" | "Roman" | "Word">;
export type EnNumType = Extract<AbstractFeatureValue<"numType">, "Card" | "Frac" | "Mult" | "Ord">;
export type EnPerson = Extract<AbstractFeatureValue<"person">, "1" | "2" | "3">;
export type EnPolarity = Extract<AbstractFeatureValue<"polarity">, "Neg" | "Pos">;
export type EnPronType = Extract<AbstractFeatureValue<"pronType">, "Art" | "Dem" | "Emp" | "Ind" | "Int" | "Neg" | "Prs" | "Rcp" | "Rel" | "Tot">;
export type EnStyle = Extract<AbstractFeatureValue<"style">, "Arch" | "Coll" | "Expr" | "Slng" | "Vrnc">;
export type EnTense = Extract<AbstractFeatureValue<"tense">, "Past" | "Pres">;
export type EnVerbForm = Extract<AbstractFeatureValue<"verbForm">, "Fin" | "Ger" | "Inf" | "Part">;
export type EnVoice = Extract<AbstractFeatureValue<"voice">, "Pass">;
