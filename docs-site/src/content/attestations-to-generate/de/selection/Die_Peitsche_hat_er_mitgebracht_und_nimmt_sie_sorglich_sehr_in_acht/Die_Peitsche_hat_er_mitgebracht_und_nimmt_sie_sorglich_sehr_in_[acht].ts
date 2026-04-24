import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Die Peitsche hat er mitgebracht
und nimmt sie sorglich sehr in [acht].`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
