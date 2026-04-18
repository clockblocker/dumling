import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewNumeralInflectionalFeaturesSchema = deprecatedFeatureSchema({
	definite: DeprecatedHebrewFeature.Definite,
	gender: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Gender, [["Fem", "Masc"]]),
	number: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Number, [["Dual", "Plur"]]),
});

const HebrewNumeralInherentFeaturesSchema = deprecatedFeatureSchema({});

export const DeprecatedHebrewNumeralSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewNumeralInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewNumeralInherentFeaturesSchema,
	pos: "NUM",
});
