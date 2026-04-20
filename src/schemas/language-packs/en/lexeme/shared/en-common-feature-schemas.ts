import { z } from "zod/v3";
import type { AbstractFeatureValue } from "../../../../../types/abstract/features/features";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";

export const enCaseSchema = abstractFeatureAtomSchemas.case.extract([
	"Acc",
	"Gen",
	"Nom",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"case">, "Acc" | "Gen" | "Nom">>;
export const enDefiniteSchema = abstractFeatureAtomSchemas.definite.extract([
	"Def",
	"Ind",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"definite">, "Def" | "Ind">>;
export const enDegreeSchema = abstractFeatureAtomSchemas.degree.extract([
	"Cmp",
	"Pos",
	"Sup",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"degree">, "Cmp" | "Pos" | "Sup">>;
export const enGenderSchema = abstractFeatureAtomSchemas.gender.extract([
	"Fem",
	"Masc",
	"Neut",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"gender">, "Fem" | "Masc" | "Neut">>;
export const enMoodSchema = abstractFeatureAtomSchemas.mood.extract([
	"Imp",
	"Ind",
	"Sub",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"mood">, "Imp" | "Ind" | "Sub">>;
export const enNumberSchema = abstractFeatureAtomSchemas.number.extract([
	"Plur",
	"Ptan",
	"Sing",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"number">, "Plur" | "Ptan" | "Sing">>;
export const enNumFormSchema = abstractFeatureAtomSchemas.numForm.extract([
	"Combi",
	"Digit",
	"Roman",
	"Word",
]) satisfies z.ZodType<
	Extract<AbstractFeatureValue<"numForm">, "Combi" | "Digit" | "Roman" | "Word">
>;
export const enNumTypeSchema = abstractFeatureAtomSchemas.numType.extract([
	"Card",
	"Frac",
	"Mult",
	"Ord",
]) satisfies z.ZodType<
	Extract<AbstractFeatureValue<"numType">, "Card" | "Frac" | "Mult" | "Ord">
>;
export const enPersonSchema = abstractFeatureAtomSchemas.person.extract([
	"1",
	"2",
	"3",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"person">, "1" | "2" | "3">>;
export const enPolaritySchema = abstractFeatureAtomSchemas.polarity.extract([
	"Neg",
	"Pos",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"polarity">, "Neg" | "Pos">>;
export const enPronTypeSchema = abstractFeatureAtomSchemas.pronType.extract([
	"Art",
	"Dem",
	"Emp",
	"Ind",
	"Int",
	"Neg",
	"Prs",
	"Rcp",
	"Rel",
	"Tot",
]) satisfies z.ZodType<
	Extract<
		AbstractFeatureValue<"pronType">,
		"Art" | "Dem" | "Emp" | "Ind" | "Int" | "Neg" | "Prs" | "Rcp" | "Rel" | "Tot"
	>
>;
export const enStyleSchema = abstractFeatureAtomSchemas.style.extract([
	"Arch",
	"Coll",
	"Expr",
	"Slng",
	"Vrnc",
]) satisfies z.ZodType<
	Extract<AbstractFeatureValue<"style">, "Arch" | "Coll" | "Expr" | "Slng" | "Vrnc">
>;
export const enTenseSchema = abstractFeatureAtomSchemas.tense.extract([
	"Past",
	"Pres",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"tense">, "Past" | "Pres">>;
export const enVerbFormSchema = abstractFeatureAtomSchemas.verbForm.extract([
	"Fin",
	"Ger",
	"Inf",
	"Part",
]) satisfies z.ZodType<
	Extract<AbstractFeatureValue<"verbForm">, "Fin" | "Ger" | "Inf" | "Part">
>;
export const enVoiceSchema = abstractFeatureAtomSchemas.voice.extract([
	"Pass",
]) satisfies z.ZodType<Extract<AbstractFeatureValue<"voice">, "Pass">>;
