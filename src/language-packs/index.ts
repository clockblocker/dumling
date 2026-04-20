import type { LanguageApi } from "../types/public-types";
import type {
	EnLemmaSchemaTree,
	EnSelectionSchemaTree,
	EnSurfaceSchemaTree,
	DeLemmaSchemaTree,
	DeSelectionSchemaTree,
	DeSurfaceSchemaTree,
	HeLemmaSchemaTree,
	HeSelectionSchemaTree,
	HeSurfaceSchemaTree,
} from "../schemas/internal-types";
import { deLemmaSchema } from "../schemas/language-packs/de/de-lemma";
import { deSelectionSchema } from "../schemas/language-packs/de/de-selection";
import { deSurfaceSchema } from "../schemas/language-packs/de/de-surface";
import { deLexemeRuntimeSchemas } from "../schemas/language-packs/de/lexeme/de-lexemes";
import { deMorphemeRuntimeSchemas } from "../schemas/language-packs/de/morpheme/de-morphemes";
import { dePhrasemeRuntimeSchemas } from "../schemas/language-packs/de/phraseme/de-phrasemes";
import { enLemmaSchema } from "../schemas/language-packs/en/en-lemma";
import { enSelectionSchema } from "../schemas/language-packs/en/en-selection";
import { enSurfaceSchema } from "../schemas/language-packs/en/en-surface";
import { enLexemeRuntimeSchemas } from "../schemas/language-packs/en/lexeme/en-lexemes";
import { enMorphemeRuntimeSchemas } from "../schemas/language-packs/en/morpheme/en-morphemes";
import { enPhrasemeRuntimeSchemas } from "../schemas/language-packs/en/phraseme/en-phrasemes";
import { heLemmaSchema } from "../schemas/language-packs/he/he-lemma";
import { heSelectionSchema } from "../schemas/language-packs/he/he-selection";
import { heSurfaceSchema } from "../schemas/language-packs/he/he-surface";
import { heLexemeRuntimeSchemas } from "../schemas/language-packs/he/lexeme/he-lexemes";
import { heMorphemeRuntimeSchemas } from "../schemas/language-packs/he/morpheme/he-morphemes";
import { hePhrasemeRuntimeSchemas } from "../schemas/language-packs/he/phraseme/he-phrasemes";
import { buildUnionSchema } from "../schemas/shared/builders";
import { buildDeCreateOperations } from "../operations/lang/de/create";
import { buildDeParseOperations } from "../operations/lang/de/parse";
import { buildEnCreateOperations } from "../operations/lang/en/create";
import { buildEnParseOperations } from "../operations/lang/en/parse";
import { buildHeCreateOperations } from "../operations/lang/he/create";
import { buildHeParseOperations } from "../operations/lang/he/parse";
import type {
	ImplementedLanguagePackDescriptor,
	LanguagePackRegistry,
	RuntimeSchemaSet,
} from "./contracts";
import type { LanguageTypePackMap } from "./type-packs";

type DeSchemaTree = {
	lemma: DeLemmaSchemaTree;
	selection: DeSelectionSchemaTree;
	surface: DeSurfaceSchemaTree;
};

type EnSchemaTree = {
	lemma: EnLemmaSchemaTree;
	selection: EnSelectionSchemaTree;
	surface: EnSurfaceSchemaTree;
};

type HeSchemaTree = {
	lemma: HeLemmaSchemaTree;
	selection: HeSelectionSchemaTree;
	surface: HeSurfaceSchemaTree;
};

type LanguagePackSchemaTreeMap = {
	de: DeSchemaTree;
	en: EnSchemaTree;
	he: HeSchemaTree;
};

type LanguagePackCreateMap = {
	de: LanguageApi<"de">["create"];
	en: LanguageApi<"en">["create"];
	he: LanguageApi<"he">["create"];
};

type LanguagePackParseMap = {
	de: LanguageApi<"de">["parse"];
	en: LanguageApi<"en">["parse"];
	he: LanguageApi<"he">["parse"];
};

