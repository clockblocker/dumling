import { de } from "./languages/de";
import { makeNotImplementedLanguageApi } from "./languages/not-implemented";

export const dumling = {
	de,
	en: makeNotImplementedLanguageApi("en"),
	he: makeNotImplementedLanguageApi("he"),
};
