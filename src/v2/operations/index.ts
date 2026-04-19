import { buildConvertOperations } from "./shared/convert";
import { buildDescribeOperations } from "./shared/describe";
import { buildExtractOperations } from "./shared/extract";
import { buildIdOperations } from "./shared/id";
import { makeNotImplementedLanguageApi } from "./lang/not-implemented";
import { buildDeCreateOperations } from "./lang/de/create";
import { buildDeParseOperations } from "./lang/de/parse";

const parseDe = buildDeParseOperations();

export const dumling = {
	de: {
		create: buildDeCreateOperations(),
		convert: buildConvertOperations<"de">(),
		extract: buildExtractOperations<"de">(),
		parse: parseDe,
		describe: buildDescribeOperations<"de">(),
		id: buildIdOperations("de", parseDe),
	},
	en: makeNotImplementedLanguageApi("en"),
	he: makeNotImplementedLanguageApi("he"),
};
