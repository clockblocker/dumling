import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";
import { DeprecatedHebrewVerbInflectionalFeaturesSchema } from "../shared/hebrew-verbal-inflection-features";

const HebrewVerbInherentFeaturesSchema = deprecatedFeatureSchema({
	hebBinyan: DeprecatedHebrewFeature.HebBinyan,
	hebExistential: DeprecatedHebrewFeature.HebExistential,
});

export const DeprecatedHebrewVerbSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: DeprecatedHebrewVerbInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewVerbInherentFeaturesSchema,
	pos: "VERB",
});
