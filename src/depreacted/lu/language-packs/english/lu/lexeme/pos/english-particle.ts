import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-PART.html
const EnglishParticleExtPos = DeprecatedUniversalFeature.ExtPos.extract(["CCONJ"]);

const EnglishParticleInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const EnglishParticleInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishParticleExtPos,
	polarity: DeprecatedEnglishFeature.Polarity.extract(["Neg"]), // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Polarity.html
});

export const DeprecatedEnglishParticleSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishParticleInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishParticleInherentFeaturesSchema,
	pos: "PART",
});
