import type { ZodType } from "zod/v3";
import { dumling } from "../../src";
import {
	abstractSchemas,
	getSchemaTreeFor,
	schemasFor,
} from "../../src/schema";
import type {
	AbstractLemma,
	ApiResult,
	Descriptor,
	DumlingBase64Url,
	DumlingCsv,
	EntityForKind,
	EntityKind,
	EntityValue,
	FeatureName,
	FeatureSetKind,
	FeatureValue,
	IdDecodeError,
	IdDecodeSuccess,
	Lemma,
	LemmaKindFor,
	LemmaSubKindFor,
	ParseError,
	Selection,
	SelectionOptionsFor,
	SupportedLanguage,
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

const citationSurface = dumling.de.create.surface.citation({
	lemma,
	normalizedFullSurface: "see",
}) satisfies Surface<"de", "Citation", "Lexeme", "NOUN">;

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
	surface: citationSurface,
}) satisfies Selection<"de", "Typo", "Citation", "Lexeme", "NOUN">;
const standardSelection = dumling.de.convert.lemma.toSelection(
	lemma,
) satisfies Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">;
const typoFromLemma = dumling.de.convert.lemma.toSelection(lemma, {
	orthographicStatus: "Typo",
}) satisfies Selection<"de", "Typo", "Citation", "Lexeme", "NOUN">;
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
	surfaceKind: "Citation";
	lemmaKind: "Lexeme";
	lemmaSubKind: "NOUN";
};
const selectionDescriptor = dumling.de.describe.as.selection(
	inflectionSurface,
) satisfies {
	language: "de";
	orthographicStatus: "Standard";
	surfaceKind: "Inflection";
	lemmaKind: "Lexeme";
	lemmaSubKind: "VERB";
};
lemmaDescriptor satisfies Descriptor<"Lemma", "de", "Lexeme", "NOUN">;
surfaceDescriptor satisfies Descriptor<
	"Surface",
	"de",
	"Lexeme",
	"NOUN",
	"Citation"
>;
selectionDescriptor satisfies Descriptor<
	"Selection",
	"de",
	"Lexeme",
	"VERB",
	"Inflection",
	"Standard"
>;
selectionDescriptor satisfies Descriptor<EntityKind, "de">;

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
const deFusionKind: LemmaKindFor<"de"> = "Fusion";
const deFusionSubKind: LemmaSubKindFor<"de", "Fusion"> = "General";
const deSurfaceKind: SurfaceKindFor<"de"> = "Citation";
void featureName;
void unionKindFeatureName;
void unionKindFeatureValue;
void deLemmaKind;
void deLexemeSubKind;
void deFusionKind;
void deFusionSubKind;
void deSurfaceKind;
void gender;
void standardSelection;
void typoFromLemma;
void typoFromInflectionSurface;
void lemmaDescriptor;
void surfaceDescriptor;
void selectionDescriptor;

// @ts-expect-error invalid NOUN gender feature value
const invalidGender: FeatureValue<
	"de",
	"inherent",
	"Lexeme",
	"NOUN",
	"gender"
> = "Past";
void invalidGender;

const selectionId = dumling.de.id.encode.asBase64Url(typoSelection);
selectionId satisfies DumlingBase64Url<"de">;
const selectionCsv = dumling.de.id.encode.asCsv(typoSelection);
selectionCsv satisfies DumlingCsv<"de">;
// @ts-expect-error plain strings are not branded Dumling base64url IDs
const unbrandedId: DumlingBase64Url<"de"> = "abc";
const entityValue: EntityValue<"de"> = typoSelection;
const selectionForKind: EntityForKind<"de", "Selection"> = typoSelection;
const typoOptions: SelectionOptionsFor<"Typo"> = {
	orthographicStatus: "Typo",
	spelledSelection: "Sse",
};
const decodedSelection = dumling.de.id.decode.asSelection(selectionId);
decodedSelection satisfies ApiResult<
	Extract<IdDecodeSuccess<"de">, { kind: "Selection" }>,
	IdDecodeError
