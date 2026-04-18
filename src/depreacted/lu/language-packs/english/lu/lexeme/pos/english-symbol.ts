import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-SYM.html
const EnglishSymbolExtPos = DeprecatedUniversalFeature.ExtPos.extract(["ADP", "PROPN"]);

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
const EnglishSymbolNumber = DeprecatedEnglishFeature.Number.extract(["Plur", "Sing"]);

const EnglishSymbolInflectionalFeaturesSchema = deprecatedFeatureSchema({
	number: EnglishSymbolNumber,
});

const EnglishSymbolInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishSymbolExtPos, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-SYM.html
});

export const DeprecatedEnglishSymbolSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishSymbolInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishSymbolInherentFeaturesSchema,
	pos: "SYM",
});
