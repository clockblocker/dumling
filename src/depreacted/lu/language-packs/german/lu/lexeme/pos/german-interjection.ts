import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";

const GermanInterjectionInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const GermanInterjectionInherentFeaturesSchema = deprecatedFeatureSchema({
	partType: DeprecatedUniversalFeature.PartType.extract(["Res"]),
});

export const DeprecatedGermanInterjectionSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanInterjectionInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanInterjectionInherentFeaturesSchema,
	pos: "INTJ",
});
