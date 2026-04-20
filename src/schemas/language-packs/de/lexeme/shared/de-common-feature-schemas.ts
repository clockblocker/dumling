import { z } from "zod/v3";
import type { AbstractFeatureValue } from "../../../../../types/abstract/features/features";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";

export const deAspectSchema = abstractFeatureAtomSchemas.aspect.extract([
	"Perf",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"aspect">, "Perf">>;

export const deCaseSchema = abstractFeatureAtomSchemas.case.extract([
	"Acc",
	"Dat",
	"Gen",
	"Nom",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"case">, "Acc" | "Dat" | "Gen" | "Nom">>;

export const deDefiniteSchema = abstractFeatureAtomSchemas.definite.extract([
	"Def",
	"Ind",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"definite">, "Def" | "Ind">>;

export const deDegreeSchema = abstractFeatureAtomSchemas.degree.extract([
	"Cmp",
	"Pos",
	"Sup",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"degree">, "Cmp" | "Pos" | "Sup">>;

export const deGenderSchema = abstractFeatureAtomSchemas.gender.extract([
	"Fem",
	"Masc",
	"Neut",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"gender">, "Fem" | "Masc" | "Neut">>;

export const deMoodSchema = abstractFeatureAtomSchemas.mood.extract([
	"Imp",
	"Ind",
	"Sub",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"mood">, "Imp" | "Ind" | "Sub">>;

export const deNumberSchema = abstractFeatureAtomSchemas.number.extract([
	"Plur",
	"Sing",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"number">, "Plur" | "Sing">>;

export const dePersonSchema = abstractFeatureAtomSchemas.person.extract([
	"1",
	"2",
	"3",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"person">, "1" | "2" | "3">>;

export const dePolaritySchema = abstractFeatureAtomSchemas.polarity.extract([
	"Neg",
	"Pos",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"polarity">, "Neg" | "Pos">>;

export const dePoliteSchema = abstractFeatureAtomSchemas.polite.extract([
	"Form",
	"Infm",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"polite">, "Form" | "Infm">>;

export const deTenseSchema = abstractFeatureAtomSchemas.tense.extract([
	"Past",
	"Pres",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"tense">, "Past" | "Pres">>;

export const deVerbFormSchema = abstractFeatureAtomSchemas.verbForm.extract([
	"Fin",
	"Inf",
	"Part",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"verbForm">, "Fin" | "Inf" | "Part">>;
