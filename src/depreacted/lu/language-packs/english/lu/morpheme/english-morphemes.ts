import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { deprecatedBuildEnglishMorphemeBundle } from "./shared/build-english-morpheme-bundle";

const EnglishCircumfixBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Circumfix",
});
const EnglishCliticBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Clitic",
});
const EnglishDuplifixBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Duplifix",
});
const EnglishInfixBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Infix",
});
const EnglishInterfixBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Interfix",
});
const EnglishPrefixBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Prefix",
});
const EnglishRootBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Root",
});
const EnglishSuffixBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Suffix",
});
const EnglishSuffixoidBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Suffixoid",
});
const EnglishToneMarkingBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "ToneMarking",
});
const EnglishTransfixBundle = deprecatedBuildEnglishMorphemeBundle({
	morphemeKind: "Transfix",
});

export const DeprecatedEnglishMorphemeLemmaSchemas = {
	Circumfix: EnglishCircumfixBundle.LemmaSchema,
	Clitic: EnglishCliticBundle.LemmaSchema,
	Duplifix: EnglishDuplifixBundle.LemmaSchema,
	Infix: EnglishInfixBundle.LemmaSchema,
	Interfix: EnglishInterfixBundle.LemmaSchema,
	Prefix: EnglishPrefixBundle.LemmaSchema,
	Root: EnglishRootBundle.LemmaSchema,
	Suffix: EnglishSuffixBundle.LemmaSchema,
	Suffixoid: EnglishSuffixoidBundle.LemmaSchema,
	ToneMarking: EnglishToneMarkingBundle.LemmaSchema,
	Transfix: EnglishTransfixBundle.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Morpheme"];

export const DeprecatedEnglishLemmaMorphemeSurfaceSchemas = {
	Circumfix: EnglishCircumfixBundle.LemmaSurfaceSchema,
	Clitic: EnglishCliticBundle.LemmaSurfaceSchema,
	Duplifix: EnglishDuplifixBundle.LemmaSurfaceSchema,
	Infix: EnglishInfixBundle.LemmaSurfaceSchema,
	Interfix: EnglishInterfixBundle.LemmaSurfaceSchema,
	Prefix: EnglishPrefixBundle.LemmaSurfaceSchema,
	Root: EnglishRootBundle.LemmaSurfaceSchema,
	Suffix: EnglishSuffixBundle.LemmaSurfaceSchema,
	Suffixoid: EnglishSuffixoidBundle.LemmaSurfaceSchema,
	ToneMarking: EnglishToneMarkingBundle.LemmaSurfaceSchema,
	Transfix: EnglishTransfixBundle.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Morpheme"];
