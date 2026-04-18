import { z } from "zod/v3";

export const DeprecatedHasGovPrep = z.string().min(1);
export type DeprecatedHasGovPrep = z.infer<typeof DeprecatedHasGovPrep>;
