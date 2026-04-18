import { z } from "zod/v3";

export const DeprecatedHasSepPrefix = z.string().min(1);
export type DeprecatedHasSepPrefix = z.infer<typeof DeprecatedHasSepPrefix>;
