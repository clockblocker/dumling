import { z } from "zod/v3";

// Source: https://universaldependencies.org/he/index.html
export const DeprecatedHebExistential = z.literal("Yes");
export type DeprecatedHebExistential = z.infer<typeof DeprecatedHebExistential>;
