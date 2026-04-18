import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewAdverbInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const HebrewAdverbInherentFeaturesSchema = deprecatedFeatureSchema({
	prefix: DeprecatedHebrewFeature.Prefix,
});

export const DeprecatedHebrewAdverbSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewAdverbInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewAdverbInherentFeaturesSchema,
	pos: "ADV",
});
