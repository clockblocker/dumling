import { z } from "zod/v3";

const verbFormValues = [
	"Conv", // converb; transgressive, adverbial participle, verbal adverb
	"Fin", // finite verb
	"Gdv", // gerundive
	"Ger", // gerund
	"Inf", // infinitive
	"Part", // participle; verbal adjective
	"Sup", // supine
	"Vnoun", // verbal noun; masdar
] as const;

// Source: https://universaldependencies.org/u/feat/VerbForm.html
export const DeprecatedVerbForm = z.enum(verbFormValues);
export type DeprecatedVerbForm = z.infer<typeof DeprecatedVerbForm>;
