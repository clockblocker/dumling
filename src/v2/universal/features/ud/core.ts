import { z } from "zod/v3";

import { DeprecatedAbbr as UdAbbr } from "../../../../depreacted/lu/universal/enums/feature/ud/abbr";
import { DeprecatedAdpType as UdAdpType } from "../../../../depreacted/lu/universal/enums/feature/ud/adp-type";
import { DeprecatedAnimacy as UdAnimacy } from "../../../../depreacted/lu/universal/enums/feature/ud/animacy";
import { DeprecatedAspect as UdAspect } from "../../../../depreacted/lu/universal/enums/feature/ud/aspect";
import { DeprecatedCase as UdCase } from "../../../../depreacted/lu/universal/enums/feature/ud/case";
import { DeprecatedClusivity as UdClusivity } from "../../../../depreacted/lu/universal/enums/feature/ud/clusivity";
import { DeprecatedConjType as UdConjType } from "../../../../depreacted/lu/universal/enums/feature/ud/conj-type";
import { DeprecatedDefinite as UdDefinite } from "../../../../depreacted/lu/universal/enums/feature/ud/definite";
import { DeprecatedDegree as UdDegree } from "../../../../depreacted/lu/universal/enums/feature/ud/degree";
import { DeprecatedDeixis as UdDeixis } from "../../../../depreacted/lu/universal/enums/feature/ud/deixis";
import { DeprecatedDeixisRef as UdDeixisRef } from "../../../../depreacted/lu/universal/enums/feature/ud/deixis-ref";
import { DeprecatedEvident as UdEvident } from "../../../../depreacted/lu/universal/enums/feature/ud/evident";
import { DeprecatedExtPos as UdExtPos } from "../../../../depreacted/lu/universal/enums/feature/ud/ext-pos";
import { DeprecatedForeign as UdForeign } from "../../../../depreacted/lu/universal/enums/feature/ud/foreign";
import { DeprecatedGender as UdGender } from "../../../../depreacted/lu/universal/enums/feature/ud/gender";
import { DeprecatedHebBinyan as UdHebBinyan } from "../../../../depreacted/lu/universal/enums/feature/ud/heb-binyan";
import { DeprecatedHebExistential as UdHebExistential } from "../../../../depreacted/lu/universal/enums/feature/ud/heb-existential";
import { DeprecatedHyph as UdHyph } from "../../../../depreacted/lu/universal/enums/feature/ud/hyph";
import { DeprecatedMood as UdMood } from "../../../../depreacted/lu/universal/enums/feature/ud/mood";
import { DeprecatedNounClass as UdNounClass } from "../../../../depreacted/lu/universal/enums/feature/ud/noun-class";
import { DeprecatedNumForm as UdNumForm } from "../../../../depreacted/lu/universal/enums/feature/ud/num-form";
import { DeprecatedNumType as UdNumType } from "../../../../depreacted/lu/universal/enums/feature/ud/num-type";
import { DeprecatedGrammaticalNumber as UdNumber } from "../../../../depreacted/lu/universal/enums/feature/ud/number";
import { DeprecatedPartType as UdPartType } from "../../../../depreacted/lu/universal/enums/feature/ud/part-type";
import { DeprecatedPerson as UdPerson } from "../../../../depreacted/lu/universal/enums/feature/ud/person";
import { DeprecatedPolarity as UdPolarity } from "../../../../depreacted/lu/universal/enums/feature/ud/polarity";
import { DeprecatedPolite as UdPolite } from "../../../../depreacted/lu/universal/enums/feature/ud/polite";
import { DeprecatedPoss as UdPoss } from "../../../../depreacted/lu/universal/enums/feature/ud/poss";
import { DeprecatedPrefix as UdPrefix } from "../../../../depreacted/lu/universal/enums/feature/ud/prefix";
import { DeprecatedPronType as UdPronType } from "../../../../depreacted/lu/universal/enums/feature/ud/pron-type";
import { DeprecatedPunctType as UdPunctType } from "../../../../depreacted/lu/universal/enums/feature/ud/punct-type";
import { DeprecatedReflex as UdReflex } from "../../../../depreacted/lu/universal/enums/feature/ud/reflex";
import { DeprecatedStyle as UdStyle } from "../../../../depreacted/lu/universal/enums/feature/ud/style";
import { DeprecatedTense as UdTense } from "../../../../depreacted/lu/universal/enums/feature/ud/tense";
import { DeprecatedVariant as UdVariant } from "../../../../depreacted/lu/universal/enums/feature/ud/variant";
import { DeprecatedVerbForm as UdVerbForm } from "../../../../depreacted/lu/universal/enums/feature/ud/verb-form";
import { DeprecatedVerbType as UdVerbType } from "../../../../depreacted/lu/universal/enums/feature/ud/verb-type";
import { DeprecatedVoice as UdVoice } from "../../../../depreacted/lu/universal/enums/feature/ud/voice";

export type FeatureValueSet<T> = T | readonly [T, ...T[]];

