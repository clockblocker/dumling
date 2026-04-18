import type * as z from "zod/v3";

import type { DeprecatedPrettify } from "../../../../types/helpers";
import { DeprecatedDiscourseFormulaRoleSchema } from "./custom/discourse-formula-role";
import { DeprecatedGovernedCase } from "./custom/governed-case";
import { DeprecatedHasGovPrep } from "./custom/governed-preposition";
import { DeprecatedLexicallyReflexive } from "./custom/lexically-reflexive";
import { DeprecatedPhrasal } from "./custom/phrasal";
import { DeprecatedHasSepPrefix } from "./custom/separable";
import { DeprecatedAbbr } from "./ud/abbr";
import { DeprecatedAdpType } from "./ud/adp-type";
import { DeprecatedAnimacy } from "./ud/animacy";
import { DeprecatedAspect } from "./ud/aspect";
import { DeprecatedCase } from "./ud/case";
import { DeprecatedClusivity } from "./ud/clusivity";
import { DeprecatedConjType } from "./ud/conj-type";
import { DeprecatedDefinite } from "./ud/definite";
import { DeprecatedDegree } from "./ud/degree";
import { DeprecatedDeixis } from "./ud/deixis";
import { DeprecatedDeixisRef } from "./ud/deixis-ref";
import { DeprecatedEvident } from "./ud/evident";
import { DeprecatedExtPos } from "./ud/ext-pos";
import { DeprecatedForeign } from "./ud/foreign";
import { DeprecatedGender } from "./ud/gender";
import { DeprecatedHebBinyan } from "./ud/heb-binyan";
import { DeprecatedHebExistential } from "./ud/heb-existential";
import { DeprecatedHyph } from "./ud/hyph";
import { DeprecatedMood } from "./ud/mood";
import { DeprecatedNounClass } from "./ud/noun-class";
import { DeprecatedNumForm } from "./ud/num-form";
import { DeprecatedNumType } from "./ud/num-type";
import { DeprecatedGrammaticalNumber } from "./ud/number";
import { DeprecatedPartType } from "./ud/part-type";
import { DeprecatedPerson } from "./ud/person";
import { DeprecatedPolarity } from "./ud/polarity";
import { DeprecatedPolite } from "./ud/polite";
import { DeprecatedPoss } from "./ud/poss";
import { DeprecatedPrefix } from "./ud/prefix";
import { DeprecatedPronType } from "./ud/pron-type";
import { DeprecatedPunctType } from "./ud/punct-type";
import { DeprecatedReflex } from "./ud/reflex";
import { DeprecatedStyle } from "./ud/style";
import { DeprecatedTense } from "./ud/tense";
import { DeprecatedVariant } from "./ud/variant";
import { DeprecatedVerbForm } from "./ud/verb-form";
import { DeprecatedVerbType } from "./ud/verb-type";
import { DeprecatedVoice } from "./ud/voice";

export const DeprecatedUniversalFeature = {
	Abbr: DeprecatedAbbr,
	AdpType: DeprecatedAdpType,
	Animacy: DeprecatedAnimacy,
	Aspect: DeprecatedAspect,
	Case: DeprecatedCase,
	Clusivity: DeprecatedClusivity,
	ConjType: DeprecatedConjType,
	Definite: DeprecatedDefinite,
	Degree: DeprecatedDegree,
	Deixis: DeprecatedDeixis,
	DeixisRef: DeprecatedDeixisRef,
	DiscourseFormulaRole: DeprecatedDiscourseFormulaRoleSchema,
	Evident: DeprecatedEvident,
	ExtPos: DeprecatedExtPos,
	Foreign: DeprecatedForeign,
	Gender: DeprecatedGender,
	GovernedCase: DeprecatedGovernedCase,
	GrammaticalNumber: DeprecatedGrammaticalNumber,
	HasGovPrep: DeprecatedHasGovPrep,
	HasSepPrefix: DeprecatedHasSepPrefix,
	HebBinyan: DeprecatedHebBinyan,
	HebExistential: DeprecatedHebExistential,
	Hyph: DeprecatedHyph,
	LexicallyReflexive: DeprecatedLexicallyReflexive,
	Mood: DeprecatedMood,
	NounClass: DeprecatedNounClass,
	NumForm: DeprecatedNumForm,
	NumType: DeprecatedNumType,
	PartType: DeprecatedPartType,
	Person: DeprecatedPerson,
	Phrasal: DeprecatedPhrasal,
	Polarity: DeprecatedPolarity,
	Polite: DeprecatedPolite,
	Poss: DeprecatedPoss,
	Prefix: DeprecatedPrefix,
	PronType: DeprecatedPronType,
	PunctType: DeprecatedPunctType,
	Reflex: DeprecatedReflex,
	Style: DeprecatedStyle,
	Tense: DeprecatedTense,
	// Typo is exluded from the list of features, because in this system, Selections are responsible forhandeling typos
	Variant: DeprecatedVariant,
	VerbForm: DeprecatedVerbForm,
	VerbType: DeprecatedVerbType,
	Voice: DeprecatedVoice,
} as const;

