import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { DeprecatedHebrewFeature } from "./hebrew-common-enums";

const HebrewVerbalGender = deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Gender, [
	["Fem", "Masc"],
]);
const HebrewVerbalNumber = DeprecatedHebrewFeature.Number.extract(["Plur", "Sing"]);
const HebrewVerbalPerson = deprecatedFeatureSpecificValueSets(DeprecatedHebrewFeature.Person, [
	["1", "2", "3"],
]);

export const DeprecatedHebrewVerbInflectionalFeaturesSchema = deprecatedFeatureSchema({
	definite: DeprecatedHebrewFeature.Definite,
	gender: HebrewVerbalGender,
	mood: DeprecatedHebrewFeature.Mood,
	number: HebrewVerbalNumber,
	person: HebrewVerbalPerson,
	polarity: DeprecatedHebrewFeature.Polarity,
	tense: DeprecatedHebrewFeature.Tense,
	verbForm: DeprecatedHebrewFeature.VerbForm,
	voice: DeprecatedHebrewFeature.Voice,
});

export const DeprecatedHebrewAuxiliaryInflectionalFeaturesSchema = deprecatedFeatureSchema({
	gender: HebrewVerbalGender,
	number: HebrewVerbalNumber,
	person: HebrewVerbalPerson,
	polarity: DeprecatedHebrewFeature.Polarity,
	tense: DeprecatedHebrewFeature.Tense,
	verbForm: DeprecatedHebrewFeature.VerbForm,
});
