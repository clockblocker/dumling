import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `nahm Ranzen, Pulverhorn und Flint
und lief [hinaus] ins Feld geschwind`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
