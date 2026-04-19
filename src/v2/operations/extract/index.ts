import type { LanguageApi } from "../../public-types";
import { extractLemma } from "../shared/entity-accessors";

export function buildDeExtractOperations(): LanguageApi<"de">["extract"] {
	return {
		lemma: extractLemma as unknown as LanguageApi<"de">["extract"]["lemma"],
	};
}
