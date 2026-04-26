import { getLanguageApi } from "../../../../../../../../src/index.ts";
import type { AttestedSelection } from "../../../../../../../../src/types/public-types.ts";
import type { AttestedSelectionRenderer } from "../types";

export const asFullCsv: AttestedSelectionRenderer = (
	attestedSelection: AttestedSelection,
): string => {
	const languageApi = getLanguageApi(attestedSelection.selection.language);
	return String(
		languageApi.id.encode.asCsv(attestedSelection.selection as never),
	);
};
