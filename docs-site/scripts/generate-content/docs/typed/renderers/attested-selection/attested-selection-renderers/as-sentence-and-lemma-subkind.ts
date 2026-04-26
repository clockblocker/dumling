import { getLanguageApi } from "../../../../../../../../src/index.ts";
import type { AttestedSelection } from "../../../../../../../../src/types/public-types.ts";
import type { AttestedSelectionRenderer } from "../types";

function asSingleLineSentence(sentenceMarkdown: string): string {
	return sentenceMarkdown
		.trim()
		.split("\n")
		.map((line) => line.trim())
		.join(" ");
}

function hrefForAttestedSelection(
	attestedSelection: AttestedSelection,
): string {
	const selection = attestedSelection.selection;
	const languageApi = getLanguageApi(selection.language);
	const base64UrlId = String(languageApi.id.encode.asBase64Url(selection));

	return `/${selection.language}/selection/${base64UrlId}/`;
}

export const asSentenceAndLemmaSubKind: AttestedSelectionRenderer = (
	attestedSelection: AttestedSelection,
): string =>
	`- ${JSON.stringify(asSingleLineSentence(attestedSelection.sentenceMarkdown))} -> [${attestedSelection.selection.surface.lemma.lemmaSubKind}](${hrefForAttestedSelection(attestedSelection)})`;
