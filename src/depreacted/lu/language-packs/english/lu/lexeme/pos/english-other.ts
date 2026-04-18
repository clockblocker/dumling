import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-X.html
const EnglishOtherExtPos = DeprecatedUniversalFeature.ExtPos.extract(["PROPN"]);

const EnglishOtherInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const EnglishOtherInherentFeaturesSchema = deprecatedFeatureSchema({
	extPos: EnglishOtherExtPos, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-X.html
	foreign: DeprecatedUniversalFeature.Foreign,
});

export const DeprecatedEnglishOtherSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishOtherInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishOtherInherentFeaturesSchema,
	pos: "X",
});
