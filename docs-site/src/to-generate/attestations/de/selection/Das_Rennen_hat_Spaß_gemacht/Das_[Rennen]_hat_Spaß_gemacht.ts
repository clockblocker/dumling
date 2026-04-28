import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Das [Rennen] hat Spaß gemacht.",
} as const satisfies AttestedSelection;
