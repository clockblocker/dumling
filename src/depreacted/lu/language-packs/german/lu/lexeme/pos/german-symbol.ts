import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanSymbolNumType = DeprecatedUniversalFeature.NumType.extract(["Card", "Range"]);

const GermanSymbolInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedGermanFeature.Case,
	gender: DeprecatedGermanFeature.Gender,
	number: DeprecatedGermanFeature.Number,
});

const GermanSymbolInherentFeaturesSchema = deprecatedFeatureSchema({
	foreign: DeprecatedUniversalFeature.Foreign,
	numType: GermanSymbolNumType,
});

export const DeprecatedGermanSymbolSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanSymbolInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanSymbolInherentFeaturesSchema,
	pos: "SYM",
});
