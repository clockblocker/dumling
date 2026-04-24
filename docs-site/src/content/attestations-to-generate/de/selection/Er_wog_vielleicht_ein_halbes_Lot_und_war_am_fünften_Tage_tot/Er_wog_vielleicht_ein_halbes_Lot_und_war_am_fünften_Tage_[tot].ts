import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Er wog vielleicht ein halbes Lot –
und war am fünften Tage [tot].
`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
