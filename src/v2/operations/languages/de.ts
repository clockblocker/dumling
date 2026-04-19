import { buildDeConvertOperations } from "../convert/de";
import { buildDeCreateOperations } from "../create/de";
import { buildDeDescribeOperations } from "../describe";
import { buildDeExtractOperations } from "../extract";
import { buildDeIdOperations } from "../id/de";
import { buildDeParseOperations } from "../parse/de";

const parse = buildDeParseOperations();

export const de = {
	create: buildDeCreateOperations(),
	convert: buildDeConvertOperations(),
	extract: buildDeExtractOperations(),
	parse,
	describe: buildDeDescribeOperations(),
	id: buildDeIdOperations(parse),
};
