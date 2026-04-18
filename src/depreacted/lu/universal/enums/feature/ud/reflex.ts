import { z } from "zod/v3";

// Source: https://universaldependencies.org/u/feat/Reflex.html
export const DeprecatedReflex = z.literal("Yes");
export type DeprecatedReflex = z.infer<typeof DeprecatedReflex>;
