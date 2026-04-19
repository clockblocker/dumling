import type { DumlingApi, LanguageApi, SupportedLanguage } from "../public-types";
import { languagePacks } from "../language-packs";
import { buildConvertOperations } from "./shared/convert";
import { buildDescribeOperations } from "./shared/describe";
import { buildExtractOperations } from "./shared/extract";
import { buildIdOperations } from "./shared/id";
import { makeNotImplementedLanguageApi } from "./lang/not-implemented";

function buildImplementedLanguageApi<L extends SupportedLanguage>(
	language: L,
	descriptor: {
		create: LanguageApi<L>["create"];
		parse: LanguageApi<L>["parse"];
	},
): LanguageApi<L> {
	return {
		create: descriptor.create,
		convert: buildConvertOperations<L>(),
		describe: buildDescribeOperations<L>(),
		extract: buildExtractOperations<L>(),
		id: buildIdOperations(language, descriptor.parse),
		parse: descriptor.parse,
	};
}

export const dumling = {
	de: buildImplementedLanguageApi("de", languagePacks.de),
	en: makeNotImplementedLanguageApi("en"),
	he: makeNotImplementedLanguageApi("he"),
} satisfies DumlingApi;
