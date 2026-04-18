import type { DeprecatedLemmaKind } from "./enums/core/selection";
import type { DeprecatedMorphemeKind } from "./enums/kind/morpheme-kind";
import type { DeprecatedPhrasemeKind } from "./enums/kind/phraseme-kind";
import type { DeprecatedPos } from "./enums/kind/pos";

export type DeprecatedLemmaDiscriminatorFor<LK extends DeprecatedLemmaKind> = LK extends "Lexeme"
	? DeprecatedPos
	: LK extends "Morpheme"
		? DeprecatedMorphemeKind
		: LK extends "Phraseme"
			? DeprecatedPhrasemeKind
			: never;
