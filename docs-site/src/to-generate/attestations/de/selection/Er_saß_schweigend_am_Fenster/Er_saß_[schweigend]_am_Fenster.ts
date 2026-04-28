import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Er saß [schweigend] am Fenster.",
} as const satisfies AttestedSelection;
