import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Es zog der wilde Jägersmann
sein grasgrün neues Röcklein [an];`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
