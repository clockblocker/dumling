import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";

const GermanCoordinatingConjunctionInflectionalFeaturesSchema = deprecatedFeatureSchema(
	{},
);

const GermanCoordinatingConjunctionInherentFeaturesSchema = deprecatedFeatureSchema({
	conjType: DeprecatedUniversalFeature.ConjType.extract(["Comp"]),
});

export const DeprecatedGermanCoordinatingConjunctionSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema:
		GermanCoordinatingConjunctionInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanCoordinatingConjunctionInherentFeaturesSchema,
	pos: "CCONJ",
});
