import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewNounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	definite: DeprecatedHebrewFeature.Definite,
	number: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Number, [["Dual", "Plur"]]),
});

const HebrewNounInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	gender: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Gender, [["Fem", "Masc"]]),
});

export const DeprecatedHebrewNounSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewNounInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewNounInherentFeaturesSchema,
	pos: "NOUN",
});
