import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-SCONJ.html
const EnglishSubordinatingConjunctionExtPos = DeprecatedUniversalFeature.ExtPos.extract([
	"ADP",
	"SCONJ",
]);

// https://universaldependencies.org/u/feat/Style.html
const EnglishSubordinatingConjunctionStyle = DeprecatedEnglishFeature.Style.extract([
	"Vrnc",
]);

const EnglishSubordinatingConjunctionInflectionalFeaturesSchema = deprecatedFeatureSchema(
	{},
);

const EnglishSubordinatingConjunctionInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishSubordinatingConjunctionExtPos,
	style: EnglishSubordinatingConjunctionStyle,
});

export const DeprecatedEnglishSubordinatingConjunctionSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema:
		EnglishSubordinatingConjunctionInflectionalFeaturesSchema,
	inherentFeaturesSchema:
		EnglishSubordinatingConjunctionInherentFeaturesSchema,
	pos: "SCONJ",
});
