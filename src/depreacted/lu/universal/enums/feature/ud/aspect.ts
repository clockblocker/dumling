import { z } from "zod/v3";

const aspectValues = [
	"Hab", // habitual
	"Imp", // imperfect
	"Iter", // iterative; frequentative
	"Perf", // perfect
	"Prog", // progressive
	"Prosp", // prospective
] as const;

// Source: https://universaldependencies.org/u/feat/Aspect.html
export const DeprecatedAspect = z.enum(aspectValues);
export type DeprecatedAspect = z.infer<typeof DeprecatedAspect>;
