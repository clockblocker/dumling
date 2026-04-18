import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewPronounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	gender: deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Gender, [["Fem", "Masc"]]),
	number: DeprecatedHebrewFeature.Number.extract(["Plur", "Sing"]),
	person: DeprecatedHebrewFeature.Person,
});

const HebrewPronounInherentFeaturesSchema = deprecatedFeatureSchema({
	definite: DeprecatedHebrewFeature.Definite.extract(["Def"]),
	pronType: DeprecatedHebrewFeature.PronType.extract(["Dem", "Ind", "Int", "Prs"]),
	reflex: DeprecatedUniversalFeature.Reflex,
});

export const DeprecatedHebrewPronounSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewPronounInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewPronounInherentFeaturesSchema,
	pos: "PRON",
});
