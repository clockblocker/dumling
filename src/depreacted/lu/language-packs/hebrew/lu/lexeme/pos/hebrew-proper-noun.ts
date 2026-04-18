import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewProperNounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	number: DeprecatedHebrewFeature.Number.extract(["Plur", "Sing"]),
});

const HebrewProperNounInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	gender: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Gender, [["Fem", "Masc"]]),
});

export const DeprecatedHebrewProperNounSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewProperNounInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewProperNounInherentFeaturesSchema,
	pos: "PROPN",
});
