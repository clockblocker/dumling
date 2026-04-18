import { z } from "zod/v3";

// Source: https://universaldependencies.org/u/feat/Foreign.html
export const DeprecatedForeign = z.literal("Yes");
export type DeprecatedForeign = z.infer<typeof DeprecatedForeign>;
