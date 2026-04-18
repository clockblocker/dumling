import { z } from "zod/v3";

const openClassPosValues = [
	"ADJ",
	"ADV",
	"INTJ",
	"NOUN",
	"PROPN",
	"VERB",
] as const;

const closedClassPosValues = [
	"ADP",
	"AUX",
	"CCONJ",
	"DET",
	"NUM",
	"PART",
	"PRON",
	"SCONJ",
] as const;

const otherPosValues = ["PUNCT", "SYM", "X"] as const;
const POS_VALUES = [
	...openClassPosValues,
	...closedClassPosValues,
	...otherPosValues,
] as const;

// Source: https://universaldependencies.org/u/pos/index.html
export const Pos = z.enum(POS_VALUES);
export type Pos = z.infer<typeof Pos>;
