import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureSpecificValueSets,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanPronounPronType = DeprecatedUniversalFeature.PronType.extract([
	"Dem",
	"Ind",
	"Int",
	"Neg",
	"Prs",
	"Rcp",
	"Rel",
	"Tot",
]);

const GermanPronounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedGermanFeature.Case,
	gender: DeprecatedGermanFeature.Gender,
	number: DeprecatedGermanFeature.Number,
	reflex: DeprecatedUniversalFeature.Reflex,
});

const GermanPronounInherentFeaturesSchema = deprecatedFeatureSchema({
	extPos: DeprecatedUniversalFeature.ExtPos.extract(["DET"]),
	foreign: DeprecatedUniversalFeature.Foreign,
	person: DeprecatedGermanFeature.Person,
	polite: DeprecatedGermanFeature.Polite,
	poss: DeprecatedUniversalFeature.Poss,
	pronType: deprecatedFeatureSpecificValueSets(GermanPronounPronType, [
		["Dem", "Rel"],
		["Int", "Rel"],
	]),
});

export const DeprecatedGermanPronounSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanPronounInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanPronounInherentFeaturesSchema,
	pos: "PRON",
});
