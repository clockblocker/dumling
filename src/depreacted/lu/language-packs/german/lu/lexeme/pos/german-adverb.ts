import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanAdverbNumType = DeprecatedUniversalFeature.NumType.extract(["Card", "Mult"]);

const GermanAdverbPronType = DeprecatedUniversalFeature.PronType.extract([
	"Dem",
	"Ind",
	"Int",
	"Neg",
	"Rel",
]);

const GermanAdverbInflectionalFeaturesSchema = deprecatedFeatureSchema({
	degree: DeprecatedGermanFeature.Degree,
});

const GermanAdverbInherentFeaturesSchema = deprecatedFeatureSchema({
	foreign: DeprecatedUniversalFeature.Foreign,
	numType: GermanAdverbNumType,
	pronType: GermanAdverbPronType,
});

export const DeprecatedGermanAdverbSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanAdverbInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanAdverbInherentFeaturesSchema,
	pos: "ADV",
});
