import { runtimeSchemas } from "../../../schemas";
import { parseWithSchema } from "../../shared/parse-result";

export function buildDeParseOperations() {
	const operations = {
		lemma(input: unknown) {
			return parseWithSchema("de", runtimeSchemas.de.lemma, input);
		},
		surface(input: unknown) {
			return parseWithSchema("de", runtimeSchemas.de.surface, input);
		},
		selection(input: unknown) {
			return parseWithSchema("de", runtimeSchemas.de.selection, input);
		},
	};

	return operations;
}
