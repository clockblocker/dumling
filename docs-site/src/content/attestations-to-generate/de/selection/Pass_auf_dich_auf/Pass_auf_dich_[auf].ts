import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {

} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Pass auf dich [auf]!",
} as const satisfies AttestedSelection;
