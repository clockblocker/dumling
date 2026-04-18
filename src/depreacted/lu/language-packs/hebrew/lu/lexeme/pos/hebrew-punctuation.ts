import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";

const HebrewPunctuationInflectionalFeaturesSchema = deprecatedFeatureSchema({});
const HebrewPunctuationInherentFeaturesSchema = deprecatedFeatureSchema({});

export const DeprecatedHebrewPunctuationSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewPunctuationInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewPunctuationInherentFeaturesSchema,
	pos: "PUNCT",
});
