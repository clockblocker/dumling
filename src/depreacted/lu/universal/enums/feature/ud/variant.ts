import { z } from "zod/v3";

const variantValues = ["Short"] as const;

// Source: https://universaldependencies.org/treebanks/de_hdt/de_hdt-feat-Variant.html
export const DeprecatedVariant = z.enum(variantValues);
export type DeprecatedVariant = z.infer<typeof DeprecatedVariant>;
