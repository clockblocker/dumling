import { z } from "zod/v3";

const phrasemeKindValues = [
	"DiscourseFormula",
	"Aphorism",
	"Proverb",
	"Idiom",
] as const;

// Source: local project phraseme taxonomy used by lexical-generation prompts.
export const DeprecatedPhrasemeKind = z.enum(phrasemeKindValues);
export type DeprecatedPhrasemeKind = z.infer<typeof DeprecatedPhrasemeKind>;
export const DeprecatedPHRASEME_KIND_KEY = "phrasemeKind";
