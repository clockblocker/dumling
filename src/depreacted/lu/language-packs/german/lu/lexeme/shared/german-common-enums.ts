import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";

export const DeprecatedGermanFeature = {
	Aspect: DeprecatedUniversalFeature.Aspect.extract(["Perf"]),
	Case: DeprecatedUniversalFeature.Case.extract(["Acc", "Dat", "Gen", "Nom"]),
	Definite: DeprecatedUniversalFeature.Definite.extract(["Def", "Ind"]),
	Degree: DeprecatedUniversalFeature.Degree.extract(["Cmp", "Pos", "Sup"]),
	Gender: DeprecatedUniversalFeature.Gender.extract(["Fem", "Masc", "Neut"]),
	Mood: DeprecatedUniversalFeature.Mood.extract(["Imp", "Ind", "Sub"]),
	Number: DeprecatedUniversalFeature.GrammaticalNumber.extract(["Plur", "Sing"]),
	Person: DeprecatedUniversalFeature.Person.extract(["1", "2", "3"]),
	Polarity: DeprecatedUniversalFeature.Polarity.extract(["Neg", "Pos"]),
	Polite: DeprecatedUniversalFeature.Polite.extract(["Form", "Infm"]),
	Tense: DeprecatedUniversalFeature.Tense.extract(["Past", "Pres"]),
	VerbForm: DeprecatedUniversalFeature.VerbForm.extract(["Fin", "Inf", "Part"]),
};
