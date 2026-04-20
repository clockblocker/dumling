import type { Surface } from "../../../../src/types";
import { germanHausLemma } from "./lemmas";

// Attestation: "Das [Haus] steht leer."
export const germanHausLemmaSurface = {
	language: "de",
	normalizedFullSurface: "Haus",
	surfaceKind: "Lemma",
	lemma: germanHausLemma,
} satisfies Surface<"de", "Lemma", "Lexeme", "NOUN">;
