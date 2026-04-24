import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Und Minz und Maunz, [die] schreien
gar jämmerlich zu zweien`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
