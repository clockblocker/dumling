import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import {
	deprecatedFeatureSchema,
	deprecatedFeatureValueSet,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedBuildEnglishLexemeBundle } from "../shared/build-english-lexeme-bundle";
import { DeprecatedEnglishFeature } from "../shared/english-common-enums";

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-PRON.html
const EnglishPronounExtPos = DeprecatedUniversalFeature.ExtPos.extract(["ADV", "PRON"]);

// https://universaldependencies.org/docs/en/feat/PronType.html
const EnglishPronounPronType = DeprecatedEnglishFeature.PronType.extract([
	"Dem",
	"Emp",
	"Ind",
	"Int",
	"Neg",
	"Prs",
	"Rcp",
	"Rel",
	"Tot",
]);

// https://universaldependencies.org/u/feat/Style.html
const EnglishPronounStyle = DeprecatedEnglishFeature.Style.extract([
	"Arch",
	"Coll",
	"Expr",
	"Slng",
	"Vrnc",
]);

// https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Number.html
const EnglishPronounNumber = DeprecatedEnglishFeature.Number.extract(["Plur", "Sing"]);

const EnglishPronounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedEnglishFeature.Case, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Case.html
	gender: DeprecatedEnglishFeature.Gender, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Gender.html
	number: EnglishPronounNumber,
	reflex: DeprecatedUniversalFeature.Reflex,
});

const EnglishPronounInherentFeaturesSchema = deprecatedFeatureSchema({
	abbr: DeprecatedUniversalFeature.Abbr,
	extPos: EnglishPronounExtPos, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-pos-PRON.html
	person: DeprecatedEnglishFeature.Person, // https://universaldependencies.org/treebanks/en_ewt/en_ewt-feat-Person.html
	poss: DeprecatedUniversalFeature.Poss,
	pronType: deprecatedFeatureValueSet(EnglishPronounPronType), // https://universaldependencies.org/docs/en/feat/PronType.html
	style: EnglishPronounStyle, // https://universaldependencies.org/u/feat/Style.html
});

export const DeprecatedEnglishPronounSchemas = deprecatedBuildEnglishLexemeBundle({
	inflectionalFeaturesSchema: EnglishPronounInflectionalFeaturesSchema,
	inherentFeaturesSchema: EnglishPronounInherentFeaturesSchema,
	pos: "PRON",
});
