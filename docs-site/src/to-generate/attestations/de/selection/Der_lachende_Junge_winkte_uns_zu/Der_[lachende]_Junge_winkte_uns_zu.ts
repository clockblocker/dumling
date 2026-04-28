import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {} satisfies Selection;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Der [lachende] Junge winkte uns zu.",
} as const satisfies AttestedSelection;
