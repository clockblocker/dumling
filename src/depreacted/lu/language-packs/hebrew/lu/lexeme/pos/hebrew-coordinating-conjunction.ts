import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";

const HebrewCoordinatingConjunctionInflectionalFeaturesSchema = deprecatedFeatureSchema(
	{},
);
const HebrewCoordinatingConjunctionInherentFeaturesSchema = deprecatedFeatureSchema({});

export const DeprecatedHebrewCoordinatingConjunctionSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema:
		HebrewCoordinatingConjunctionInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewCoordinatingConjunctionInherentFeaturesSchema,
	pos: "CCONJ",
});
