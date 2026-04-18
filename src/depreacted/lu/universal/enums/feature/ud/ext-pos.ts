import { z } from "zod/v3";

const extPosValues = [
	"ADJ",
	"ADP",
	"ADV",
	"AUX",
	"CCONJ",
	"DET",
	"INTJ",
	"PRON",
	"PROPN",
	"SCONJ",
] as const;

// Source: https://universaldependencies.org/u/feat/ExtPos.html
export const DeprecatedExtPos = z.enum(extPosValues);
export type DeprecatedExtPos = z.infer<typeof DeprecatedExtPos>;
