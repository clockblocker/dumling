import { dumling } from "dumling";
import { schema } from "dumling/schema";
import type * as z from "zod/v3";
import type { AbstractLemma, Lemma, Selection } from "dumling/types";

const lemma: Lemma<"de", "Lexeme", "NOUN"> = dumling.de.create.lemma({
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {},
	meaningInEmojis: "🌊",
});

const selection: Selection<"de"> = dumling.de.convert.lemma.toSelection(lemma, {
	spelledSelection: "See",
});
const parsed = dumling.de.parse.selection(selection);
if (!parsed.success) throw new Error(parsed.error.message);
const selectionId = dumling.de.id.encode(parsed.data);
const decoded = dumling.de.id.decodeAs("Selection", selectionId);
if (!decoded.success) throw new Error(decoded.error.message);
const nounLemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "NOUN">> = schema.de.lemma.lexeme.noun();
const nounSelectionSchema: z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "NOUN">> = schema.de.selection.standard.lemma.lexeme.noun();
const abstractVerbSchema: z.ZodType<AbstractLemma<string, "Lexeme", "VERB">> = schema.abstract.lemma.lexeme.verb();
nounLemmaSchema.parse(lemma);
nounSelectionSchema.parse(decoded.data);
abstractVerbSchema.parse({
	language: "xx",
	canonicalLemma: "gehen",
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeatures: {},
	meaningInEmojis: "🚶",
});
schema.de.selection.standard.lemma.lexeme.noun().parse(decoded.data);