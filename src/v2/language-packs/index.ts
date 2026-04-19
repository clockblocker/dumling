import type { LanguageApi } from "../public-types";
import type {
	AbstractLemmaSchemaTree,
	AbstractSelectionSchemaTree,
	AbstractSurfaceSchemaTree,
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
import { buildUnionSchema } from "../schemas/shared/builders";
import { buildDeCreateOperations } from "../operations/lang/de/create";
import { buildDeParseOperations } from "../operations/lang/de/parse";
import type {
	LanguagePackDescriptor,
	RuntimeSchemaSet,
} from "./contracts";
import type { LanguageTypePackMap } from "./type-packs";

type DeSchemaTree = {
	lemma: DeLemmaSchemaTree;
	selection: DeSelectionSchemaTree;
	surface: DeSurfaceSchemaTree;
};

type StubSchemaTree = {
	lemma: AbstractLemmaSchemaTree;
	selection: AbstractSelectionSchemaTree;
	surface: AbstractSurfaceSchemaTree;
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
} as RuntimeSchemaSet<LanguageTypePackMap["de"]>;

const stubSchemaSource = {
	lemma: abstractLemmaSchema,
	selection: abstractSelectionSchema,
	surface: abstractSurfaceSchema,
};

const deLanguagePack: LanguagePackDescriptor<
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

const enLanguagePack: LanguagePackDescriptor<
	"en",
	LanguageTypePackMap["en"],
	StubSchemaTree,
	LanguageApi<"en">["create"],
	LanguageApi<"en">["parse"]
> = {
	language: "en",
	schema: stubSchemaSource,
	status: "stub",
};

const heLanguagePack: LanguagePackDescriptor<
	"he",
	LanguageTypePackMap["he"],
	StubSchemaTree,
	LanguageApi<"he">["create"],
	LanguageApi<"he">["parse"]
> = {
	language: "he",
	schema: stubSchemaSource,
	status: "stub",
};

export const languagePacks = {
	de: deLanguagePack,
	en: enLanguagePack,
	he: heLanguagePack,
};
