import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewAdjectiveInflectionalFeaturesSchema = deprecatedFeatureSchema({
	definite: DeprecatedHebrewFeature.Definite,
	gender: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Gender, [["Fem", "Masc"]]),
	number: DeprecatedHebrewFeature.Number.extract(["Plur", "Sing"]),
});

const HebrewAdjectiveInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
});

export const DeprecatedHebrewAdjectiveSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewAdjectiveInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewAdjectiveInherentFeaturesSchema,
	pos: "ADJ",
});
