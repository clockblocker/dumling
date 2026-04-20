import { z } from "zod/v3";
import type {
    EnCase,
    EnDefinite,
    EnDegree,
    EnGender,
    EnMood,
    EnNumber,
    EnNumForm,
    EnNumType,
    EnPerson,
    EnPolarity,
    EnPronType,
    EnStyle,
    EnTense,
    EnVerbForm,
    EnVoice,
} from "../../../../../types/language-packs/en/lexeme/shared/en-common-enums";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";

export const enCaseSchema = abstractFeatureAtomSchemas.case.extract(["Acc", "Gen", "Nom"]) satisfies z.ZodType<EnCase>;
export const enDefiniteSchema = abstractFeatureAtomSchemas.definite.extract(["Def", "Ind"]) satisfies z.ZodType<EnDefinite>;
export const enDegreeSchema = abstractFeatureAtomSchemas.degree.extract(["Cmp", "Pos", "Sup"]) satisfies z.ZodType<EnDegree>;
export const enGenderSchema = abstractFeatureAtomSchemas.gender.extract(["Fem", "Masc", "Neut"]) satisfies z.ZodType<EnGender>;
export const enMoodSchema = abstractFeatureAtomSchemas.mood.extract(["Imp", "Ind", "Sub"]) satisfies z.ZodType<EnMood>;
export const enNumberSchema = abstractFeatureAtomSchemas.number.extract(["Plur", "Ptan", "Sing"]) satisfies z.ZodType<EnNumber>;
export const enNumFormSchema = abstractFeatureAtomSchemas.numForm.extract(["Combi", "Digit", "Roman", "Word"]) satisfies z.ZodType<EnNumForm>;
export const enNumTypeSchema = abstractFeatureAtomSchemas.numType.extract(["Card", "Frac", "Mult", "Ord"]) satisfies z.ZodType<EnNumType>;
export const enPersonSchema = abstractFeatureAtomSchemas.person.extract(["1", "2", "3"]) satisfies z.ZodType<EnPerson>;
export const enPolaritySchema = abstractFeatureAtomSchemas.polarity.extract(["Neg", "Pos"]) satisfies z.ZodType<EnPolarity>;
export const enPronTypeSchema = abstractFeatureAtomSchemas.pronType.extract(["Art", "Dem", "Emp", "Ind", "Int", "Neg", "Prs", "Rcp", "Rel", "Tot"]) satisfies z.ZodType<EnPronType>;
export const enStyleSchema = abstractFeatureAtomSchemas.style.extract(["Arch", "Coll", "Expr", "Slng", "Vrnc"]) satisfies z.ZodType<EnStyle>;
export const enTenseSchema = abstractFeatureAtomSchemas.tense.extract(["Past", "Pres"]) satisfies z.ZodType<EnTense>;
export const enVerbFormSchema = abstractFeatureAtomSchemas.verbForm.extract(["Fin", "Ger", "Inf", "Part"]) satisfies z.ZodType<EnVerbForm>;
export const enVoiceSchema = abstractFeatureAtomSchemas.voice.extract(["Pass"]) satisfies z.ZodType<EnVoice>;
