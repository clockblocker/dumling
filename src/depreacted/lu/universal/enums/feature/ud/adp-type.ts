import { z } from "zod/v3";

const adpTypeValues = ["Circ", "Post", "Prep", "Voc"] as const;

// Source: https://universaldependencies.org/u/feat/AdpType.html
export const DeprecatedAdpType = z.enum(adpTypeValues);
export type DeprecatedAdpType = z.infer<typeof DeprecatedAdpType>;
