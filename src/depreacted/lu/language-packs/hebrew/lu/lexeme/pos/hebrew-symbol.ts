import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";

const HebrewSymbolInflectionalFeaturesSchema = deprecatedFeatureSchema({});
const HebrewSymbolInherentFeaturesSchema = deprecatedFeatureSchema({});

export const DeprecatedHebrewSymbolSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewSymbolInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewSymbolInherentFeaturesSchema,
	pos: "SYM",
});
