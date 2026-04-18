import { z } from "zod/v3";

// Source: https://universaldependencies.org/he/index.html
export const DeprecatedPrefix = z.literal("Yes");
export type DeprecatedPrefix = z.infer<typeof DeprecatedPrefix>;
