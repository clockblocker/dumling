import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `[Einst] ging er an Ufers Rand
mit der Mappe in der Hand.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
