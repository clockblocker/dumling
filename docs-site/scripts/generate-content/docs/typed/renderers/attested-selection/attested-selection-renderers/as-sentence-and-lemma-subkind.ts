import type { AttestedSelection } from "../../../../../../../../src/types/public-types.ts";
import type { AttestedSelectionRenderer } from "../types";

function asSingleLineSentence(sentenceMarkdown: string): string {
	return sentenceMarkdown
		.trim()
		.split("\n")
		.map((line) => line.trim())
		.join(" ");
}

export const asSentenceAndLemmaSubKind: AttestedSelectionRenderer = (
	attestedSelection: AttestedSelection,
): string =>
	`- ${JSON.stringify(asSingleLineSentence(attestedSelection.sentenceMarkdown))} -> ${attestedSelection.selection.surface.lemma.lemmaSubKind}`;
