import { buildConvertOperations } from "./shared/convert";
import { buildDescribeOperations } from "./shared/describe";
import { buildExtractOperations } from "./shared/extract";
import { makeNotImplementedLanguageApi } from "./lang/not-implemented";
import { buildDeCreateOperations } from "./lang/de/create";
import { buildDeIdOperations } from "./lang/de/id";
import { buildDeParseOperations } from "./lang/de/parse";

const parseDe = buildDeParseOperations();

export const dumling = {
	de: {
		create: buildDeCreateOperations(),
		convert: buildConvertOperations<"de">(),
		extract: buildExtractOperations<"de">(),
		parse: parseDe,
		describe: buildDescribeOperations<"de">(),
		id: buildDeIdOperations(parseDe),
	},
	en: makeNotImplementedLanguageApi("en"),
	he: makeNotImplementedLanguageApi("he"),
};
