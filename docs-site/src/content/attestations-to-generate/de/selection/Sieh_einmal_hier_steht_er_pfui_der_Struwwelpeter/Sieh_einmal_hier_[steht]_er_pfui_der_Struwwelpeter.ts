import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Sieh einmal, hier [steht] er, 
pfui, der Struwwelpeter!`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
