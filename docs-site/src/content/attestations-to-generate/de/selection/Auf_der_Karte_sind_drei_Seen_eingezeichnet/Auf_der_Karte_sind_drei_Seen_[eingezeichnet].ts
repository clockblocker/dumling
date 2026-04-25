import type { AttestedSelection, Selection } from "dumling/types";

const deSelection = {

} satisfies Selection<>;

export const attestation = {
	selection: deSelection,
	sentenceMarkdown: "Auf der Karte sind drei Seen [eingezeichnet].",
	classifierNotes: "",
} as const satisfies AttestedSelection;
