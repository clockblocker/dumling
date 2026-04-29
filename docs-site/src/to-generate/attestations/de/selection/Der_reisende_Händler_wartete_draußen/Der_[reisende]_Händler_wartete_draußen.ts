import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Der [reisende] Händler wartete draußen.",
} as const satisfies AttestedSelection;
