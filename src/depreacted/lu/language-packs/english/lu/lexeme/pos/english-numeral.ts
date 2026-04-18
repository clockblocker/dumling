import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-NUM.html
const EnglishNumeralExtPos = DeprecatedUniversalFeature.ExtPos.extract(["PROPN"]);

// https://universaldependencies.org/u/feat/NumForm.html
const EnglishNumeralNumForm = DeprecatedEnglishFeature.NumForm.extract([
	"Digit",
	"Roman",
	"Word",
]);

// https://universaldependencies.org/u/feat/NumType.html
const EnglishNumeralNumType = DeprecatedEnglishFeature.NumType.extract(["Card", "Frac"]);

const EnglishNumeralInflectionalFeaturesSchema = deprecatedFeatureSchema({});

const EnglishNumeralInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishNumeralExtPos, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-NUM.html
	numForm: EnglishNumeralNumForm, // https://universaldependencies.org/u/feat/NumForm.html
	numType: EnglishNumeralNumType, // https://universaldependencies.org/u/feat/NumType.html
});

export const DeprecatedEnglishNumeralSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishNumeralInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishNumeralInherentFeaturesSchema,
	pos: "NUM",
});
