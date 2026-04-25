import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {

} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Das wäre [fast] schief [gewesen].",
} as const satisfies AttestedSelection;
