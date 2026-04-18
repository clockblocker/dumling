import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanNumeralNumType = DeprecatedUniversalFeature.NumType.extract([
	"Card",
	"Frac",
	"Mult",
	"Range",
]);

const GermanNumeralInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedGermanFeature.Case,
	gender: DeprecatedGermanFeature.Gender,
	number: DeprecatedGermanFeature.Number,
});

const GermanNumeralInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	foreign: DeprecatedUniversalFeature.Foreign,
	numType: GermanNumeralNumType,
});

export const DeprecatedGermanNumeralSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanNumeralInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanNumeralInherentFeaturesSchema,
	pos: "NUM",
});
