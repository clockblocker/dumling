import { z } from "zod/v3";

export const DeprecatedLexicallyReflexive = z.literal("Yes");
export type DeprecatedLexicallyReflexive = z.infer<typeof DeprecatedLexicallyReflexive>;
