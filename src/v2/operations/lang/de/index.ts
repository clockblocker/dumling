import { buildDescribeOperations } from "../../shared/describe";
import { buildExtractOperations } from "../../shared/extract";
import { buildDeConvertOperations } from "./convert";
import { buildDeCreateOperations } from "./create";
import { buildDeIdOperations } from "./id";
import { buildDeParseOperations } from "./parse";

const parse = buildDeParseOperations();

export const de = {
	create: buildDeCreateOperations(),
	convert: buildDeConvertOperations(),
	extract: buildExtractOperations<"de">(),
	parse,
	describe: buildDescribeOperations<"de">(),
	id: buildDeIdOperations(parse),
};
