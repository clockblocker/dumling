import { z } from "zod/v3";

const phrasemeKindValues = [
	"DiscourseFormula",
	"Aphorism",
	"Proverb",
	"Idiom",
] as const;

// Source: local project phraseme taxonomy used by lexical-generation prompts.
export const PhrasemeKind = z.enum(phrasemeKindValues);
export type PhrasemeKind = z.infer<typeof PhrasemeKind>;
export const PHRASEME_KIND_KEY = "phrasemeKind";
