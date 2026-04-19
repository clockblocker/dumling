import type { LanguageApi } from "../public-types";
import type {
	AbstractLemmaSchemaTree,
	AbstractSelectionSchemaTree,
	AbstractSurfaceSchemaTree,
	EnLemmaSchemaTree,
	EnSelectionSchemaTree,
	EnSurfaceSchemaTree,
	DeLemmaSchemaTree,
	DeSelectionSchemaTree,
	DeSurfaceSchemaTree,
} from "../schemas/internal-types";
import {
	abstractLemmaSchema,
	abstractSelectionSchema,
	abstractSurfaceSchema,
} from "../schemas/abstract/registry";
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
import { buildUnionSchema } from "../schemas/shared/builders";
import { buildDeCreateOperations } from "../operations/lang/de/create";
import { buildDeParseOperations } from "../operations/lang/de/parse";
import { buildEnCreateOperations } from "../operations/lang/en/create";
import { buildEnParseOperations } from "../operations/lang/en/parse";
import type {
	ImplementedLanguagePackDescriptor,
	LanguagePackDescriptor,
	LanguagePackRegistry,
	RuntimeSchemaSet,
	StubLanguagePackDescriptor,
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

type StubSchemaTree = {
	lemma: AbstractLemmaSchemaTree;
	selection: AbstractSelectionSchemaTree;
	surface: AbstractSurfaceSchemaTree;
};

type LanguagePackSchemaTreeMap = {
	de: DeSchemaTree;
	en: EnSchemaTree;
	he: StubSchemaTree;
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

const stubSchemaSource = {
	lemma: abstractLemmaSchema,
	selection: abstractSelectionSchema,
	surface: abstractSurfaceSchema,
} satisfies StubSchemaTree;

const deLanguagePack: ImplementedLanguagePackDescriptor<
	"de",
	LanguageTypePackMap["de"],
	DeSchemaTree,
	LanguageApi<"de">["create"],
	LanguageApi<"de">["parse"]
> = {
	create: buildDeCreateOperations() as LanguageApi<"de">["create"],
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
	create: buildEnCreateOperations() as LanguageApi<"en">["create"],
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

const heLanguagePack: StubLanguagePackDescriptor<
	"he",
	StubSchemaTree
> = {
	language: "he",
	schema: stubSchemaSource,
	status: "stub",
};

export const languagePacks = {
	de: deLanguagePack,
	en: enLanguagePack,
	he: heLanguagePack,
} satisfies LanguagePackRegistry<
	LanguagePackSchemaTreeMap,
	LanguagePackCreateMap,
	LanguagePackParseMap
>;
