import type {
	LemmaSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { buildHebrewMorphemeBundle } from "./shared/build-hebrew-morpheme-bundle";

const HebrewCircumfixBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Circumfix",
});
const HebrewCliticBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Clitic",
});
const HebrewDuplifixBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Duplifix",
});
const HebrewInfixBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Infix",
});
const HebrewInterfixBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Interfix",
});
const HebrewPrefixBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Prefix",
});
const HebrewRootBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Root",
});
const HebrewSuffixBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Suffix",
});
const HebrewSuffixoidBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Suffixoid",
});
const HebrewToneMarkingBundle = buildHebrewMorphemeBundle({
	morphemeKind: "ToneMarking",
});
const HebrewTransfixBundle = buildHebrewMorphemeBundle({
	morphemeKind: "Transfix",
});

export const HebrewMorphemeLemmaSchemas = {
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
} satisfies LemmaSchemaLanguageShape["Morpheme"];

export const HebrewLemmaMorphemeSurfaceSchemas = {
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
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Morpheme"];
