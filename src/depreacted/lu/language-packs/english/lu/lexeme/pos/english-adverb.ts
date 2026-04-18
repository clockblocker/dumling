import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureValueSet,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-ADV.html
const EnglishAdverbExtPos = DeprecatedUniversalFeature.ExtPos.extract([
	"ADP",
	"ADV",
	"CCONJ",
	"SCONJ",
]);

// https://universaldependencies.org/u/feat/NumForm.html
const EnglishAdverbNumForm = DeprecatedEnglishFeature.NumForm.extract(["Word"]);

// https://universaldependencies.org/u/feat/NumType.html
const EnglishAdverbNumType = DeprecatedEnglishFeature.NumType.extract([
	"Frac",
	"Mult",
	"Ord",
]);

// https://universaldependencies.org/docs/en/feat/PronType.html
const EnglishAdverbPronType = DeprecatedEnglishFeature.PronType.extract([
	"Dem",
	"Ind",
	"Int",
	"Neg",
	"Rel",
	"Tot",
]);

// https://universaldependencies.org/u/feat/Style.html
const EnglishAdverbStyle = DeprecatedEnglishFeature.Style.extract(["Expr", "Slng"]);

const EnglishAdverbInflectionalFeaturesSchema = deprecatedFeatureSchema({
	degree: DeprecatedEnglishFeature.Degree, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Degree.html
});

const EnglishAdverbInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishAdverbExtPos, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-ADV.html
	numForm: EnglishAdverbNumForm, // https://universaldependencies.org/u/feat/NumForm.html
	numType: EnglishAdverbNumType, // https://universaldependencies.org/u/feat/NumType.html
	pronType: deprecatedFeatureValueSet(EnglishAdverbPronType), // https://universaldependencies.org/docs/en/feat/PronType.html
	style: EnglishAdverbStyle, // https://universaldependencies.org/u/feat/Style.html
});

export const DeprecatedEnglishAdverbSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishAdverbInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishAdverbInherentFeaturesSchema,
	pos: "ADV",
});
