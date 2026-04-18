import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-ADP.html
const EnglishAdpositionExtPos = DeprecatedUniversalFeature.ExtPos.extract([
	"ADP",
	"ADV",
	"SCONJ",
]);

const EnglishAdpositionInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const EnglishAdpositionInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishAdpositionExtPos,
});

export const DeprecatedEnglishAdpositionSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishAdpositionInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishAdpositionInherentFeaturesSchema,
	pos: "ADP",
});
