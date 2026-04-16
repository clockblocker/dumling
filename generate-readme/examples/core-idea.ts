/** biome-ignore-all lint/correctness/noUnusedVariables: README example file */
import {
	dumling,
	type Lemma,
	type ResolvedSurface,
	type Selection,
} from "../../src";

// README_BLOCK:story-give-up-lemma:start
const giveUpLemma = {
	canonicalLemma: "give up",
	inherentFeatures: {
		phrasal: "Yes",
	},
	language: "English",
	lemmaKind: "Lexeme",
	meaningInEmojis: "🏳️",
	pos: "VERB",
} satisfies Lemma<"English", "Lexeme", "VERB">;
// README_BLOCK:story-give-up-lemma:end

// README_BLOCK:story-gave-up-surface:start
const gaveUpSurface = {
	discriminators: {
		lemmaKind: "Lexeme",
		lemmaSubKind: "VERB",
	},
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
	language: "English",
	normalizedFullSurface: "gave up",
	surfaceKind: "Inflection",
	target: giveUpLemma,
} satisfies ResolvedSurface<
	"English",
	"Typo",
	"Inflection",
	"Lexeme",
	"VERB"
>;
// README_BLOCK:story-gave-up-surface:end

// README_BLOCK:story-gvae-selection:start
const gvaeSelection = {
	language: "English",
	orthographicStatus: "Typo",
	selectionCoverage: "Partial",
	spelledSelection: "gvae",
	spellingRelation: "Canonical",
	surface: gaveUpSurface,
} satisfies Selection<"English", "Typo", "Inflection", "Lexeme", "VERB">;
// README_BLOCK:story-gvae-selection:end

// README_BLOCK:quickstart-walk:start
const walkLemma = {
	canonicalLemma: "walk",
	inherentFeatures: {},
	language: "English",
	lemmaKind: "Lexeme",
	meaningInEmojis: "🚶",
	pos: "VERB",
} satisfies Lemma<"English", "Lexeme", "VERB">;

const walkSurface = dumling.operation.convert.lemma.toResolvedLemmaSurface(
	walkLemma,
);

const walkSelection =
	dumling.operation.convert.surface.toStandardFullSelection(walkSurface, {
		spelledSelection: "walk",
	});

const walkSelectionId = dumling.idCodec.English.makeDumlingIdFor(walkSelection);

const parsedWalkSelection =
	dumling.schemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.parse(
		walkSelection,
	);
// README_BLOCK:quickstart-walk:end
