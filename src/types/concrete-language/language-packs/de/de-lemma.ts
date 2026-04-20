import type { ValueOf } from "../../shared";
import type {
	DeLexemeLemma,
	DeLexemeLemmaBySubKind,
} from "./lexeme/de-lexemes";
import type {
	DeMorphemeLemmaBySubKind,
	DeMorphemeLemmaUnion,
} from "./morpheme/de-morphemes";
import type {
	DePhrasemeLemmaBySubKind,
	DePhrasemeLemmaUnion,
} from "./phraseme/de-phrasemes";

export type DeLemmaByKind = {
	Lexeme: DeLexemeLemmaBySubKind;
	Morpheme: DeMorphemeLemmaBySubKind;
	Phraseme: DePhrasemeLemmaBySubKind;
};

export type DeLemma = DeLexemeLemma | DeMorphemeLemmaUnion | DePhrasemeLemmaUnion;
export type DeLemmaKind = keyof DeLemmaByKind;
export type DeLemmaSubKind = ValueOf<{
	Lexeme: keyof DeLexemeLemmaBySubKind;
	Morpheme: keyof DeMorphemeLemmaBySubKind;
	Phraseme: keyof DePhrasemeLemmaBySubKind;
}>;
