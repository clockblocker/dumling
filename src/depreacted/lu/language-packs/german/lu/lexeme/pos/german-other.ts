import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanOtherNumType = DeprecatedUniversalFeature.NumType.extract([
	"Card",
	"Mult",
	"Range",
]);

const GermanOtherInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedGermanFeature.Case,
	gender: DeprecatedGermanFeature.Gender,
	mood: DeprecatedGermanFeature.Mood,
	number: DeprecatedGermanFeature.Number,
	verbForm: DeprecatedGermanFeature.VerbForm,
});

const GermanOtherInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	foreign: DeprecatedUniversalFeature.Foreign,
	hyph: DeprecatedUniversalFeature.Hyph,
	numType: GermanOtherNumType,
});

export const DeprecatedGermanOtherSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanOtherInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanOtherInherentFeaturesSchema,
	pos: "X",
});
