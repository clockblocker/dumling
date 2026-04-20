import type { OrthographicStatus } from "../../core/enums";
import type {
	HeInflectionLexemeSelection,
	HeInflectionLexemeSelectionBySubKind,
	HeLemmaLexemeSelection,
	HeLemmaLexemeSelectionBySubKind,
} from "./lexeme/he-lexemes";
import type {
	HeMorphemeLemmaSelectionBySubKind,
	HeMorphemeLemmaSelectionUnion,
} from "./morpheme/he-morphemes";
import type {
	HePhrasemeLemmaSelectionBySubKind,
	HePhrasemeLemmaSelectionUnion,
} from "./phraseme/he-phrasemes";

export type HeLemmaSelectionByKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lexeme: HeLemmaLexemeSelectionBySubKind<OS>;
	Morpheme: HeMorphemeLemmaSelectionBySubKind<OS>;
	Phraseme: HePhrasemeLemmaSelectionBySubKind<OS>;
};

export type HeInflectionSelectionByKind<
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lexeme: HeInflectionLexemeSelectionBySubKind<OS>;
};

export type HeSelectionByOrthographicStatus = {
	Standard: {
		Inflection: HeInflectionSelectionByKind<"Standard">;
		Lemma: HeLemmaSelectionByKind<"Standard">;
	};
	Typo: {
		Inflection: HeInflectionSelectionByKind<"Typo">;
		Lemma: HeLemmaSelectionByKind<"Typo">;
	};
};

export type HeLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> =
	| HeLemmaLexemeSelection<OS>
	| HeMorphemeLemmaSelectionUnion<OS>
	| HePhrasemeLemmaSelectionUnion<OS>;

export type HeInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeInflectionLexemeSelection<OS>;

export type HeSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = HeLemmaSelection<OS> | HeInflectionSelection<OS>;
