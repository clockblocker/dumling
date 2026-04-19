import type { EnLexemeLemmaBySubKind } from "../../../../types/language-packs/en/lexeme/en-lexemes";
import {
	buildFamilySchemaCatalog,
	defineSchemaCatalog,
	type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import { enAdjectiveSchemas } from "./pos/en-adjective";
import { enAdpositionSchemas } from "./pos/en-adposition";
import { enAdverbSchemas } from "./pos/en-adverb";
import { enAuxiliarySchemas } from "./pos/en-auxiliary";
import { enCoordinatingConjunctionSchemas } from "./pos/en-coordinating-conjunction";
import { enDeterminerSchemas } from "./pos/en-determiner";
import { enInterjectionSchemas } from "./pos/en-interjection";
import { enNounSchemas } from "./pos/en-noun";
import { enNumeralSchemas } from "./pos/en-numeral";
import { enOtherSchemas } from "./pos/en-other";
import { enParticleSchemas } from "./pos/en-particle";
import { enPronounSchemas } from "./pos/en-pronoun";
import { enProperNounSchemas } from "./pos/en-proper-noun";
import { enPunctuationSchemas } from "./pos/en-punctuation";
import { enSubordinatingConjunctionSchemas } from "./pos/en-subordinating-conjunction";
import { enSymbolSchemas } from "./pos/en-symbol";
import { enVerbSchemas } from "./pos/en-verb";

export const enLexemeSchemaCatalog = defineSchemaCatalog({
	adj: {
		key: "adj",
		lemmaSubKind: "ADJ",
		hasInflection: true,
		bundle: enAdjectiveSchemas,
	},
	adp: {
		key: "adp",
		lemmaSubKind: "ADP",
		hasInflection: false,
		bundle: enAdpositionSchemas,
	},
	adv: {
		key: "adv",
		lemmaSubKind: "ADV",
		hasInflection: true,
		bundle: enAdverbSchemas,
	},
	aux: {
		key: "aux",
		lemmaSubKind: "AUX",
		hasInflection: true,
		bundle: enAuxiliarySchemas,
	},
	cconj: {
		key: "cconj",
		lemmaSubKind: "CCONJ",
		hasInflection: false,
		bundle: enCoordinatingConjunctionSchemas,
	},
	det: {
		key: "det",
		lemmaSubKind: "DET",
		hasInflection: true,
		bundle: enDeterminerSchemas,
	},
	intj: {
		key: "intj",
		lemmaSubKind: "INTJ",
		hasInflection: false,
		bundle: enInterjectionSchemas,
	},
	noun: {
		key: "noun",
		lemmaSubKind: "NOUN",
		hasInflection: true,
		bundle: enNounSchemas,
	},
	num: {
		key: "num",
		lemmaSubKind: "NUM",
		hasInflection: false,
		bundle: enNumeralSchemas,
	},
	part: {
		key: "part",
		lemmaSubKind: "PART",
		hasInflection: false,
		bundle: enParticleSchemas,
	},
	pron: {
		key: "pron",
		lemmaSubKind: "PRON",
		hasInflection: true,
		bundle: enPronounSchemas,
	},
	propn: {
		key: "propn",
		lemmaSubKind: "PROPN",
		hasInflection: true,
		bundle: enProperNounSchemas,
	},
	punct: {
		key: "punct",
		lemmaSubKind: "PUNCT",
		hasInflection: false,
		bundle: enPunctuationSchemas,
	},
	sconj: {
		key: "sconj",
		lemmaSubKind: "SCONJ",
		hasInflection: false,
		bundle: enSubordinatingConjunctionSchemas,
	},
	sym: {
		key: "sym",
		lemmaSubKind: "SYM",
		hasInflection: true,
		bundle: enSymbolSchemas,
	},
	verb: {
		key: "verb",
		lemmaSubKind: "VERB",
		hasInflection: true,
		bundle: enVerbSchemas,
	},
	x: {
		key: "x",
		lemmaSubKind: "X",
		hasInflection: false,
		bundle: enOtherSchemas,
	},
} satisfies SchemaCatalogDefinition<keyof EnLexemeLemmaBySubKind>);

export const enLexemeCatalog = buildFamilySchemaCatalog(enLexemeSchemaCatalog);
