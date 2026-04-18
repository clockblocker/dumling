import { z } from "zod/v3";

// Source: https://universaldependencies.org/u/feat/Poss.html
export const DeprecatedPoss = z.literal("Yes");
export type DeprecatedPoss = z.infer<typeof DeprecatedPoss>;
