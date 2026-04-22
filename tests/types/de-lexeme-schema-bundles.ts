import { z } from "zod/v3";
import { schemasFor } from "../../src/schema";
import type {
	Lemma,
	Selection,
	Surface,
} from "../../src/types/public-types";

const adjectiveLemma = schemasFor.de.entity.Lemma.Lexeme.ADJ();
const adpositionLemma = schemasFor.de.entity.Lemma.Lexeme.ADP();

adjectiveLemma satisfies z.ZodType<Lemma<"de", "Lexeme", "ADJ">>;
adpositionLemma satisfies z.ZodType<Lemma<"de", "Lexeme", "ADP">>;

schemasFor.de.entity.Surface.Lemma.Lexeme.ADP() satisfies z.ZodType<
	Surface<"de", "Lemma", "Lexeme", "ADP">
>;

schemasFor.de.entity.Selection.Typo.Lemma.Lexeme.ADP() satisfies z.ZodType<
	Selection<"de", "Typo", "Lemma", "Lexeme", "ADP">
>;

schemasFor.de.entity.Surface.Inflection.Lexeme.ADJ() satisfies z.ZodType<
	Surface<"de", "Inflection", "Lexeme", "ADJ">
>;

// @ts-expect-error uninflectable lexemes do not expose inflection surfaces.
schemasFor.de.entity.Surface.Inflection.Lexeme.ADP();

// @ts-expect-error adjective schemas cannot be treated as adposition schemas.
adjectiveLemma satisfies z.ZodType<Lemma<"de", "Lexeme", "ADP">>;
