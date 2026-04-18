import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";

const GermanPunctuationInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const GermanPunctuationInherentFeaturesSchema = deprecatedFeatureSchema({
	punctType: DeprecatedUniversalFeature.PunctType,
});

export const DeprecatedGermanPunctuationSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanPunctuationInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanPunctuationInherentFeaturesSchema,
	pos: "PUNCT",
});
