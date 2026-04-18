import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";

const HebrewInterjectionInflectionalFeaturesSchema = deprecatedFeatureSchema({});
const HebrewInterjectionInherentFeaturesSchema = deprecatedFeatureSchema({});

export const DeprecatedHebrewInterjectionSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewInterjectionInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewInterjectionInherentFeaturesSchema,
	pos: "INTJ",
});
