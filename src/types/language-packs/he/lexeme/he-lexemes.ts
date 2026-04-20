import type { AbstractFeatureValue } from "../../../abstract/features/features";
import type { OrthographicStatus } from "../../../core/enums";
import type {
	EmptyFeatures,
	HeFeatureValueSet,
	RequireAtLeastOne,
	ValueOf,
} from "../shared";
import type {
	HeInflectableLexemeBundle,
	HeUninflectableLexemeBundle,
} from "./shared/build-he-lexeme-bundle";

type HeCase = Extract<AbstractFeatureValue<"case">, "Acc" | "Gen" | "Tem">;
type HeDefinite = Extract<AbstractFeatureValue<"definite">, "Cons" | "Def">;
type HeGender = Extract<AbstractFeatureValue<"gender">, "Fem" | "Masc">;
type HeMood = Extract<AbstractFeatureValue<"mood">, "Imp">;
type HeNumber = Extract<AbstractFeatureValue<"number">, "Dual" | "Plur" | "Sing">;
type HePerson = Extract<AbstractFeatureValue<"person">, "1" | "2" | "3">;
type HePolarity = Extract<AbstractFeatureValue<"polarity">, "Neg" | "Pos">;
type HePronType = Extract<
	AbstractFeatureValue<"pronType">,
	"Art" | "Dem" | "Ind" | "Int" | "Prs"
>;
type HeTense = Extract<AbstractFeatureValue<"tense">, "Fut" | "Past">;
type HeVerbForm = Extract<AbstractFeatureValue<"verbForm">, "Inf" | "Part">;
type HeVerbType = Extract<AbstractFeatureValue<"verbType">, "Cop" | "Mod">;
type HeVoice = Extract<AbstractFeatureValue<"voice">, "Act" | "Mid" | "Pass">;

type HeAdjectiveInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
};

type HeAdjectiveInflectionalFeatures = RequireAtLeastOne<{
	definite?: HeDefinite;
	gender?: HeFeatureValueSet<HeGender>;
	number?: Extract<HeNumber, "Plur" | "Sing">;
}>;

type HeAdpositionInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	case?: Extract<HeCase, "Acc" | "Gen">;
};

type HeAdverbInherentFeatures = {
	prefix?: AbstractFeatureValue<"prefix">;
};

type HeAuxiliaryInherentFeatures = {
	verbType?: HeVerbType;
};

type HeAuxiliaryInflectionalFeatures = RequireAtLeastOne<{
	gender?: HeFeatureValueSet<HeGender>;
	number?: Extract<HeNumber, "Plur" | "Sing">;
	person?: HeFeatureValueSet<HePerson>;
	polarity?: HePolarity;
	tense?: HeTense;
	verbForm?: HeVerbForm;
}>;

type HeDeterminerInherentFeatures = {
	pronType?: Extract<HePronType, "Art" | "Int">;
};

type HeDeterminerInflectionalFeatures = RequireAtLeastOne<{
	definite?: HeDefinite;
	gender?: HeFeatureValueSet<HeGender>;
	number?: Extract<HeNumber, "Plur" | "Sing">;
}>;

type HeNounInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	gender?: HeFeatureValueSet<HeGender>;
};

type HeNounInflectionalFeatures = RequireAtLeastOne<{
	definite?: HeDefinite;
	number?: HeFeatureValueSet<Extract<HeNumber, "Dual" | "Plur">>;
}>;

type HeNumeralInflectionalFeatures = RequireAtLeastOne<{
	definite?: HeDefinite;
	gender?: HeFeatureValueSet<HeGender>;
	number?: HeFeatureValueSet<Extract<HeNumber, "Dual" | "Plur">>;
}>;

type HePronounInherentFeatures = {
	definite?: Extract<HeDefinite, "Def">;
	pronType?: Extract<HePronType, "Dem" | "Ind" | "Int" | "Prs">;
	reflex?: AbstractFeatureValue<"reflex">;
};

type HePronounInflectionalFeatures = RequireAtLeastOne<{
	gender?: HeFeatureValueSet<HeGender>;
	number?: Extract<HeNumber, "Plur" | "Sing">;
	person?: HePerson;
}>;

type HeProperNounInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	gender?: HeFeatureValueSet<HeGender>;
};

type HeProperNounInflectionalFeatures = RequireAtLeastOne<{
	number?: Extract<HeNumber, "Plur" | "Sing">;
}>;

