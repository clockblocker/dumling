import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-NOUN.html
const EnglishNounExtPos = DeprecatedUniversalFeature.ExtPos.extract(["ADV", "PROPN"]);

// https://universaldependencies.org/u/feat/NumForm.html
const EnglishNounNumForm = DeprecatedEnglishFeature.NumForm.extract([
	"Combi",
	"Digit",
	"Word",
]);
// https://universaldependencies.org/u/feat/NumType.html
const EnglishNounNumType = DeprecatedEnglishFeature.NumType.extract([
	"Card",
	"Frac",
	"Ord",
]);
// https://universaldependencies.org/u/feat/Style.html
const EnglishNounStyle = DeprecatedEnglishFeature.Style.extract(["Expr", "Vrnc"]);

const EnglishNounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	number: DeprecatedEnglishFeature.Number, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
});

const EnglishNounInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishNounExtPos,
	foreign: DeprecatedUniversalFeature.Foreign,
	numForm: EnglishNounNumForm,
	numType: EnglishNounNumType,
	style: EnglishNounStyle,
});

export const DeprecatedEnglishNounSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishNounInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishNounInherentFeaturesSchema,
	pos: "NOUN",
});
