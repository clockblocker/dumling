import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewAdpositionInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const HebrewAdpositionInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	case: DeprecatedHebrewFeature.Case.extract(["Acc", "Gen"]),
});

export const DeprecatedHebrewAdpositionSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema: HebrewAdpositionInflectionalFeaturesSchema,
	inherentFeaturesSchema: HebrewAdpositionInherentFeaturesSchema,
	pos: "ADP",
});
