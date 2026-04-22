import type { SupportedLanguage } from "../../types/public-types";

export const supportedLanguages = [
	"de",
	"en",
	"he",
] as const satisfies readonly SupportedLanguage[];

export function isSupportedLanguage(
	value: unknown,
): value is SupportedLanguage {
	return supportedLanguages.includes(value as SupportedLanguage);
}
