import type {
	LemmaSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { buildGermanMorphemeBundle } from "./shared/build-german-morpheme-bundle";

const GermanCircumfixBundle = buildGermanMorphemeBundle({
	morphemeKind: "Circumfix",
});
const GermanCliticBundle = buildGermanMorphemeBundle({
	morphemeKind: "Clitic",
});
const GermanDuplifixBundle = buildGermanMorphemeBundle({
	morphemeKind: "Duplifix",
});
const GermanInfixBundle = buildGermanMorphemeBundle({
	morphemeKind: "Infix",
});
const GermanInterfixBundle = buildGermanMorphemeBundle({
	morphemeKind: "Interfix",
});
const GermanPrefixBundle = buildGermanMorphemeBundle({
	morphemeKind: "Prefix",
});
const GermanRootBundle = buildGermanMorphemeBundle({
	morphemeKind: "Root",
});
const GermanSuffixBundle = buildGermanMorphemeBundle({
	morphemeKind: "Suffix",
});
const GermanSuffixoidBundle = buildGermanMorphemeBundle({
	morphemeKind: "Suffixoid",
});
const GermanToneMarkingBundle = buildGermanMorphemeBundle({
	morphemeKind: "ToneMarking",
});
const GermanTransfixBundle = buildGermanMorphemeBundle({
	morphemeKind: "Transfix",
});

export const GermanMorphemeLemmaSchemas = {
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
} satisfies LemmaSchemaLanguageShape["Morpheme"];

export const GermanLemmaMorphemeSurfaceSchemas = {
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
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Morpheme"];
