import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Jetzt schien die Sonne gar zu sehr,
da [ward] ihm sein Gewehr zu schwer.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
