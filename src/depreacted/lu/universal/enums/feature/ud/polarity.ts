import { z } from "zod/v3";

const polarityValues = ["Neg", "Pos"] as const;

// Source: https://universaldependencies.org/u/feat/Polarity.html
export const DeprecatedPolarity = z.enum(polarityValues);
export type DeprecatedPolarity = z.infer<typeof DeprecatedPolarity>;