>;
declare const parseError: ParseError;
void parseError;
void entityValue;
void selectionForKind;
void typoOptions;
void unbrandedId;

if (decodedSelection.success) {
	decodedSelection.data satisfies IdDecodeSuccess<"de">;
	decodedSelection.data.selection satisfies Selection<"de">;
	decodedSelection.data.selection.spelledSelection;
}

const deSelectionLeaf =
	schemasFor.de.entity.Selection.Standard.Citation.Lexeme.NOUN();
deSelectionLeaf satisfies ZodType<
	Selection<"de", "Standard", "Citation", "Lexeme", "NOUN">
>;
const deFusionLemma = dumling.de.create.lemma({
	canonicalLemma: "zum",
	lemmaKind: "Fusion",
	lemmaSubKind: "General",
	inherentFeatures: {},
	meaningInEmojis: "➡️",
}) satisfies Lemma<"de", "Fusion", "General">;
const deFusionSelection = dumling.de.convert.lemma.toSelection(
	deFusionLemma,
) satisfies Selection<"de", "Standard", "Citation", "Fusion", "General">;
void deFusionSelection;
const deFusionSelectionLeaf =
	schemasFor.de.entity.Selection.Standard.Citation.Fusion.General();
deFusionSelectionLeaf satisfies ZodType<
	Selection<"de", "Standard", "Citation", "Fusion", "General">
>;
const deLemmaDescriptorLeaf = schemasFor.de.descriptor.Lemma.Lexeme.NOUN;
deLemmaDescriptorLeaf satisfies ZodType<
	Descriptor<"Lemma", "de", "Lexeme", "NOUN">
>;
const deSelectionDescriptorLeaf =
	schemasFor.de.descriptor.Selection.Standard.Citation.Lexeme.NOUN;
deSelectionDescriptorLeaf satisfies ZodType<
	Descriptor<"Selection", "de", "Lexeme", "NOUN", "Citation", "Standard">
>;
abstractSchemas.entity.Lemma satisfies ZodType<AbstractLemma<string>>;
const deSchemaTree = getSchemaTreeFor("de");
deSchemaTree.entity.Selection.Standard.Citation.Lexeme.NOUN();
declare const language: SupportedLanguage;
const dynamicSchemaTree = getSchemaTreeFor(language);
dynamicSchemaTree.entity.Selection.Standard.Citation.Lexeme.NOUN();
getSchemaTreeFor(language).entity.Selection.Standard.Citation.Lexeme.NOUN();

const enLemma = dumling.en.create.lemma({
	canonicalLemma: "see",
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeatures: {
		numType: "Card",
	},
	meaningInEmojis: "👀",
}) satisfies Lemma<"en", "Lexeme", "NOUN">;

const enSelectionLeaf =
	schemasFor.en.entity.Selection.Standard.Citation.Lexeme.NOUN();
enSelectionLeaf satisfies ZodType<
	Selection<"en", "Standard", "Citation", "Lexeme", "NOUN">
>;

const enPronType: FeatureValue<"en", "inherent", "Lexeme", "PRON", "pronType"> =
	["Prs", "Rel"];
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

const heVerbLeaf = schemasFor.he.entity.Lemma.Lexeme.VERB();
heVerbLeaf satisfies ZodType<Lemma<"he", "Lexeme", "VERB">>;
const heStandardSelection = dumling.he.convert.lemma.toSelection(
	heLemma,
) satisfies Selection<"he", "Standard", "Citation", "Lexeme", "VERB">;

const heBinyan: FeatureValue<"he", "inherent", "Lexeme", "VERB", "hebBinyan"> =
	"PAAL";
const heVoice: FeatureValue<"he", "inflectional", "Lexeme", "VERB", "voice"> =
	"Act";
void heLemma;
void heVerbLeaf;
void heBinyan;
void heStandardSelection;
void heVoice;

// @ts-expect-error lexeme does not expose morpheme subkinds
schemasFor.de.entity.Selection.Standard.Citation.Lexeme.Circumfix();

void inflectionSurface;
