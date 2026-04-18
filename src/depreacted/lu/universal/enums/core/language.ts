import z from "zod/v3";

const TARGET_LANGUAGES = ["German", "English", "Hebrew"] as const;

export const DeprecatedTargetLanguageSchema = z.enum(TARGET_LANGUAGES);

export type DeprecatedTargetLanguage = z.infer<typeof DeprecatedTargetLanguageSchema>;