export type DeprecatedUniversalFeatureKey = keyof typeof DeprecatedUniversalFeature;

export type DeprecatedUniversalFeatureValue<
	K extends DeprecatedUniversalFeatureKey = DeprecatedUniversalFeatureKey,
> = z.infer<(typeof DeprecatedUniversalFeature)[K]>;

export type DeprecatedFeatureValueSet<T> = T | readonly [T, ...T[]];

export type DeprecatedAbstractFeatures = DeprecatedPrettify<{
	adpType: DeprecatedUniversalFeatureValue<"AdpType">;
	abbr: DeprecatedUniversalFeatureValue<"Abbr">;
	animacy: DeprecatedUniversalFeatureValue<"Animacy">;
	aspect: DeprecatedUniversalFeatureValue<"Aspect">;
	case: DeprecatedUniversalFeatureValue<"Case">;
	clusivity: DeprecatedUniversalFeatureValue<"Clusivity">;
	conjType: DeprecatedUniversalFeatureValue<"ConjType">;
	definite: DeprecatedUniversalFeatureValue<"Definite">;
	degree: DeprecatedUniversalFeatureValue<"Degree">;
	deixis: DeprecatedUniversalFeatureValue<"Deixis">;
	deixisRef: DeprecatedUniversalFeatureValue<"DeixisRef">;
	evident: DeprecatedUniversalFeatureValue<"Evident">;
	extPos: DeprecatedUniversalFeatureValue<"ExtPos">;
	foreign: DeprecatedUniversalFeatureValue<"Foreign">;
	gender: DeprecatedFeatureValueSet<DeprecatedUniversalFeatureValue<"Gender">>;
	"gender[psor]": DeprecatedFeatureValueSet<DeprecatedUniversalFeatureValue<"Gender">>;
	governedCase: DeprecatedUniversalFeatureValue<"GovernedCase">;
	hasGovPrep: DeprecatedUniversalFeatureValue<"HasGovPrep">;
	hasSepPrefix: DeprecatedUniversalFeatureValue<"HasSepPrefix">;
	hebBinyan: DeprecatedUniversalFeatureValue<"HebBinyan">;
	hebExistential: DeprecatedUniversalFeatureValue<"HebExistential">;
	hyph: DeprecatedUniversalFeatureValue<"Hyph">;
	lexicallyReflexive: DeprecatedUniversalFeatureValue<"LexicallyReflexive">;
	phrasal: DeprecatedUniversalFeatureValue<"Phrasal">;
	mood: DeprecatedUniversalFeatureValue<"Mood">;
	nounClass: DeprecatedUniversalFeatureValue<"NounClass">;
	numForm: DeprecatedUniversalFeatureValue<"NumForm">;
	number: DeprecatedFeatureValueSet<DeprecatedUniversalFeatureValue<"GrammaticalNumber">>;
	"number[psor]": DeprecatedUniversalFeatureValue<"GrammaticalNumber">;
	numType: DeprecatedUniversalFeatureValue<"NumType">;
	partType: DeprecatedUniversalFeatureValue<"PartType">;
	person: DeprecatedFeatureValueSet<DeprecatedUniversalFeatureValue<"Person">>;
	polarity: DeprecatedUniversalFeatureValue<"Polarity">;
	polite: DeprecatedUniversalFeatureValue<"Polite">;
	poss: DeprecatedUniversalFeatureValue<"Poss">;
	prefix: DeprecatedUniversalFeatureValue<"Prefix">;
	pronType: DeprecatedFeatureValueSet<DeprecatedUniversalFeatureValue<"PronType">>;
	punctType: DeprecatedUniversalFeatureValue<"PunctType">;
	reflex: DeprecatedUniversalFeatureValue<"Reflex">;
	style: DeprecatedUniversalFeatureValue<"Style">;
	tense: DeprecatedUniversalFeatureValue<"Tense">;
	variant: DeprecatedUniversalFeatureValue<"Variant">;
	verbForm: DeprecatedUniversalFeatureValue<"VerbForm">;
	verbType: DeprecatedUniversalFeatureValue<"VerbType">;
	voice: DeprecatedUniversalFeatureValue<"Voice">;
}>;
