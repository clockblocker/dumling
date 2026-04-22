/** biome-ignore-all lint/correctness/noUnusedVariables: README example file */
import { dumling } from "../../src";
import { schemasFor } from "../../src/schema";
import type { Lemma, Selection, Surface } from "../../src/types";

// README_BLOCK:core-lemma:start
const seeLemma = dumling.de.create.lemma({
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		gender: "Masc",
	},
	meaningInEmojis: "🌊",
}) satisfies Lemma<"de", "Lexeme", "NOUN">;
// README_BLOCK:core-lemma:end

// README_BLOCK:core-surface:start
const seeSurface = dumling.de.create.surface.citation({
	lemma: seeLemma,
	normalizedFullSurface: "See",
}) satisfies Surface<
	"de",
	"Citation",
	"Lexeme",
	"NOUN"
>;
// README_BLOCK:core-surface:end

// README_BLOCK:core-selection:start
const seeSelection = dumling.de.create.selection.standard({
	selectionCoverage: "Full",
	spelledSelection: "See",
	spellingRelation: "Canonical",
	surface: seeSurface,
}) satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;
// README_BLOCK:core-selection:end

void seeSelection;

// README_BLOCK:quickstart-de:start
import { dumling as packageDumling } from "dumling";
import { schemasFor as packageSchemas } from "dumling/schema";
import type {
	FeatureValue as PackageFeatureValue,
	Lemma as PackageLemma,
} from "dumling/types";

const lemma = packageDumling.de.create.lemma({
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		gender: "Masc",
	},
	meaningInEmojis: "🌊",
}) satisfies PackageLemma<"de", "Lexeme", "NOUN">;

const surface = packageDumling.de.create.surface.citation({
	lemma,
	normalizedFullSurface: "See",
});
const selection = packageDumling.de.convert.surface.toSelection(surface, {
	spelledSelection: "See",
});
const descriptor = packageDumling.de.describe.as.selection(surface);
const extractedLemma = packageDumling.de.extract.lemma(selection);
const gender: PackageFeatureValue<
	"de",
	"inherent",
	"Lexeme",
	"NOUN",
	"gender"
> = "Masc";

const parsed = packageDumling.de.parse.selection(selection);
if (!parsed.success) {
	throw new Error(parsed.error.message);
}

const id = packageDumling.de.id.encode(parsed.data);
const decoded = packageDumling.de.id.decodeAs("Selection", id);
if (!decoded.success) {
	throw new Error(decoded.error?.message ?? "Failed to decode selection ID");
}

descriptor.surfaceKind satisfies "Citation";
extractedLemma satisfies PackageLemma<"de">;
gender satisfies "Masc";

packageSchemas.de.entity.Selection.Standard.Citation.Lexeme.NOUN().parse(
	decoded.data,
);
// README_BLOCK:quickstart-de:end

void schemasFor.de.entity.Lemma.Lexeme.VERB();
