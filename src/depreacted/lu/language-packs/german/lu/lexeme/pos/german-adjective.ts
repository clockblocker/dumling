import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanAdjectiveNumType = DeprecatedUniversalFeature.NumType.extract([
	"Card",
	"Ord",
]);

const GermanAdjectiveInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedGermanFeature.Case,
	degree: DeprecatedGermanFeature.Degree,
	gender: DeprecatedGermanFeature.Gender,
	number: DeprecatedGermanFeature.Number,
});

const GermanAdjectiveInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	foreign: DeprecatedUniversalFeature.Foreign,
	numType: GermanAdjectiveNumType,
	variant: DeprecatedUniversalFeature.Variant,
});

export const DeprecatedGermanAdjectiveSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanAdjectiveInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanAdjectiveInherentFeaturesSchema,
	pos: "ADJ",
});
