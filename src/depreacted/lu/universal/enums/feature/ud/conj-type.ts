import { z } from "zod/v3";

const conjTypeValues = ["Comp", "Oper"] as const;

// Source: https://universaldependencies.org/hy/feat/ConjType.html
export const DeprecatedConjType = z.enum(conjTypeValues);
export type DeprecatedConjType = z.infer<typeof DeprecatedConjType>;