type HeSubordinatingConjunctionInherentFeatures = {
	case?: Extract<HeCase, "Tem">;
};

type HeVerbInherentFeatures = {
	hebBinyan?: AbstractFeatureValue<"hebBinyan">;
	hebExistential?: AbstractFeatureValue<"hebExistential">;
};

type HeVerbInflectionalFeatures = RequireAtLeastOne<{
	definite?: HeDefinite;
	gender?: HeFeatureValueSet<HeGender>;
	mood?: HeMood;
	number?: Extract<HeNumber, "Plur" | "Sing">;
	person?: HeFeatureValueSet<HePerson>;
	polarity?: HePolarity;
	tense?: HeTense;
	verbForm?: HeVerbForm;
	voice?: HeVoice;
}>;

type HeAdjectiveBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"ADJ",
		HeAdjectiveInherentFeatures,
		HeAdjectiveInflectionalFeatures,
		OS
	>;
type HeAdpositionBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeUninflectableLexemeBundle<"ADP", HeAdpositionInherentFeatures, OS>;
type HeAdverbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeUninflectableLexemeBundle<"ADV", HeAdverbInherentFeatures, OS>;
type HeAuxiliaryBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"AUX",
		HeAuxiliaryInherentFeatures,
		HeAuxiliaryInflectionalFeatures,
		OS
	>;
type HeCoordinatingConjunctionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeUninflectableLexemeBundle<"CCONJ", EmptyFeatures, OS>;
type HeDeterminerBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"DET",
		HeDeterminerInherentFeatures,
		HeDeterminerInflectionalFeatures,
		OS
	>;
type HeInterjectionBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeUninflectableLexemeBundle<"INTJ", EmptyFeatures, OS>;
type HeNounBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"NOUN",
		HeNounInherentFeatures,
		HeNounInflectionalFeatures,
		OS
	>;
type HeNumeralBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"NUM",
		EmptyFeatures,
		HeNumeralInflectionalFeatures,
		OS
	>;
type HePronounBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"PRON",
		HePronounInherentFeatures,
		HePronounInflectionalFeatures,
		OS
	>;
type HeProperNounBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"PROPN",
		HeProperNounInherentFeatures,
		HeProperNounInflectionalFeatures,
		OS
	>;
type HePunctuationBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeUninflectableLexemeBundle<"PUNCT", EmptyFeatures, OS>;
type HeSubordinatingConjunctionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeUninflectableLexemeBundle<"SCONJ", HeSubordinatingConjunctionInherentFeatures, OS>;
type HeSymbolBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeUninflectableLexemeBundle<"SYM", EmptyFeatures, OS>;
type HeVerbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeInflectableLexemeBundle<
		"VERB",
		HeVerbInherentFeatures,
		HeVerbInflectionalFeatures,
		OS
	>;
type HeOtherBundle<OS extends OrthographicStatus = OrthographicStatus> =
	HeUninflectableLexemeBundle<"X", EmptyFeatures, OS>;

export type HeAdjectiveLemma = HeAdjectiveBundle["Lemma"];
export type HeAdjectiveLemmaSurface = HeAdjectiveBundle["LemmaSurface"];
export type HeAdjectiveInflectionSurface = HeAdjectiveBundle["InflectionSurface"];
export type HeAdjectiveLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeAdjectiveBundle<OS>["LemmaSelection"];
export type HeAdjectiveInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeAdjectiveBundle<OS>["InflectionSelection"];

export type HeAdpositionLemma = HeAdpositionBundle["Lemma"];
export type HeAdpositionLemmaSurface = HeAdpositionBundle["LemmaSurface"];
export type HeAdpositionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeAdpositionBundle<OS>["LemmaSelection"];

export type HeAdverbLemma = HeAdverbBundle["Lemma"];
export type HeAdverbLemmaSurface = HeAdverbBundle["LemmaSurface"];
export type HeAdverbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeAdverbBundle<OS>["LemmaSelection"];

export type HeAuxiliaryLemma = HeAuxiliaryBundle["Lemma"];
export type HeAuxiliaryLemmaSurface = HeAuxiliaryBundle["LemmaSurface"];
export type HeAuxiliaryInflectionSurface = HeAuxiliaryBundle["InflectionSurface"];
export type HeAuxiliaryLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeAuxiliaryBundle<OS>["LemmaSelection"];
export type HeAuxiliaryInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeAuxiliaryBundle<OS>["InflectionSelection"];

