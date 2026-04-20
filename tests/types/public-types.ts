import type { ZodType } from "zod/v3";
import { dumling } from "../../src";
import { schema } from "../../src/schema";
import type {
	FeatureName,
	FeatureSetKind,
	FeatureValue,
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
const standardSelection = dumling.de.convert.lemma.toSelection(lemma) satisfies Selection<
	"de",
	"Standard",
	"Lemma",
	"Lexeme",
	"NOUN"
>;
const typoFromLemma = dumling.de.convert.lemma.toSelection(lemma, {
	orthographicStatus: "Typo",
}) satisfies Selection<"de", "Typo", "Lemma", "Lexeme", "NOUN">;
const typoFromInflectionSurface = dumling.de.convert.surface.toSelection(
	inflectionSurface,
	{
		orthographicStatus: "Typo",
	},
) satisfies Selection<"de", "Typo", "Inflection", "Lexeme", "VERB">;
const lemmaDescriptor = dumling.de.describe.as.lemma(typoSelection) satisfies {
	language: "de";
	lemmaKind: "Lexeme";
	lemmaSubKind: "NOUN";
};
const surfaceDescriptor = dumling.de.describe.as.surface(lemma) satisfies {
	language: "de";
	surfaceKind: "Lemma";
	lemmaKind: "Lexeme";
	lemmaSubKind: "NOUN";
};
const selectionDescriptor = dumling.de.describe.as.selection(inflectionSurface) satisfies {
	language: "de";
	orthographicStatus: "Standard";
	surfaceKind: "Inflection";
	lemmaKind: "Lexeme";
	lemmaSubKind: "VERB";
};

const gender: FeatureValue<"de", "inherent", "Lexeme", "NOUN", "gender"> =
	"Masc";
const featureName: FeatureName<"de", "inherent", "Lexeme", "NOUN"> = "gender";
const unionKindFeatureName: FeatureName<
	"de",
	FeatureSetKind,
	"Lexeme",
	"NOUN"
> = Math.random() > 0.5 ? "gender" : "number";
const unionKindFeatureValue: FeatureValue<
	"de",
	FeatureSetKind,
	"Lexeme",
	"NOUN",
	"gender" | "number"
> = Math.random() > 0.5 ? "Masc" : "Sing";
const deLemmaKind: LemmaKindFor<"de"> = "Lexeme";
const deLexemeSubKind: LemmaSubKindFor<"de", "Lexeme"> = "NOUN";
const deSurfaceKind: SurfaceKindFor<"de"> = "Lemma";
void featureName;
void unionKindFeatureName;
void unionKindFeatureValue;
void deLemmaKind;
void deLexemeSubKind;
void deSurfaceKind;
void gender;
void standardSelection;
void typoFromLemma;
void typoFromInflectionSurface;
void lemmaDescriptor;
void surfaceDescriptor;
void selectionDescriptor;

// @ts-expect-error invalid NOUN gender feature value
const invalidGender: FeatureValue<"de", "inherent", "Lexeme", "NOUN", "gender"> =
	"Past";
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

const enPronType: FeatureValue<"en", "inherent", "Lexeme", "PRON", "pronType"> = [
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
const heStandardSelection = dumling.he.convert.lemma.toSelection(
	heLemma,
) satisfies Selection<"he", "Standard", "Lemma", "Lexeme", "VERB">;

const heBinyan: FeatureValue<
	"he",
	"inherent",
	"Lexeme",
	"VERB",
	"hebBinyan"
> = "PAAL";
const heVoice: FeatureValue<"he", "inflectional", "Lexeme", "VERB", "voice"> =
	"Act";
void heLemma;
void heVerbLeaf;
void heBinyan;
void heStandardSelection;
void heVoice;

// @ts-expect-error lexeme does not expose morpheme subkinds
schema.de.selection.standard.lemma.lexeme.circumfix();

void inflectionSurface;
