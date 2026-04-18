import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";

const EnglishPunctuationInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const EnglishPunctuationInherentFeaturesSchema = deprecatedFeatureSchema({});

export const DeprecatedEnglishPunctuationSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishPunctuationInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishPunctuationInherentFeaturesSchema,
	pos: "PUNCT",
});
