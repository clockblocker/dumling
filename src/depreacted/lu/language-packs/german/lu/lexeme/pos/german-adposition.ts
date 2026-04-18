import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";

const GermanAdpositionInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const GermanAdpositionInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	adpType: DeprecatedUniversalFeature.AdpType.extract(["Circ", "Post", "Prep"]),
	extPos: DeprecatedUniversalFeature.ExtPos.extract(["ADV", "SCONJ"]),
	foreign: DeprecatedUniversalFeature.Foreign,
	governedCase: DeprecatedUniversalFeature.GovernedCase,
	partType: DeprecatedUniversalFeature.PartType.extract(["Vbp"]),
});

export const DeprecatedGermanAdpositionSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanAdpositionInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanAdpositionInherentFeaturesSchema,
	pos: "ADP",
});
