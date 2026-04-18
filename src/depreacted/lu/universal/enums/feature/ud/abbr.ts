import { z } from "zod/v3";

// Source: https://universaldependencies.org/u/feat/Abbr.html

export const DeprecatedAbbr = z.literal("Yes");
export type DeprecatedAbbr = z.infer<typeof DeprecatedAbbr>;
