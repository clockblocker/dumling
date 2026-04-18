import { z } from "zod/v3";

const styleValues = [
	"Arch",
	"Coll",
	"Expr",
	"Form",
	"Rare",
	"Slng",
	"Vrnc",
	"Vulg",
] as const;

// Source: https://universaldependencies.org/u/feat/Style.html
export const DeprecatedStyle = z.enum(styleValues);
export type DeprecatedStyle = z.infer<typeof DeprecatedStyle>;
