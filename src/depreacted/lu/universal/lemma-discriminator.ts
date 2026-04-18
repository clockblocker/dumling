import type { LemmaKind } from "./enums/core/selection";
import type { MorphemeKind } from "./enums/kind/morpheme-kind";
import type { PhrasemeKind } from "./enums/kind/phraseme-kind";
import type { Pos } from "./enums/kind/pos";

export type LemmaDiscriminatorFor<LK extends LemmaKind> = LK extends "Lexeme"
	? Pos
	: LK extends "Morpheme"
		? MorphemeKind
		: LK extends "Phraseme"
			? PhrasemeKind
			: never;
