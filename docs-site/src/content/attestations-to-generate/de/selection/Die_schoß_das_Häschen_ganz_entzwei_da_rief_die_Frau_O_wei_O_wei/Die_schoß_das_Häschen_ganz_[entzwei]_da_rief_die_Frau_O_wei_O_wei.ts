import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Die schoß das Häschen ganz [entzwei];
da rief die Frau: »O wei! O wei!«`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
