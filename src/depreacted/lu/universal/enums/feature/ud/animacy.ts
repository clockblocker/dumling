import { z } from "zod/v3";

const animacyValues = ["Anim", "Hum", "Inan", "Nhum"] as const;

// Source: https://universaldependencies.org/u/feat/Animacy.html
export const DeprecatedAnimacy = z.enum(animacyValues);
export type DeprecatedAnimacy = z.infer<typeof DeprecatedAnimacy>;
