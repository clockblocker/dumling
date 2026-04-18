import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { deprecatedBuildGermanMorphemeBundle } from "./shared/build-german-morpheme-bundle";

const GermanCircumfixBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Circumfix",
});
const GermanCliticBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Clitic",
});
const GermanDuplifixBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Duplifix",
});
const GermanInfixBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Infix",
});
const GermanInterfixBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Interfix",
});
const GermanPrefixBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Prefix",
});
const GermanRootBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Root",
});
const GermanSuffixBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Suffix",
});
const GermanSuffixoidBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Suffixoid",
});
const GermanToneMarkingBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "ToneMarking",
});
const GermanTransfixBundle = deprecatedBuildGermanMorphemeBundle({
	morphemeKind: "Transfix",
});

export const DeprecatedGermanMorphemeLemmaSchemas = {
	Circumfix: GermanCircumfixBundle.LemmaSchema,
	Clitic: GermanCliticBundle.LemmaSchema,
	Duplifix: GermanDuplifixBundle.LemmaSchema,
	Infix: GermanInfixBundle.LemmaSchema,
	Interfix: GermanInterfixBundle.LemmaSchema,
	Prefix: GermanPrefixBundle.LemmaSchema,
	Root: GermanRootBundle.LemmaSchema,
	Suffix: GermanSuffixBundle.LemmaSchema,
	Suffixoid: GermanSuffixoidBundle.LemmaSchema,
	ToneMarking: GermanToneMarkingBundle.LemmaSchema,
	Transfix: GermanTransfixBundle.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Morpheme"];

export const DeprecatedGermanLemmaMorphemeSurfaceSchemas = {
	Circumfix: GermanCircumfixBundle.LemmaSurfaceSchema,
	Clitic: GermanCliticBundle.LemmaSurfaceSchema,
	Duplifix: GermanDuplifixBundle.LemmaSurfaceSchema,
	Infix: GermanInfixBundle.LemmaSurfaceSchema,
	Interfix: GermanInterfixBundle.LemmaSurfaceSchema,
	Prefix: GermanPrefixBundle.LemmaSurfaceSchema,
	Root: GermanRootBundle.LemmaSurfaceSchema,
	Suffix: GermanSuffixBundle.LemmaSurfaceSchema,
	Suffixoid: GermanSuffixoidBundle.LemmaSurfaceSchema,
	ToneMarking: GermanToneMarkingBundle.LemmaSurfaceSchema,
	Transfix: GermanTransfixBundle.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Morpheme"];
