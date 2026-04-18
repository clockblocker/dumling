import z from "zod/v3";

const morphemeKinds = [
	"Root",
	"Prefix",
	"Suffix",
	"Suffixoid", //cat*like*
	"Infix",
	"Circumfix",
	"Interfix",
	"Transfix",
	"Clitic",
	"ToneMarking",
	"Duplifix", // 	money~shmoney
] as const;

export const DeprecatedMorphemeKindSchema = z.enum(morphemeKinds);

export type DeprecatedMorphemeKind = z.infer<typeof DeprecatedMorphemeKindSchema>;

export const DeprecatedMorphemeKind = DeprecatedMorphemeKindSchema.enum;
