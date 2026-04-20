import type { OrthographicStatus } from "../../../core/enums";
import type {
	EnInflectionLexemeSelection,
	EnInflectionLexemeSelectionBySubKind,
	EnLemmaLexemeSelection,
	EnLemmaLexemeSelectionBySubKind,
} from "./lexeme/en-lexemes";
import type {
	EnMorphemeLemmaSelectionBySubKind,
	EnMorphemeLemmaSelectionUnion,
} from "./morpheme/en-morphemes";
import type {
	EnPhrasemeLemmaSelectionBySubKind,
	EnPhrasemeLemmaSelectionUnion,
} from "./phraseme/en-phrasemes";

export type EnLemmaSelectionByKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lexeme: EnLemmaLexemeSelectionBySubKind<OS>;
	Morpheme: EnMorphemeLemmaSelectionBySubKind<OS>;
	Phraseme: EnPhrasemeLemmaSelectionBySubKind<OS>;
};

export type EnInflectionSelectionByKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lexeme: EnInflectionLexemeSelectionBySubKind<OS>;
};

export type EnSelectionByOrthographicStatus = {
	Standard: {
		Inflection: EnInflectionSelectionByKind<"Standard">;
		Lemma: EnLemmaSelectionByKind<"Standard">;
	};
	Typo: {
		Inflection: EnInflectionSelectionByKind<"Typo">;
		Lemma: EnLemmaSelectionByKind<"Typo">;
	};
};

export type EnLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> =
	| EnLemmaLexemeSelection<OS>
	| EnMorphemeLemmaSelectionUnion<OS>
	| EnPhrasemeLemmaSelectionUnion<OS>;

export type EnInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnInflectionLexemeSelection<OS>;

export type EnSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnLemmaSelection<OS> | EnInflectionSelection<OS>;
