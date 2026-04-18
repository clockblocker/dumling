import { z } from "zod/v3";

const tenseValues = [
	"Fut", // future
	"Imp", // imperfect
	"Past", // past; preterite / aorist
	"Pqp", // pluperfect
	"Pres", // present; non-past / aorist
] as const;

// Source: https://universaldependencies.org/u/feat/Tense.html
export const DeprecatedTense = z.enum(tenseValues);
export type DeprecatedTense = z.infer<typeof DeprecatedTense>;