const universalUdFeatureNameValues = [
	"abbr",
	"adpType",
	"animacy",
	"aspect",
	"case",
	"clusivity",
	"conjType",
	"definite",
	"degree",
	"deixis",
	"deixisRef",
	"evident",
	"extPos",
	"foreign",
	"gender",
	"gender[psor]",
	"hebBinyan",
	"hebExistential",
	"hyph",
	"mood",
	"nounClass",
	"numForm",
	"number",
	"number[psor]",
	"numType",
	"partType",
	"person",
	"polarity",
	"polite",
	"poss",
	"prefix",
	"pronType",
	"punctType",
	"reflex",
	"style",
	"tense",
	"variant",
	"verbForm",
	"verbType",
	"voice",
] as const;

export const UniversalUdFeatureName = z.enum(universalUdFeatureNameValues);
export type UniversalUdFeatureName = z.infer<typeof UniversalUdFeatureName>;

export const UniversalUdFeatureSchemaByName = {
	abbr: UdAbbr,
	adpType: UdAdpType,
	animacy: UdAnimacy,
	aspect: UdAspect,
	case: UdCase,
	clusivity: UdClusivity,
	conjType: UdConjType,
	definite: UdDefinite,
	degree: UdDegree,
	deixis: UdDeixis,
	deixisRef: UdDeixisRef,
	evident: UdEvident,
	extPos: UdExtPos,
	foreign: UdForeign,
	gender: UdGender,
	"gender[psor]": UdGender,
	hebBinyan: UdHebBinyan,
	hebExistential: UdHebExistential,
	hyph: UdHyph,
	mood: UdMood,
	nounClass: UdNounClass,
	numForm: UdNumForm,
	number: UdNumber,
	"number[psor]": UdNumber,
	numType: UdNumType,
	partType: UdPartType,
	person: UdPerson,
	polarity: UdPolarity,
	polite: UdPolite,
	poss: UdPoss,
	prefix: UdPrefix,
	pronType: UdPronType,
	punctType: UdPunctType,
	reflex: UdReflex,
	style: UdStyle,
	tense: UdTense,
	variant: UdVariant,
	verbForm: UdVerbForm,
	verbType: UdVerbType,
	voice: UdVoice,
} as const;

export type UniversalUdFeatureValue<
	F extends UniversalUdFeatureName = UniversalUdFeatureName,
> = z.infer<(typeof UniversalUdFeatureSchemaByName)[F]>;

export type UniversalUdFeatures = Partial<{
	abbr: UniversalUdFeatureValue<"abbr">;
	adpType: UniversalUdFeatureValue<"adpType">;
	animacy: UniversalUdFeatureValue<"animacy">;
	aspect: UniversalUdFeatureValue<"aspect">;
	case: UniversalUdFeatureValue<"case">;
	clusivity: UniversalUdFeatureValue<"clusivity">;
	conjType: UniversalUdFeatureValue<"conjType">;
	definite: UniversalUdFeatureValue<"definite">;
	degree: UniversalUdFeatureValue<"degree">;
	deixis: UniversalUdFeatureValue<"deixis">;
	deixisRef: UniversalUdFeatureValue<"deixisRef">;
	evident: UniversalUdFeatureValue<"evident">;
	extPos: UniversalUdFeatureValue<"extPos">;
	foreign: UniversalUdFeatureValue<"foreign">;
	gender: FeatureValueSet<UniversalUdFeatureValue<"gender">>;
	"gender[psor]": FeatureValueSet<UniversalUdFeatureValue<"gender[psor]">>;
	hebBinyan: UniversalUdFeatureValue<"hebBinyan">;
	hebExistential: UniversalUdFeatureValue<"hebExistential">;
	hyph: UniversalUdFeatureValue<"hyph">;
	mood: UniversalUdFeatureValue<"mood">;
	nounClass: UniversalUdFeatureValue<"nounClass">;
	numForm: UniversalUdFeatureValue<"numForm">;
	number: FeatureValueSet<UniversalUdFeatureValue<"number">>;
	"number[psor]": UniversalUdFeatureValue<"number[psor]">;
	numType: UniversalUdFeatureValue<"numType">;
	partType: UniversalUdFeatureValue<"partType">;
	person: FeatureValueSet<UniversalUdFeatureValue<"person">>;
	polarity: UniversalUdFeatureValue<"polarity">;
	polite: UniversalUdFeatureValue<"polite">;
	poss: UniversalUdFeatureValue<"poss">;
	prefix: UniversalUdFeatureValue<"prefix">;
	pronType: FeatureValueSet<UniversalUdFeatureValue<"pronType">>;
	punctType: UniversalUdFeatureValue<"punctType">;
	reflex: UniversalUdFeatureValue<"reflex">;
	style: UniversalUdFeatureValue<"style">;
	tense: UniversalUdFeatureValue<"tense">;
	variant: UniversalUdFeatureValue<"variant">;
	verbForm: UniversalUdFeatureValue<"verbForm">;
	verbType: UniversalUdFeatureValue<"verbType">;
	voice: UniversalUdFeatureValue<"voice">;
}>;
