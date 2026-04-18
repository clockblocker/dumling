import { z } from "zod/v3";

const punctTypeValues = [
	"Brck",
	"Colo",
	"Comm",
	"Dash",
	"Elip",
	"Excl",
	"Peri",
	"Qest",
	"Quot",
] as const;

// Source: https://universaldependencies.org/u/feat/PunctType.html
export const DeprecatedPunctType = z.enum(punctTypeValues);
export type DeprecatedPunctType = z.infer<typeof DeprecatedPunctType>;
