import type { z } from "zod/v3";

import { DeprecatedCase } from "../ud/case";

export const DeprecatedGovernedCase = DeprecatedCase;
export type DeprecatedGovernedCase = z.infer<typeof DeprecatedGovernedCase>;
