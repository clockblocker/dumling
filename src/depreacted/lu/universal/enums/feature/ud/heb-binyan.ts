import { z } from "zod/v3";

const hebBinyanValues = [
	"HIFIL",
	"HITPAEL",
	"HUFAL",
	"NIFAL",
	"PAAL",
	"PIEL",
	"PUAL",
] as const;

// Source: https://universaldependencies.org/treebanks/he_htb/index.html
export const DeprecatedHebBinyan = z.enum(hebBinyanValues);
export type DeprecatedHebBinyan = z.infer<typeof DeprecatedHebBinyan>;
