import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {
	
} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: `Der hockte da im grünen Gras;
dem [floß] der Kaffee auf die Nas.`,
	classifierNotes: "",
} as const satisfies AttestedSelection;
