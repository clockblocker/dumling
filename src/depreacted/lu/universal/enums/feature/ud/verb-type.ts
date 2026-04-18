import { z } from "zod/v3";

const verbTypeValues = ["Aux", "Cop", "Light", "Mod", "Quasi"] as const;

// Source: https://universaldependencies.org/u/feat/VerbType.html
export const DeprecatedVerbType = z.enum(verbTypeValues);
export type DeprecatedVerbType = z.infer<typeof DeprecatedVerbType>;
