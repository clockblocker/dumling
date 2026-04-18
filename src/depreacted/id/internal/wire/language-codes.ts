import type { DeprecatedTargetLanguage } from "../../../lu/universal/enums/core/language";

const LANGUAGE_TO_CODE = {
	English: "EN",
	German: "DE",
	Hebrew: "HE",
} as const satisfies Record<DeprecatedTargetLanguage, string>;

const CODE_TO_LANGUAGE = {
	DE: "German",
	EN: "English",
	HE: "Hebrew",
} as const satisfies Record<string, DeprecatedTargetLanguage>;

export function deprecatedLanguageToCode(language: DeprecatedTargetLanguage): string {
	return LANGUAGE_TO_CODE[language];
}

export function deprecatedCodeToLanguage(code: string): DeprecatedTargetLanguage | undefined {
	return (CODE_TO_LANGUAGE as Record<string, DeprecatedTargetLanguage | undefined>)[
		code
	];
}
