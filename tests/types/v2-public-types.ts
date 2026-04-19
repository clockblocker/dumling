import type { ZodType } from "zod/v3";
import { dumling } from "../../src";
import { schema } from "../../src/schema";
import type {
	FeatureNameFor,
	FeatureValueFor,
	Lemma,
	LemmaKindFor,
	LemmaSubKindFor,
	Selection,
	Surface,
	SurfaceKindFor,
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
const featureName: FeatureNameFor<"de", "Lexeme", "NOUN"> = "gender";
const deLemmaKind: LemmaKindFor<"de"> = "Lexeme";
const deLexemeSubKind: LemmaSubKindFor<"de", "Lexeme"> = "NOUN";
const deSurfaceKind: SurfaceKindFor<"de"> = "Lemma";
void featureName;
void deLemmaKind;
void deLexemeSubKind;
void deSurfaceKind;
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

const enLemma = dumling.en.create.lemma({
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		numType: "Card",
	},
	meaningInEmojis: "👀",
}) satisfies Lemma<"en", "Lexeme", "NOUN">;

const enSelectionLeaf = schema.en.selection.standard.lemma.lexeme.noun();
enSelectionLeaf satisfies ZodType<Selection<"en", "Standard", "Lemma", "Lexeme", "NOUN">>;

const enPronType: FeatureValueFor<"en", "Lexeme", "PRON", "pronType"> = [
	"Prs",
	"Rel",
];
void enLemma;
void enPronType;

const heLemma = dumling.he.create.lemma({
	canonicalLemma: "כתב",
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeatures: {
		hebBinyan: "PAAL",
	},
	meaningInEmojis: "✍️",
}) satisfies Lemma<"he", "Lexeme", "VERB">;

const heVerbLeaf = schema.he.lemma.lexeme.verb();
heVerbLeaf satisfies ZodType<Lemma<"he", "Lexeme", "VERB">>;

const heBinyan: FeatureValueFor<"he", "Lexeme", "VERB", "hebBinyan"> = "PAAL";
void heLemma;
void heVerbLeaf;
void heBinyan;

// @ts-expect-error lexeme does not expose morpheme subkinds
schema.de.selection.standard.lemma.lexeme.circumfix();

void inflectionSurface;
