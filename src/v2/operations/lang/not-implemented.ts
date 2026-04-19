import type { LanguageApi, ParseError } from "../../public-types";
import { NotImplementedYetError } from "../../shared/errors";

function languageNotImplementedError(language: "en" | "he"): ParseError {
	return {
		code: "LanguageNotImplemented",
		language,
		message: `dumling.${language} is not implemented yet`,
	};
}

export function makeNotImplementedLanguageApi<L extends "en" | "he">(
	language: L,
): LanguageApi<L> {
	const failParse = () =>
		({
			success: false,
			error: languageNotImplementedError(language),
		}) as const;

	const throwNotImplemented = () => {
		throw new NotImplementedYetError(language);
	};

	return {
		create: {
			lemma: throwNotImplemented,
			surface: {
				lemma: throwNotImplemented,
				inflection: throwNotImplemented,
			},
			selection: {
				standard: throwNotImplemented,
				typo: throwNotImplemented,
			},
		},
		convert: {
			lemma: {
				toSurface: throwNotImplemented,
				toSelection: throwNotImplemented,
			},
			surface: {
				toSelection: throwNotImplemented,
			},
		},
		extract: {
			lemma: throwNotImplemented,
		},
		parse: {
			lemma: failParse,
			surface: failParse,
			selection: failParse,
		},
		describe: {
			as: {
				lemma: throwNotImplemented,
				surface: throwNotImplemented,
				selection: throwNotImplemented,
			},
		},
		id: {
			encode: throwNotImplemented,
			decode: failParse,
			decodeAs: failParse,
		},
	} as LanguageApi<L>;
}
