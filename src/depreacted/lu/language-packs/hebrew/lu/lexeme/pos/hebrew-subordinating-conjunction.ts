import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildHebrewLexemeBundle } from "../shared/build-hebrew-lexeme-bundle";
import { DeprecatedHebrewFeature } from "../shared/hebrew-common-enums";

const HebrewSubordinatingConjunctionInflectionalFeaturesSchema = deprecatedFeatureSchema(
	{},
);

const HebrewSubordinatingConjunctionInherentFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedHebrewFeature.Case.extract(["Tem"]),
});

export const DeprecatedHebrewSubordinatingConjunctionSchemas = deprecatedBuildHebrewLexemeBundle({
	inflectionalFeaturesSchema:
		HebrewSubordinatingConjunctionInflectionalFeaturesSchema,
	inherentFeaturesSchema:
		HebrewSubordinatingConjunctionInherentFeaturesSchema,
	pos: "SCONJ",
});
