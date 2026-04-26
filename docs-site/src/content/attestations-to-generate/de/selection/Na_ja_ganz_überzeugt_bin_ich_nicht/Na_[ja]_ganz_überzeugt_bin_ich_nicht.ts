import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {

} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Na [ja], ganz überzeugt bin ich nicht.",
} as const satisfies AttestedSelection;
