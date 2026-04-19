import type { ValueOf } from "./shared";
import type {
	EnLexemeLemma,
	EnLexemeLemmaBySubKind,
} from "./lexeme/en-lexemes";
import type {
	EnMorphemeLemmaBySubKind,
	EnMorphemeLemmaUnion,
} from "./morpheme/en-morphemes";
import type {
	EnPhrasemeLemmaBySubKind,
	EnPhrasemeLemmaUnion,
} from "./phraseme/en-phrasemes";

export type EnLemmaByKind = {
	Lexeme: EnLexemeLemmaBySubKind;
	Morpheme: EnMorphemeLemmaBySubKind;
	Phraseme: EnPhrasemeLemmaBySubKind;
};

export type EnLemma = EnLexemeLemma | EnMorphemeLemmaUnion | EnPhrasemeLemmaUnion;
export type EnLemmaKind = keyof EnLemmaByKind;
export type EnLemmaSubKind = ValueOf<{
	Lexeme: keyof EnLexemeLemmaBySubKind;
	Morpheme: keyof EnMorphemeLemmaBySubKind;
	Phraseme: keyof EnPhrasemeLemmaBySubKind;
}>;
