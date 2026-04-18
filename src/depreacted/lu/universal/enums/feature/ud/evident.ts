import { z } from "zod/v3";

const evidentValues = ["Fh", "Nfh"] as const;

// Source: https://universaldependencies.org/u/feat/Evident.html
export const DeprecatedEvident = z.enum(evidentValues);
export type DeprecatedEvident = z.infer<typeof DeprecatedEvident>;
