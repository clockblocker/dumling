import type { ZodType } from "zod/v3";
import { dumling } from "../../src";
import { schema } from "../../src/schema";
import type {
	FeatureValueFor,
	Lemma,
	Selection,
	Surface,
} from "../../src/types";

const lemma = dumling.de.create.lemma({
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		gender: "Masc",
	},
	meaningInEmojis: "🌊",
}) satisfies Lemma<"de", "Lexeme", "NOUN">;

const lemmaSurface = dumling.de.create.surface.lemma({
	lemma,
	normalizedFullSurface: "see",
}) satisfies Surface<"de", "Lemma", "Lexeme", "NOUN">;

const inflectionSurface = dumling.de.create.surface.inflection({
	lemma: dumling.de.create.lemma({
		canonicalLemma: "gehen",
		lemmaKind: "Lexeme",
		lemmaSubKind: "VERB",
		inherentFeatures: {},
		meaningInEmojis: "🚶",
	}),
	normalizedFullSurface: "geht",
	inflectionalFeatures: {
		number: "Sing",
		person: "3",
		verbForm: "Fin",
	},
}) satisfies Surface<"de", "Inflection", "Lexeme", "VERB">;

const typoSelection = dumling.de.create.selection.typo({
	selectionCoverage: "Full",
	spelledSelection: "Sse",
	spellingRelation: "Canonical",
	surface: lemmaSurface,
}) satisfies Selection<"de", "Typo", "Lemma", "Lexeme", "NOUN">;

const gender: FeatureValueFor<"de", "Lexeme", "NOUN", "gender"> = "Masc";
void gender;

// @ts-expect-error invalid NOUN gender feature value
const invalidGender: FeatureValueFor<"de", "Lexeme", "NOUN", "gender"> = "Past";
void invalidGender;

const selectionId = dumling.de.id.encode(typoSelection);
const decodedSelection = dumling.de.id.decodeAs("Selection", selectionId);

if (decodedSelection.success) {
	decodedSelection.data satisfies Selection<"de">;
	// @ts-expect-error selection decode does not expose lemma fields at the top level
	decodedSelection.data.lemmaKind;
}

const deSelectionLeaf = schema.de.selection.standard.lemma.lexeme.noun();
deSelectionLeaf satisfies ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "NOUN">>;

const heVerbLeaf = schema.he.lemma.lexeme.verb;
void heVerbLeaf;

// @ts-expect-error lexeme does not expose morpheme subkinds
schema.de.selection.standard.lemma.lexeme.circumfix();

void inflectionSurface;
