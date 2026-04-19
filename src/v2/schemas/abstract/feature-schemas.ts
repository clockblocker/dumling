import { z } from "zod/v3";
import type {
	AbstractInherentFeatures,
	AbstractInflectionalFeatures,
} from "../../types/abstract/features/features";
import { DiscourseFormulaRole } from "../../types/abstract/features/custom/discourse-formula-role";
import { GovernedCase } from "../../types/abstract/features/custom/governed-case";
import { HasGovPrep } from "../../types/abstract/features/custom/governed-preposition";
import { LexicallyReflexive } from "../../types/abstract/features/custom/lexically-reflexive";
import { Phrasal } from "../../types/abstract/features/custom/phrasal";
import { HasSepPrefix } from "../../types/abstract/features/custom/separable";
import { Abbr } from "../../types/abstract/features/ud/abbr";
import { AdpType } from "../../types/abstract/features/ud/adp-type";
import { Animacy } from "../../types/abstract/features/ud/animacy";
import { Aspect } from "../../types/abstract/features/ud/aspect";
import { Case } from "../../types/abstract/features/ud/case";
import { Clusivity } from "../../types/abstract/features/ud/clusivity";
import { ConjType } from "../../types/abstract/features/ud/conj-type";
import { Definite } from "../../types/abstract/features/ud/definite";
import { Degree } from "../../types/abstract/features/ud/degree";
import { Deixis } from "../../types/abstract/features/ud/deixis";
import { DeixisRef } from "../../types/abstract/features/ud/deixis-ref";
import { Evident } from "../../types/abstract/features/ud/evident";
import { ExtPos } from "../../types/abstract/features/ud/ext-pos";
import { Foreign } from "../../types/abstract/features/ud/foreign";
import { Gender } from "../../types/abstract/features/ud/gender";
import { HebBinyan } from "../../types/abstract/features/ud/heb-binyan";
import { HebExistential } from "../../types/abstract/features/ud/heb-existential";
import { Hyph } from "../../types/abstract/features/ud/hyph";
import { Mood } from "../../types/abstract/features/ud/mood";
import { NounClass } from "../../types/abstract/features/ud/noun-class";
import { NumForm } from "../../types/abstract/features/ud/num-form";
import { NumType } from "../../types/abstract/features/ud/num-type";
import { GrammaticalNumber } from "../../types/abstract/features/ud/number";
import { PartType } from "../../types/abstract/features/ud/part-type";
import { Person } from "../../types/abstract/features/ud/person";
import { Polarity } from "../../types/abstract/features/ud/polarity";
import { Polite } from "../../types/abstract/features/ud/polite";
import { Poss } from "../../types/abstract/features/ud/poss";
import { Prefix } from "../../types/abstract/features/ud/prefix";
import { PronType } from "../../types/abstract/features/ud/pron-type";
import { PunctType } from "../../types/abstract/features/ud/punct-type";
import { Reflex } from "../../types/abstract/features/ud/reflex";
import { Style } from "../../types/abstract/features/ud/style";
import { Tense } from "../../types/abstract/features/ud/tense";
import { Variant } from "../../types/abstract/features/ud/variant";
import { VerbForm } from "../../types/abstract/features/ud/verb-form";
import { VerbType } from "../../types/abstract/features/ud/verb-type";
import { Voice } from "../../types/abstract/features/ud/voice";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
	requireNonEmptyFeatureObject,
	type FeatureSchemaShape,
} from "../shared/feature-helpers";

export const abstractFeatureAtomSchemas = {
	abbr: Abbr,
	adpType: AdpType,
	animacy: Animacy,
	aspect: Aspect,
	case: Case,
	clusivity: Clusivity,
	conjType: ConjType,
	definite: Definite,
	degree: Degree,
	deixis: Deixis,
	deixisRef: DeixisRef,
	discourseFormulaRole: DiscourseFormulaRole,
	evident: Evident,
	extPos: ExtPos,
	foreign: Foreign,
	gender: Gender,
	"gender[psor]": Gender,
	governedCase: GovernedCase,
	hasGovPrep: HasGovPrep,
	hasSepPrefix: HasSepPrefix,
	hebBinyan: HebBinyan,
	hebExistential: HebExistential,
	hyph: Hyph,
	lexicallyReflexive: LexicallyReflexive,
	mood: Mood,
	nounClass: NounClass,
	numForm: NumForm,
	number: GrammaticalNumber,
	"number[psor]": GrammaticalNumber,
	numType: NumType,
	partType: PartType,
	person: Person,
	phrasal: Phrasal,
	polarity: Polarity,
	polite: Polite,
	poss: Poss,
	prefix: Prefix,
	pronType: PronType,
	punctType: PunctType,
	reflex: Reflex,
	style: Style,
	tense: Tense,
	variant: Variant,
	verbForm: VerbForm,
	verbType: VerbType,
	voice: Voice,
} satisfies FeatureSchemaShape;

const abstractInflectionalFeatureValueSchemas = Object.fromEntries(
	Object.entries(abstractFeatureAtomSchemas).map(([name, schema]) => [
		name,
		featureValueSet(schema),
	]),
) as FeatureSchemaShape;

export const abstractInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	abstractFeatureAtomSchemas,
) satisfies z.ZodType<AbstractInherentFeatures>;

export const abstractInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema(abstractInflectionalFeatureValueSchemas),
) satisfies z.ZodType<AbstractInflectionalFeatures>;
