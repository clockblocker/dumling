import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";
import { DeprecatedHebrewAuxiliaryInflectionalFeaturesSchema } from "../shared/hebrew-verbal-inflection-features";

const HebrewAuxiliaryInherentFeaturesSchema = deprecatedFeatureSchema({
	verbType: DeprecatedHebrewFeature.VerbType,
});

export const DeprecatedHebrewAuxiliarySchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: DeprecatedHebrewAuxiliaryInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewAuxiliaryInherentFeaturesSchema,
	pos: "AUX",
});