export type HeCoordinatingConjunctionLemma =
	HeCoordinatingConjunctionBundle["Lemma"];
export type HeCoordinatingConjunctionLemmaSurface =
	HeCoordinatingConjunctionBundle["LemmaSurface"];
export type HeCoordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeCoordinatingConjunctionBundle<OS>["LemmaSelection"];

export type HeDeterminerLemma = HeDeterminerBundle["Lemma"];
export type HeDeterminerLemmaSurface = HeDeterminerBundle["LemmaSurface"];
export type HeDeterminerInflectionSurface = HeDeterminerBundle["InflectionSurface"];
export type HeDeterminerLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeDeterminerBundle<OS>["LemmaSelection"];
export type HeDeterminerInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeDeterminerBundle<OS>["InflectionSelection"];

export type HeInterjectionLemma = HeInterjectionBundle["Lemma"];
export type HeInterjectionLemmaSurface = HeInterjectionBundle["LemmaSurface"];
export type HeInterjectionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeInterjectionBundle<OS>["LemmaSelection"];

export type HeNounLemma = HeNounBundle["Lemma"];
export type HeNounLemmaSurface = HeNounBundle["LemmaSurface"];
export type HeNounInflectionSurface = HeNounBundle["InflectionSurface"];
export type HeNounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeNounBundle<OS>["LemmaSelection"];
export type HeNounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeNounBundle<OS>["InflectionSelection"];

export type HeNumeralLemma = HeNumeralBundle["Lemma"];
export type HeNumeralLemmaSurface = HeNumeralBundle["LemmaSurface"];
export type HeNumeralInflectionSurface = HeNumeralBundle["InflectionSurface"];
export type HeNumeralLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeNumeralBundle<OS>["LemmaSelection"];
export type HeNumeralInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeNumeralBundle<OS>["InflectionSelection"];

export type HePronounLemma = HePronounBundle["Lemma"];
export type HePronounLemmaSurface = HePronounBundle["LemmaSurface"];
export type HePronounInflectionSurface = HePronounBundle["InflectionSurface"];
export type HePronounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HePronounBundle<OS>["LemmaSelection"];
export type HePronounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HePronounBundle<OS>["InflectionSelection"];

export type HeProperNounLemma = HeProperNounBundle["Lemma"];
export type HeProperNounLemmaSurface = HeProperNounBundle["LemmaSurface"];
export type HeProperNounInflectionSurface =
	HeProperNounBundle["InflectionSurface"];
export type HeProperNounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeProperNounBundle<OS>["LemmaSelection"];
export type HeProperNounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeProperNounBundle<OS>["InflectionSelection"];

export type HePunctuationLemma = HePunctuationBundle["Lemma"];
export type HePunctuationLemmaSurface = HePunctuationBundle["LemmaSurface"];
export type HePunctuationLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HePunctuationBundle<OS>["LemmaSelection"];

export type HeSubordinatingConjunctionLemma =
	HeSubordinatingConjunctionBundle["Lemma"];
export type HeSubordinatingConjunctionLemmaSurface =
	HeSubordinatingConjunctionBundle["LemmaSurface"];
export type HeSubordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeSubordinatingConjunctionBundle<OS>["LemmaSelection"];

export type HeSymbolLemma = HeSymbolBundle["Lemma"];
export type HeSymbolLemmaSurface = HeSymbolBundle["LemmaSurface"];
export type HeSymbolLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeSymbolBundle<OS>["LemmaSelection"];

export type HeVerbLemma = HeVerbBundle["Lemma"];
export type HeVerbLemmaSurface = HeVerbBundle["LemmaSurface"];
export type HeVerbInflectionSurface = HeVerbBundle["InflectionSurface"];
export type HeVerbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeVerbBundle<OS>["LemmaSelection"];
export type HeVerbInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeVerbBundle<OS>["InflectionSelection"];

export type HeOtherLemma = HeOtherBundle["Lemma"];
export type HeOtherLemmaSurface = HeOtherBundle["LemmaSurface"];
export type HeOtherLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeOtherBundle<OS>["LemmaSelection"];

