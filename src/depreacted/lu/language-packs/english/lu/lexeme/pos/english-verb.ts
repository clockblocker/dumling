import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-VERB.html
const EnglishVerbExtPos = DeprecatedUniversalFeature.ExtPos.extract([
	"ADP",
	"CCONJ",
	"PROPN",
]);

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
const EnglishVerbNumber = DeprecatedEnglishFeature.Number.extract(["Plur", "Sing"]);

// https://universaldependencies.org/u/feat/Style.html
const EnglishVerbStyle = DeprecatedEnglishFeature.Style.extract(["Expr", "Vrnc"]);
const EnglishVerbVerbForm = DeprecatedEnglishFeature.VerbForm;

const EnglishVerbInflectionalFeaturesSchema = deprecatedFeatureSchema({
	mood: DeprecatedEnglishFeature.Mood, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Mood.html
	number: EnglishVerbNumber,
	person: DeprecatedEnglishFeature.Person, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Person.html
	tense: DeprecatedEnglishFeature.Tense, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Tense.html
	verbForm: EnglishVerbVerbForm, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-VerbForm.html
	voice: DeprecatedUniversalFeature.Voice.extract(["Pass"]), // https://universaldependencies.org/en/feat/Voice.html
});

const EnglishVerbInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishVerbExtPos,
	hasGovPrep: DeprecatedUniversalFeature.HasGovPrep,
	phrasal: DeprecatedUniversalFeature.Phrasal,
	style: EnglishVerbStyle,
});

export const DeprecatedEnglishVerbSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishVerbInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishVerbInherentFeaturesSchema,
	pos: "VERB",
});
