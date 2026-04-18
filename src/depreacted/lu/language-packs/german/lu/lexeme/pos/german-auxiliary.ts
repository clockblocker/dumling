import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanVerbalInflectionalFeaturesSchema } from "../shared/german-verbal-inflection-features";

const GermanAuxiliaryInflectionalFeaturesSchema =
	DeprecatedGermanVerbalInflectionalFeaturesSchema;

const GermanAuxiliaryInherentFeaturesSchema = deprecatedFeatureSchema({
	verbType: DeprecatedUniversalFeature.VerbType.extract(["Mod"]),
});

export const DeprecatedGermanAuxiliarySchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanAuxiliaryInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanAuxiliaryInherentFeaturesSchema,
	pos: "AUX",
});
