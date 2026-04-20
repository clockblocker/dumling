import { z } from "zod/v3";
import type {
	DeAspect,
	DeCase,
	DeDefinite,
	DeDegree,
	DeGender,
	DeMood,
	DeNumber,
	DePerson,
	DePolarity,
	DePolite,
	DeTense,
	DeVerbForm,
} from "../../../../../types/language-packs/de/lexeme/shared/de-common-enums";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";

export const deAspectSchema = abstractFeatureAtomSchemas.aspect.extract([
	"Perf",
]) satisfies z.ZodType<DeAspect>;

export const deCaseSchema = abstractFeatureAtomSchemas.case.extract([
	"Acc",
	"Dat",
	"Gen",
	"Nom",
]) satisfies z.ZodType<DeCase>;

export const deDefiniteSchema = abstractFeatureAtomSchemas.definite.extract([
	"Def",
	"Ind",
]) satisfies z.ZodType<DeDefinite>;

export const deDegreeSchema = abstractFeatureAtomSchemas.degree.extract([
	"Cmp",
	"Pos",
	"Sup",
]) satisfies z.ZodType<DeDegree>;

export const deGenderSchema = abstractFeatureAtomSchemas.gender.extract([
	"Fem",
	"Masc",
	"Neut",
]) satisfies z.ZodType<DeGender>;

export const deMoodSchema = abstractFeatureAtomSchemas.mood.extract([
	"Imp",
	"Ind",
	"Sub",
]) satisfies z.ZodType<DeMood>;

export const deNumberSchema = abstractFeatureAtomSchemas.number.extract([
	"Plur",
	"Sing",
]) satisfies z.ZodType<DeNumber>;

export const dePersonSchema = abstractFeatureAtomSchemas.person.extract([
	"1",
	"2",
	"3",
]) satisfies z.ZodType<DePerson>;

export const dePolaritySchema = abstractFeatureAtomSchemas.polarity.extract([
	"Neg",
	"Pos",
]) satisfies z.ZodType<DePolarity>;

export const dePoliteSchema = abstractFeatureAtomSchemas.polite.extract([
	"Form",
	"Infm",
]) satisfies z.ZodType<DePolite>;

export const deTenseSchema = abstractFeatureAtomSchemas.tense.extract([
	"Past",
	"Pres",
]) satisfies z.ZodType<DeTense>;

export const deVerbFormSchema = abstractFeatureAtomSchemas.verbForm.extract([
	"Fin",
	"Inf",
	"Part",
]) satisfies z.ZodType<DeVerbForm>;
