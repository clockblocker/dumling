import type { ValueOf } from "../shared";
import type {
	HeLexemeLemma,
	HeLexemeLemmaBySubKind,
} from "./lexeme/he-lexemes";
import type {
	HeMorphemeLemmaBySubKind,
	HeMorphemeLemmaUnion,
} from "./morpheme/he-morphemes";
import type {
	HePhrasemeLemmaBySubKind,
	HePhrasemeLemmaUnion,
} from "./phraseme/he-phrasemes";

export type HeLemmaByKind = {
	Lexeme: HeLexemeLemmaBySubKind;
	Morpheme: HeMorphemeLemmaBySubKind;
	Phraseme: HePhrasemeLemmaBySubKind;
};

export type HeLemma = HeLexemeLemma | HeMorphemeLemmaUnion | HePhrasemeLemmaUnion;
export type HeLemmaKind = keyof HeLemmaByKind;
export type HeLemmaSubKind = ValueOf<{
	Lexeme: keyof HeLexemeLemmaBySubKind;
	Morpheme: keyof HeMorphemeLemmaBySubKind;
	Phraseme: keyof HePhrasemeLemmaBySubKind;
}>;
