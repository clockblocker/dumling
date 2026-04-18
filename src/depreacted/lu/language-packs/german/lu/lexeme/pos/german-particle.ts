import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildGermanLexemeBundle } from "../shared/build-german-lexeme-bundle";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanParticleInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const GermanParticleInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	foreign: DeprecatedUniversalFeature.Foreign,
	partType: DeprecatedUniversalFeature.PartType.extract(["Inf"]),
	polarity: DeprecatedGermanFeature.Polarity,
});

export const DeprecatedGermanParticleSchemas = deprecatedBuildGermanLexemeBundle({
	inflectionalFeaturesSchema: GermanParticleInflectionalFeaturesSchema,
	inherentFeaturesSchema: GermanParticleInherentFeaturesSchema,
	pos: "PART",
});