export type HeLexemeLemmaBySubKind = {
	ADJ: HeAdjectiveLemma;
	ADP: HeAdpositionLemma;
	ADV: HeAdverbLemma;
	AUX: HeAuxiliaryLemma;
	CCONJ: HeCoordinatingConjunctionLemma;
	DET: HeDeterminerLemma;
	INTJ: HeInterjectionLemma;
	NOUN: HeNounLemma;
	NUM: HeNumeralLemma;
	PRON: HePronounLemma;
	PROPN: HeProperNounLemma;
	PUNCT: HePunctuationLemma;
	SCONJ: HeSubordinatingConjunctionLemma;
	SYM: HeSymbolLemma;
	VERB: HeVerbLemma;
	X: HeOtherLemma;
};

export type HeLexemeLemma = ValueOf<HeLexemeLemmaBySubKind>;

export type HeLemmaLexemeSurfaceBySubKind = {
	ADJ: HeAdjectiveLemmaSurface;
	ADP: HeAdpositionLemmaSurface;
	ADV: HeAdverbLemmaSurface;
	AUX: HeAuxiliaryLemmaSurface;
	CCONJ: HeCoordinatingConjunctionLemmaSurface;
	DET: HeDeterminerLemmaSurface;
	INTJ: HeInterjectionLemmaSurface;
	NOUN: HeNounLemmaSurface;
	NUM: HeNumeralLemmaSurface;
	PRON: HePronounLemmaSurface;
	PROPN: HeProperNounLemmaSurface;
	PUNCT: HePunctuationLemmaSurface;
	SCONJ: HeSubordinatingConjunctionLemmaSurface;
	SYM: HeSymbolLemmaSurface;
	VERB: HeVerbLemmaSurface;
	X: HeOtherLemmaSurface;
};

export type HeLemmaLexemeSurface = ValueOf<HeLemmaLexemeSurfaceBySubKind>;

export type HeInflectionLexemeSurfaceBySubKind = {
	ADJ: HeAdjectiveInflectionSurface;
	AUX: HeAuxiliaryInflectionSurface;
	DET: HeDeterminerInflectionSurface;
	NOUN: HeNounInflectionSurface;
	NUM: HeNumeralInflectionSurface;
	PRON: HePronounInflectionSurface;
	PROPN: HeProperNounInflectionSurface;
	VERB: HeVerbInflectionSurface;
};

export type HeInflectableLexemeSubKind =
	keyof HeInflectionLexemeSurfaceBySubKind;
export type HeInflectionLexemeSurface =
	ValueOf<HeInflectionLexemeSurfaceBySubKind>;
export type HeLexemeSurface = HeLemmaLexemeSurface | HeInflectionLexemeSurface;

export type HeLemmaLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: HeAdjectiveLemmaSelection<OS>;
	ADP: HeAdpositionLemmaSelection<OS>;
	ADV: HeAdverbLemmaSelection<OS>;
	AUX: HeAuxiliaryLemmaSelection<OS>;
	CCONJ: HeCoordinatingConjunctionLemmaSelection<OS>;
	DET: HeDeterminerLemmaSelection<OS>;
	INTJ: HeInterjectionLemmaSelection<OS>;
	NOUN: HeNounLemmaSelection<OS>;
	NUM: HeNumeralLemmaSelection<OS>;
	PRON: HePronounLemmaSelection<OS>;
	PROPN: HeProperNounLemmaSelection<OS>;
	PUNCT: HePunctuationLemmaSelection<OS>;
	SCONJ: HeSubordinatingConjunctionLemmaSelection<OS>;
	SYM: HeSymbolLemmaSelection<OS>;
	VERB: HeVerbLemmaSelection<OS>;
	X: HeOtherLemmaSelection<OS>;
};

export type HeLemmaLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HeLemmaLexemeSelectionBySubKind<OS>>;

export type HeInflectionLexemeSelectionBySubKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	ADJ: HeAdjectiveInflectionSelection<OS>;
	AUX: HeAuxiliaryInflectionSelection<OS>;
	DET: HeDeterminerInflectionSelection<OS>;
	NOUN: HeNounInflectionSelection<OS>;
	NUM: HeNumeralInflectionSelection<OS>;
	PRON: HePronounInflectionSelection<OS>;
	PROPN: HeProperNounInflectionSelection<OS>;
	VERB: HeVerbInflectionSelection<OS>;
};

export type HeInflectionLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = ValueOf<HeInflectionLexemeSelectionBySubKind<OS>>;

export type HeLexemeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeLemmaLexemeSelection<OS> | HeInflectionLexemeSelection<OS>;
