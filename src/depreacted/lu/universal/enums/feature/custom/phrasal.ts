import { z } from "zod/v3";

export const DeprecatedPhrasal = z.literal("Yes");
export type DeprecatedPhrasal = z.infer<typeof DeprecatedPhrasal>;
