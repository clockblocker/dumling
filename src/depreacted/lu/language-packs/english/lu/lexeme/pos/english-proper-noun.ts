import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-PROPN.html
const EnglishProperNounExtPos = DeprecatedUniversalFeature.ExtPos.extract(["PROPN"]);
// https://universaldependencies.org/u/feat/Style.html
const EnglishProperNounStyle = DeprecatedEnglishFeature.Style.extract(["Expr"]);

const EnglishProperNounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	number: DeprecatedEnglishFeature.Number, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
});

const EnglishProperNounInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishProperNounExtPos,
	style: EnglishProperNounStyle,
});

export const DeprecatedEnglishProperNounSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishProperNounInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishProperNounInherentFeaturesSchema,
	pos: "PROPN",
});
