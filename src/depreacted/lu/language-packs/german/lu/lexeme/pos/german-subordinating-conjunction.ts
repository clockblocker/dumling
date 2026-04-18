import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";

const GermanSubordinatingConjunctionInflectionalFeaturesSchema = deprecatedFeatureSchema(
	{},
);

const GermanSubordinatingConjunctionInherentFeaturesSchema = deprecatedFeatureSchema({
	conjType: DeprecatedUniversalFeature.ConjType.extract(["Comp"]),
});

export const DeprecatedGermanSubordinatingConjunctionSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema:
		GermanSubordinatingConjunctionInflectionalFeaturesSchema,
	inherentFeaturesSchema:
		GermanSubordinatingConjunctionInherentFeaturesSchema,
	pos: "SCONJ",
});
