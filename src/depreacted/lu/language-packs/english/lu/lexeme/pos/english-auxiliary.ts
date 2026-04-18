import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
const EnglishAuxiliaryNumber = DeprecatedEnglishFeature.Number.extract(["Plur", "Sing"]);

// https://universaldependencies.org/u/feat/Style.html
const EnglishAuxiliaryStyle = DeprecatedEnglishFeature.Style.extract(["Arch", "Vrnc"]);

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-VerbForm.html
const EnglishAuxiliaryVerbForm = DeprecatedEnglishFeature.VerbForm.extract([
	"Fin",
	"Inf",
	"Part",
]);

const EnglishAuxiliaryInflectionalFeaturesSchema = deprecatedFeatureSchema({
	mood: DeprecatedEnglishFeature.Mood, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Mood.html
	number: EnglishAuxiliaryNumber,
	person: DeprecatedEnglishFeature.Person, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Person.html
	tense: DeprecatedEnglishFeature.Tense, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Tense.html
	verbForm: EnglishAuxiliaryVerbForm,
});

const EnglishAuxiliaryInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	style: EnglishAuxiliaryStyle,
});

export const DeprecatedEnglishAuxiliarySchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishAuxiliaryInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishAuxiliaryInherentFeaturesSchema,
	pos: "AUX",
});
