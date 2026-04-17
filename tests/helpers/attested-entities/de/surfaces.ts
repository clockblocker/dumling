import type { Surface } from "../../../../src";
import { germanHausLemma } from "./lemmas";

// Attestation: "Das [Haus] steht leer."
export const germanHausLemmaSurface = {
	language: "German",
	normalizedFullSurface: "Haus",
	surfaceKind: "Lemma",
	lemma: germanHausLemma,
} satisfies Surface<"German", "Lemma", "Lexeme", "NOUN">;
