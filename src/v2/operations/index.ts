import { de } from "./lang/de";
import { makeNotImplementedLanguageApi } from "./lang/not-implemented";

export const dumling = {
	de,
	en: makeNotImplementedLanguageApi("en"),
	he: makeNotImplementedLanguageApi("he"),
};
