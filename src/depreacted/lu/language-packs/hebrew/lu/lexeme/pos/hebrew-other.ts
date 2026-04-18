import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";

const HebrewOtherInflectionalFeaturesSchema = deprecatedFeatureSchema({});
const HebrewOtherInherentFeaturesSchema = deprecatedFeatureSchema({});

export const DeprecatedHebrewOtherSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewOtherInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewOtherInherentFeaturesSchema,
	pos: "X",
});
