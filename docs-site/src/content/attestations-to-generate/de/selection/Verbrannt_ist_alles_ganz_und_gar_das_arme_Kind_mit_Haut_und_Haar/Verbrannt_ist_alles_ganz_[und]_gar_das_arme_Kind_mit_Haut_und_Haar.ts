import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Verbrannt ist alles ganz [und] gar,
das arme Kind mit Haut und Haar;`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
