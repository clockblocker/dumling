import type { OrthographicStatus } from "../../../core/enums";
import type {
	DeInflectionLexemeSelection,
	DeInflectionLexemeSelectionBySubKind,
	DeLemmaLexemeSelection,
	DeLemmaLexemeSelectionBySubKind,
} from "./lexeme/de-lexemes";
import type {
	DeMorphemeLemmaSelectionBySubKind,
	DeMorphemeLemmaSelectionUnion,
} from "./morpheme/de-morphemes";
import type {
	DePhrasemeLemmaSelectionBySubKind,
	DePhrasemeLemmaSelectionUnion,
} from "./phraseme/de-phrasemes";

export type DeLemmaSelectionByKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lexeme: DeLemmaLexemeSelectionBySubKind<OS>;
	Morpheme: DeMorphemeLemmaSelectionBySubKind<OS>;
	Phraseme: DePhrasemeLemmaSelectionBySubKind<OS>;
};

export type DeInflectionSelectionByKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lexeme: DeInflectionLexemeSelectionBySubKind<OS>;
};

export type DeSelectionByOrthographicStatus = {
	Standard: {
		Inflection: DeInflectionSelectionByKind<"Standard">;
		Lemma: DeLemmaSelectionByKind<"Standard">;
	};
	Typo: {
		Inflection: DeInflectionSelectionByKind<"Typo">;
		Lemma: DeLemmaSelectionByKind<"Typo">;
	};
};

export type DeLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> =
	| DeLemmaLexemeSelection<OS>
	| DeMorphemeLemmaSelectionUnion<OS>
	| DePhrasemeLemmaSelectionUnion<OS>;

export type DeInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeInflectionLexemeSelection<OS>;

export type DeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLemmaSelection<OS> | DeInflectionSelection<OS>;
