import type { DeLexemeLemmaBySubKind } from "../../../../types/concrete-language/language-packs/de/lexeme/de-lexemes";
import {
	buildFamilySchemaCatalog,
	defineSchemaCatalog,
	type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import { deAdjectiveSchemas } from "./pos/de-adjective";
import { deAdpositionSchemas } from "./pos/de-adposition";
import { deAdverbSchemas } from "./pos/de-adverb";
import { deAuxiliarySchemas } from "./pos/de-auxiliary";
import { deCoordinatingConjunctionSchemas } from "./pos/de-coordinating-conjunction";
import { deDeterminerSchemas } from "./pos/de-determiner";
import { deInterjectionSchemas } from "./pos/de-interjection";
import { deNounSchemas } from "./pos/de-noun";
import { deNumeralSchemas } from "./pos/de-numeral";
import { deOtherSchemas } from "./pos/de-other";
import { deParticleSchemas } from "./pos/de-particle";
import { dePronounSchemas } from "./pos/de-pronoun";
import { deProperNounSchemas } from "./pos/de-proper-noun";
import { dePunctuationSchemas } from "./pos/de-punctuation";
import { deSubordinatingConjunctionSchemas } from "./pos/de-subordinating-conjunction";
import { deSymbolSchemas } from "./pos/de-symbol";
import { deVerbSchemas } from "./pos/de-verb";

export const deLexemeSchemaCatalog = defineSchemaCatalog({
	adj: {
		key: "adj",
		lemmaSubKind: "ADJ",
		hasInflection: true,
		bundle: deAdjectiveSchemas,
	},
	adp: {
		key: "adp",
		lemmaSubKind: "ADP",
		hasInflection: false,
		bundle: deAdpositionSchemas,
	},
	adv: {
		key: "adv",
		lemmaSubKind: "ADV",
		hasInflection: true,
		bundle: deAdverbSchemas,
	},
	aux: {
		key: "aux",
		lemmaSubKind: "AUX",
		hasInflection: true,
		bundle: deAuxiliarySchemas,
	},
	cconj: {
		key: "cconj",
		lemmaSubKind: "CCONJ",
		hasInflection: false,
		bundle: deCoordinatingConjunctionSchemas,
	},
	det: {
		key: "det",
		lemmaSubKind: "DET",
		hasInflection: true,
		bundle: deDeterminerSchemas,
	},
	intj: {
		key: "intj",
		lemmaSubKind: "INTJ",
		hasInflection: false,
		bundle: deInterjectionSchemas,
	},
	noun: {
		key: "noun",
		lemmaSubKind: "NOUN",
		hasInflection: true,
		bundle: deNounSchemas,
	},
	num: {
		key: "num",
		lemmaSubKind: "NUM",
		hasInflection: true,
		bundle: deNumeralSchemas,
	},
	part: {
		key: "part",
		lemmaSubKind: "PART",
		hasInflection: false,
		bundle: deParticleSchemas,
	},
	pron: {
		key: "pron",
		lemmaSubKind: "PRON",
		hasInflection: true,
		bundle: dePronounSchemas,
	},
	propn: {
		key: "propn",
		lemmaSubKind: "PROPN",
		hasInflection: true,
		bundle: deProperNounSchemas,
	},
	punct: {
		key: "punct",
		lemmaSubKind: "PUNCT",
		hasInflection: false,
		bundle: dePunctuationSchemas,
	},
	sconj: {
		key: "sconj",
		lemmaSubKind: "SCONJ",
		hasInflection: false,
		bundle: deSubordinatingConjunctionSchemas,
	},
	sym: {
		key: "sym",
		lemmaSubKind: "SYM",
		hasInflection: true,
		bundle: deSymbolSchemas,
	},
	verb: {
		key: "verb",
		lemmaSubKind: "VERB",
		hasInflection: true,
		bundle: deVerbSchemas,
	},
	x: {
		key: "x",
		lemmaSubKind: "X",
		hasInflection: true,
		bundle: deOtherSchemas,
	},
} satisfies SchemaCatalogDefinition<keyof DeLexemeLemmaBySubKind>);

export const deLexemeCatalog = buildFamilySchemaCatalog(deLexemeSchemaCatalog);
