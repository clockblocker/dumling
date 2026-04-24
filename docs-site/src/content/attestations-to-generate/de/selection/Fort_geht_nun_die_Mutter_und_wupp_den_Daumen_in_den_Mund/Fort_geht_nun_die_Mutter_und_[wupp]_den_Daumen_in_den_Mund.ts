import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Fort geht nun die Mutter und
[wupp]! den Daumen in den Mund.
`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
