/** biome-ignore-all lint/correctness/noUnusedVariables: README example file */
import {
	idCodec,
	operation,
} from "../../src";
import type { Lemma, Selection, Surface } from "../../src/entities";
import { schemaFor } from "../../src/schema";

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
	inflectionalFeatures: {
		tense: "Past",
		verbForm: "Fin",
	},
	language: "English",
	normalizedFullSurface: "gave up",
	surfaceKind: "Inflection",
	lemma: giveUpLemma,
} satisfies Surface<
	"English",
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

// README_BLOCK:story-give-up-ids:start
const giveUpLemmaId = idCodec.English.makeDumlingIdFor(giveUpLemma);
// "ling:v1:EN:LEM;give up;Lexeme;VERB;phrasal=Yes;🏳️"

const gaveUpSurfaceId = idCodec.English.makeDumlingIdFor(gaveUpSurface);
// "ling:v1:EN:SURF;gave up;Inflection;Lexeme;VERB;tense=Past,verbForm=Fin;give up;Lexeme;VERB;phrasal=Yes;🏳️"

const gvaeSelectionId = idCodec.English.makeDumlingIdFor(gvaeSelection);
// "ling:v1:EN:SEL;Typo;Canonical;Partial;gvae;SURF;gave up;Inflection;Lexeme;VERB;tense=Past,verbForm=Fin;give up;Lexeme;VERB;phrasal=Yes;🏳️"
// README_BLOCK:story-give-up-ids:end

void [giveUpLemmaId, gaveUpSurfaceId, gvaeSelectionId];

// README_BLOCK:quickstart-walk:start
import { idCodec, operation } from "dumling";
import type { Lemma } from "dumling/entities";
import { schemaFor } from "dumling/schema";

const walkLemma = {
	canonicalLemma: "walk",
	inherentFeatures: {},
	language: "English",
	lemmaKind: "Lexeme",
	meaningInEmojis: "🚶",
	pos: "VERB",
} satisfies Lemma<"English", "Lexeme", "VERB">;

const walkSurface = operation.convert.lemma.toSurface(walkLemma);

const walkSelection = operation.convert.surface.toStandardFullSelection(
	walkSurface,
	{
		spelledSelection: "walk",
	},
);

const walkSelectionId = idCodec.English.makeDumlingIdFor(walkSelection);

const parsedWalkSelection =
	schemaFor.Selection.English.Standard.Lemma.Lexeme.VERB.parse(walkSelection);
// README_BLOCK:quickstart-walk:end

void [walkSelectionId, parsedWalkSelection];