const deRuntimeSchemas = {
	lemma: buildUnionSchema([
		deLexemeRuntimeSchemas.lemma,
		deMorphemeRuntimeSchemas.lemma,
		dePhrasemeRuntimeSchemas.lemma,
	]),
	surface: buildUnionSchema([
		deLexemeRuntimeSchemas.surface,
		deMorphemeRuntimeSchemas.surface,
		dePhrasemeRuntimeSchemas.surface,
	]),
	selection: buildUnionSchema([
		deLexemeRuntimeSchemas.selection,
		deMorphemeRuntimeSchemas.selection,
		dePhrasemeRuntimeSchemas.selection,
	]),
} satisfies RuntimeSchemaSet<LanguageTypePackMap["de"]>;

const enRuntimeSchemas = {
	lemma: buildUnionSchema([
		enLexemeRuntimeSchemas.lemma,
		enMorphemeRuntimeSchemas.lemma,
		enPhrasemeRuntimeSchemas.lemma,
	]),
	surface: buildUnionSchema([
		enLexemeRuntimeSchemas.surface,
		enMorphemeRuntimeSchemas.surface,
		enPhrasemeRuntimeSchemas.surface,
	]),
	selection: buildUnionSchema([
		enLexemeRuntimeSchemas.selection,
		enMorphemeRuntimeSchemas.selection,
		enPhrasemeRuntimeSchemas.selection,
	]),
} satisfies RuntimeSchemaSet<LanguageTypePackMap["en"]>;

const heRuntimeSchemas = {
	lemma: buildUnionSchema([
		heLexemeRuntimeSchemas.lemma,
		heMorphemeRuntimeSchemas.lemma,
		hePhrasemeRuntimeSchemas.lemma,
	]),
	surface: buildUnionSchema([
		heLexemeRuntimeSchemas.surface,
		heMorphemeRuntimeSchemas.surface,
		hePhrasemeRuntimeSchemas.surface,
	]),
	selection: buildUnionSchema([
		heLexemeRuntimeSchemas.selection,
		heMorphemeRuntimeSchemas.selection,
		hePhrasemeRuntimeSchemas.selection,
	]),
} satisfies RuntimeSchemaSet<LanguageTypePackMap["he"]>;

const deLanguagePack: ImplementedLanguagePackDescriptor<
	"de",
	LanguageTypePackMap["de"],
	DeSchemaTree,
	LanguageApi<"de">["create"],
	LanguageApi<"de">["parse"]
> = {
	create: buildDeCreateOperations(),
	language: "de",
	parse: buildDeParseOperations(deRuntimeSchemas) as LanguageApi<"de">["parse"],
	runtimeSchemas: deRuntimeSchemas,
	schema: {
		lemma: deLemmaSchema,
		selection: deSelectionSchema,
		surface: deSurfaceSchema,
	},
	status: "implemented",
};

const enLanguagePack: ImplementedLanguagePackDescriptor<
	"en",
	LanguageTypePackMap["en"],
	EnSchemaTree,
	LanguageApi<"en">["create"],
	LanguageApi<"en">["parse"]
> = {
	create: buildEnCreateOperations(),
	language: "en",
	parse: buildEnParseOperations(enRuntimeSchemas) as LanguageApi<"en">["parse"],
	runtimeSchemas: enRuntimeSchemas,
	schema: {
		lemma: enLemmaSchema,
		selection: enSelectionSchema,
		surface: enSurfaceSchema,
	},
	status: "implemented",
};

const heLanguagePack: ImplementedLanguagePackDescriptor<
	"he",
	LanguageTypePackMap["he"],
	HeSchemaTree,
	LanguageApi<"he">["create"],
	LanguageApi<"he">["parse"]
> = {
	create: buildHeCreateOperations(),
	language: "he",
	parse: buildHeParseOperations(heRuntimeSchemas) as LanguageApi<"he">["parse"],
	runtimeSchemas: heRuntimeSchemas,
	schema: {
		lemma: heLemmaSchema,
		selection: heSelectionSchema,
		surface: heSurfaceSchema,
	},
	status: "implemented",
};

type ImplementedLanguagePacks = {
	de: typeof deLanguagePack;
	en: typeof enLanguagePack;
	he: typeof heLanguagePack;
};

const languagePacksInternal: ImplementedLanguagePacks = {
	de: deLanguagePack,
	en: enLanguagePack,
	he: heLanguagePack,
};

export const languagePacks: typeof languagePacksInternal = languagePacksInternal;
