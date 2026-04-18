import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

const EnglishCoordinatingConjunctionInflectionalFeaturesSchema = deprecatedFeatureSchema(
	{},
);

const EnglishCoordinatingConjunctionInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	polarity: DeprecatedEnglishFeature.Polarity.extract(["Neg"]), // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Polarity.html
});

export const DeprecatedEnglishCoordinatingConjunctionSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema:
		EnglishCoordinatingConjunctionInflectionalFeaturesSchema,
	inherentFeaturesSchema:
		EnglishCoordinatingConjunctionInherentFeaturesSchema,
	pos: "CCONJ",
});
