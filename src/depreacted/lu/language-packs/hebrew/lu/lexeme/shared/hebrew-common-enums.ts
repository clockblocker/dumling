import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";

export const DeprecatedHebrewFeature = {
	Case: DeprecatedUniversalFeature.Case.extract(["Acc", "Gen", "Tem"]),
	Definite: DeprecatedUniversalFeature.Definite.extract(["Cons", "Def"]),
	Gender: DeprecatedUniversalFeature.Gender.extract(["Fem", "Masc"]),
	HebBinyan: DeprecatedUniversalFeature.HebBinyan,
	HebExistential: DeprecatedUniversalFeature.HebExistential,
	Mood: DeprecatedUniversalFeature.Mood.extract(["Imp"]),
	Number: DeprecatedUniversalFeature.GrammaticalNumber.extract([
		"Dual",
		"Plur",
		"Sing",
	]),
	Person: DeprecatedUniversalFeature.Person.extract(["1", "2", "3"]),
	Polarity: DeprecatedUniversalFeature.Polarity.extract(["Neg", "Pos"]),
	Prefix: DeprecatedUniversalFeature.Prefix,
	PronType: DeprecatedUniversalFeature.PronType.extract([
		"Art",
		"Dem",
		"Ind",
		"Int",
		"Prs",
	]),
	Tense: DeprecatedUniversalFeature.Tense.extract(["Fut", "Past"]),
	VerbForm: DeprecatedUniversalFeature.VerbForm.extract(["Inf", "Part"]),
	VerbType: DeprecatedUniversalFeature.VerbType.extract(["Cop", "Mod"]),
	Voice: DeprecatedUniversalFeature.Voice.extract(["Act", "Mid", "Pass"]),
};
