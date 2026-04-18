import { z } from "zod/v3";

// Source: https://universaldependencies.org/u/feat/Hyph.html
export const DeprecatedHyph = z.literal("Yes");
export type DeprecatedHyph = z.infer<typeof DeprecatedHyph>;
