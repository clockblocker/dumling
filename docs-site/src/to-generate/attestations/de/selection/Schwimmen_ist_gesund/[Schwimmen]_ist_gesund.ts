import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "[Schwimmen] ist gesund.",
} as const satisfies AttestedSelection;
