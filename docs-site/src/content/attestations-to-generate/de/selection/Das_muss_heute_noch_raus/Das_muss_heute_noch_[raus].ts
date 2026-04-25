import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {

} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Das muss heute noch [raus].",
} as const satisfies AttestedSelection;
