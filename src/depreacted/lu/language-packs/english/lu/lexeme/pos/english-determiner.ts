import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureValueSet,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-DET.html
const EnglishDeterminerExtPos = DeprecatedUniversalFeature.ExtPos.extract([
	"ADV",
	"PRON",
]);

// https://universaldependencies.org/u/feat/NumForm.html
const EnglishDeterminerNumForm = DeprecatedEnglishFeature.NumForm.extract(["Word"]);

// https://universaldependencies.org/u/feat/NumType.html
const EnglishDeterminerNumType = DeprecatedEnglishFeature.NumType.extract(["Frac"]);

// https://universaldependencies.org/docs/en/feat/PronType.html
const EnglishDeterminerPronType = DeprecatedEnglishFeature.PronType.extract([
	"Art",
	"Dem",
	"Ind",
	"Int",
	"Neg",
	"Rcp",
	"Rel",
	"Tot",
]);

// https://universaldependencies.org/u/feat/Style.html
const EnglishDeterminerStyle = DeprecatedEnglishFeature.Style.extract(["Vrnc"]);

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
const EnglishDeterminerNumber = DeprecatedEnglishFeature.Number.extract(["Plur", "Sing"]);

const EnglishDeterminerInflectionalFeaturesSchema = deprecatedFeatureSchema({
	number: EnglishDeterminerNumber,
});

const EnglishDeterminerInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	definite: DeprecatedEnglishFeature.Definite, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Definite.html
	extPos: EnglishDeterminerExtPos, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-DET.html
	numForm: EnglishDeterminerNumForm, // https://universaldependencies.org/u/feat/NumForm.html
	numType: EnglishDeterminerNumType, // https://universaldependencies.org/u/feat/NumType.html
	pronType: deprecatedFeatureValueSet(EnglishDeterminerPronType), // https://universaldependencies.org/docs/en/feat/PronType.html
	style: EnglishDeterminerStyle, // https://universaldependencies.org/u/feat/Style.html
});

export const DeprecatedEnglishDeterminerSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishDeterminerInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishDeterminerInherentFeaturesSchema,
	pos: "DET",
});
