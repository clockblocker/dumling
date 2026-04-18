import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

const EnglishInterjectionInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const EnglishInterjectionInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	foreign: DeprecatedUniversalFeature.Foreign,
	polarity: DeprecatedEnglishFeature.Polarity, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Polarity.html
	style: DeprecatedEnglishFeature.Style.extract(["Expr"]), // https://universaldependencies.org/u/feat/Style.html
});

export const DeprecatedEnglishInterjectionSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishInterjectionInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishInterjectionInherentFeaturesSchema,
	pos: "INTJ",
});
