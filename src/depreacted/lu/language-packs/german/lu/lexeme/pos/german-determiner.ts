import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
	deprecatedFeatureValueSet,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanDeterminerNumType = DeprecatedUniversalFeature.NumType.extract([
	"Card",
	"Ord",
]);

const GermanDeterminerPronType = DeprecatedUniversalFeature.PronType.extract([
	"Art",
	"Dem",
	"Emp",
	"Exc",
	"Ind",
	"Int",
	"Neg",
	"Prs",
	"Rel",
	"Tot",
]);

const GermanDeterminerInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedGermanFeature.Case,
	degree: DeprecatedGermanFeature.Degree,
	gender: deprecatedFeatureSpecificValueSets(DeprecatedGermanFeature.Gender, [["Masc", "Neut"]]),
	"gender[psor]": deprecatedFeatureValueSet(DeprecatedGermanFeature.Gender),
	number: DeprecatedGermanFeature.Number,
	"number[psor]": DeprecatedGermanFeature.Number,
});

const GermanDeterminerInherentFeaturesSchema = deprecatedFeatureSchema({
	definite: DeprecatedGermanFeature.Definite,
	extPos: DeprecatedUniversalFeature.ExtPos.extract(["ADV", "DET"]),
	foreign: DeprecatedUniversalFeature.Foreign,
	numType: GermanDeterminerNumType,
	person: DeprecatedGermanFeature.Person,
	polite: DeprecatedGermanFeature.Polite,
	poss: DeprecatedUniversalFeature.Poss,
	pronType: deprecatedFeatureSpecificValueSets(GermanDeterminerPronType, [
		["Int", "Rel"],
	]),
});

export const DeprecatedGermanDeterminerSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanDeterminerInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanDeterminerInherentFeaturesSchema,
	pos: "DET",
});
