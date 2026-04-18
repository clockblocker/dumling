import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-ADJ.html
const EnglishAdjectiveExtPos = DeprecatedUniversalFeature.ExtPos.extract([
	"ADP",
	"ADV",
	"SCONJ",
]);

// https://universaldependencies.org/u/feat/NumForm.html
const EnglishAdjectiveNumForm = DeprecatedEnglishFeature.NumForm.extract([
	"Combi",
	"Word",
]);

// https://universaldependencies.org/u/feat/NumType.html
const EnglishAdjectiveNumType = DeprecatedEnglishFeature.NumType.extract(["Frac", "Ord"]);

// https://universaldependencies.org/u/feat/Style.html
const EnglishAdjectiveStyle = DeprecatedEnglishFeature.Style.extract(["Expr"]);

const EnglishAdjectiveInflectionalFeaturesSchema = deprecatedFeatureSchema({
	degree: DeprecatedEnglishFeature.Degree, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Degree.html
});

const EnglishAdjectiveInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishAdjectiveExtPos, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-ADJ.html
	numForm: EnglishAdjectiveNumForm, // https://universaldependencies.org/u/feat/NumForm.html
	numType: EnglishAdjectiveNumType, // https://universaldependencies.org/u/feat/NumType.html
	style: EnglishAdjectiveStyle, // https://universaldependencies.org/u/feat/Style.html
});

export const DeprecatedEnglishAdjectiveSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishAdjectiveInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishAdjectiveInherentFeaturesSchema,
	pos: "ADJ",
});
