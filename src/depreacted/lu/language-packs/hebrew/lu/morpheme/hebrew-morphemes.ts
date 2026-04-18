import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { deprecatedBuildHebrewMorphemeBundle } from "./shared/build-hebrew-morpheme-bundle";

const HebrewCircumfixBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Circumfix",
});
const HebrewCliticBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Clitic",
});
const HebrewDuplifixBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Duplifix",
});
const HebrewInfixBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Infix",
});
const HebrewInterfixBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Interfix",
});
const HebrewPrefixBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Prefix",
});
const HebrewRootBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Root",
});
const HebrewSuffixBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Suffix",
});
const HebrewSuffixoidBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Suffixoid",
});
const HebrewToneMarkingBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "ToneMarking",
});
const HebrewTransfixBundle = deprecatedBuildHebrewMorphemeBundle({
	morphemeKind: "Transfix",
});

export const DeprecatedHebrewMorphemeLemmaSchemas = {
	Circumfix: HebrewCircumfixBundle.LemmaSchema,
	Clitic: HebrewCliticBundle.LemmaSchema,
	Duplifix: HebrewDuplifixBundle.LemmaSchema,
	Infix: HebrewInfixBundle.LemmaSchema,
	Interfix: HebrewInterfixBundle.LemmaSchema,
	Prefix: HebrewPrefixBundle.LemmaSchema,
	Root: HebrewRootBundle.LemmaSchema,
	Suffix: HebrewSuffixBundle.LemmaSchema,
	Suffixoid: HebrewSuffixoidBundle.LemmaSchema,
	ToneMarking: HebrewToneMarkingBundle.LemmaSchema,
	Transfix: HebrewTransfixBundle.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Morpheme"];

export const DeprecatedHebrewLemmaMorphemeSurfaceSchemas = {
	Circumfix: HebrewCircumfixBundle.LemmaSurfaceSchema,
	Clitic: HebrewCliticBundle.LemmaSurfaceSchema,
	Duplifix: HebrewDuplifixBundle.LemmaSurfaceSchema,
	Infix: HebrewInfixBundle.LemmaSurfaceSchema,
	Interfix: HebrewInterfixBundle.LemmaSurfaceSchema,
	Prefix: HebrewPrefixBundle.LemmaSurfaceSchema,
	Root: HebrewRootBundle.LemmaSurfaceSchema,
	Suffix: HebrewSuffixBundle.LemmaSurfaceSchema,
	Suffixoid: HebrewSuffixoidBundle.LemmaSurfaceSchema,
	ToneMarking: HebrewToneMarkingBundle.LemmaSurfaceSchema,
	Transfix: HebrewTransfixBundle.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Morpheme"];
