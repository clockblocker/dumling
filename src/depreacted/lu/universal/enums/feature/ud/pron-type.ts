import { z } from "zod/v3";

const pronTypeValues = [
	"Art",
	"Dem",
	"Emp",
	"Exc",
	"Ind",
	"Int",
	"Neg",
	"Prs",
	"Rcp",
	"Rel",
	"Tot",
] as const;

// Source: https://universaldependencies.org/u/feat/PronType.html
export const DeprecatedPronType = z.enum(pronTypeValues);
export type DeprecatedPronType = z.infer<typeof DeprecatedPronType>;
