import { z } from "zod/v3";

const clusivityValues = ["Ex", "In"] as const;

// Source: https://universaldependencies.org/u/feat/Clusivity.html
export const DeprecatedClusivity = z.enum(clusivityValues);
export type DeprecatedClusivity = z.infer<typeof DeprecatedClusivity>;
