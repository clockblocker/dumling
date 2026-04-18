import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewDeterminerInflectionalFeaturesSchema = deprecatedFeatureSchema({
	definite: DeprecatedHebrewFeature.Definite,
	gender: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Gender, [["Fem", "Masc"]]),
	number: DeprecatedHebrewFeature.Number.extract(["Plur", "Sing"]),
});

const HebrewDeterminerInherentFeaturesSchema = deprecatedFeatureSchema({
	pronType: DeprecatedHebrewFeature.PronType.extract(["Art", "Int"]),
});

export const DeprecatedHebrewDeterminerSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewDeterminerInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewDeterminerInherentFeaturesSchema,
	pos: "DET",
});
