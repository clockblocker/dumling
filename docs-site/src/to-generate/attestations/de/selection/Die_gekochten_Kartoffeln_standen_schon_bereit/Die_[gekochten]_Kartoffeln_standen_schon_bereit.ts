import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Die [gekochten] Kartoffeln standen schon bereit.",
} as const satisfies AttestedSelection;
