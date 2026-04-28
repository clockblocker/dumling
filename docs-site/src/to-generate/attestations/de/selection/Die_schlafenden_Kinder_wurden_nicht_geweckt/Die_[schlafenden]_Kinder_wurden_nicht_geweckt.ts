import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Die [schlafenden] Kinder wurden nicht geweckt.",
} as const satisfies AttestedSelection;
