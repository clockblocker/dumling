/** biome-ignore-all lint/correctness/noUnusedVariables: README example file */
import { dumling } from "../../src";
import { schema } from "../../src/schema";
import type { Lemma, Selection, Surface } from "../../src/types";

// README_BLOCK:core-lemma:start
const seeLemma = {
	language: "de",
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		gender: "Masc",
	},
	meaningInEmojis: "🌊",
} satisfies Lemma<"de", "Lexeme", "NOUN">;
// README_BLOCK:core-lemma:end

// README_BLOCK:core-surface:start
const seeSurface = dumling.de.convert.lemma.toSurface(seeLemma) satisfies Surface<
	"de",
	"Lemma",
	"Lexeme",
	"NOUN"
>;
// README_BLOCK:core-surface:end

// README_BLOCK:core-selection:start
const seeSelection = dumling.de.convert.surface.toSelection(seeSurface, {
	spelledSelection: "See",
}) satisfies Selection<"de">;
// README_BLOCK:core-selection:end

// README_BLOCK:quickstart-de:start
import { dumling as packageDumling } from "dumling";
import { schema as packageSchema } from "dumling/schema";
import type { Lemma as PackageLemma } from "dumling/types";

const lemma = packageDumling.de.create.lemma({
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		gender: "Masc",
	},
	meaningInEmojis: "🌊",
}) satisfies PackageLemma<"de", "Lexeme", "NOUN">;

const surface = packageDumling.de.convert.lemma.toSurface(lemma);
const selection = packageDumling.de.convert.surface.toSelection(surface, {
	spelledSelection: "See",
});

const parsed = packageDumling.de.parse.selection(selection);
if (!parsed.success) {
	throw new Error(parsed.error.message);
}

const id = packageDumling.de.id.encode(parsed.data);
const decoded = packageDumling.de.id.decodeAs("Selection", id);
if (!decoded.success) {
	throw new Error(decoded.error.message);
}

packageSchema.de.selection.standard.lemma.lexeme.noun().parse(decoded.data);
// README_BLOCK:quickstart-de:end

void schema.abstract.lemma.lexeme.verb();
