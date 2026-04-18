import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";

export const DeprecatedEnglishFeature = {
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Case.html
	Case: DeprecatedUniversalFeature.Case.extract(["Acc", "Gen", "Nom"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Definite.html
	Definite: DeprecatedUniversalFeature.Definite.extract(["Def", "Ind"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Degree.html
	Degree: DeprecatedUniversalFeature.Degree.extract(["Cmp", "Pos", "Sup"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Gender.html
	Gender: DeprecatedUniversalFeature.Gender.extract(["Fem", "Masc", "Neut"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Mood.html
	Mood: DeprecatedUniversalFeature.Mood.extract(["Imp", "Ind", "Sub"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
	Number: DeprecatedUniversalFeature.GrammaticalNumber.extract([
		"Plur",
		"Ptan",
		"Sing",
	]),
	// https://universaldependencies.org/u/feat/NumForm.html
	NumForm: DeprecatedUniversalFeature.NumForm.extract([
		"Combi",
		"Digit",
		"Roman",
		"Word",
	]),
	// https://universaldependencies.org/u/feat/NumType.html
	NumType: DeprecatedUniversalFeature.NumType.extract(["Card", "Frac", "Mult", "Ord"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Person.html
	Person: DeprecatedUniversalFeature.Person.extract(["1", "2", "3"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Polarity.html
	Polarity: DeprecatedUniversalFeature.Polarity.extract(["Neg", "Pos"]),
	// https://universaldependencies.org/u/feat/PronType.html
	PronType: DeprecatedUniversalFeature.PronType.extract([
		"Art",
		"Dem",
		"Emp",
		"Ind",
		"Int",
		"Neg",
		"Prs",
		"Rcp",
		"Rel",
		"Tot",
	]),
	// https://universaldependencies.org/u/feat/Style.html
	Style: DeprecatedUniversalFeature.Style.extract([
		"Arch",
		"Coll",
		"Expr",
		"Slng",
		"Vrnc",
	]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Tense.html
	Tense: DeprecatedUniversalFeature.Tense.extract(["Past", "Pres"]),
	// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-VerbForm.html
	VerbForm: DeprecatedUniversalFeature.VerbForm.extract(["Fin", "Ger", "Inf", "Part"]),
};
