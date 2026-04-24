import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `[Es] brennt die Hand, es brennt das Haar,
es brennt das ganze Kind sogar.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
