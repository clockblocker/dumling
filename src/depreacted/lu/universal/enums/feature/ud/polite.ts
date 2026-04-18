import { z } from "zod/v3";

const politeValues = ["Elev", "Form", "Humb", "Infm"] as const;

// Source: https://universaldependencies.org/u/feat/Polite.html
export const DeprecatedPolite = z.enum(politeValues);
export type DeprecatedPolite = z.infer<typeof DeprecatedPolite>;
