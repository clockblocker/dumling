import type { DeprecatedPrettify } from "../../types/helpers";
import type { DeprecatedTargetLanguage } from "./enums/core/language";
import type { DeprecatedIsClosedSet } from "./enums/core/meta";
import type { DeprecatedLemmaKind } from "./enums/core/selection";
import type { DeprecatedAbstractFeatures, DeprecatedUniversalFeatureValue } from "./enums/feature";
import type { DeprecatedMorphemeKind } from "./enums/kind/morpheme-kind";
import type {
	DeprecatedPHRASEME_KIND_KEY,
	DeprecatedPhrasemeKind,
} from "./enums/kind/phraseme-kind";
import type { DeprecatedPos } from "./enums/kind/pos";
import type { DeprecatedLemmaDiscriminatorFor } from "./lemma-discriminator";

export type DeprecatedAbstractLemma<
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = LK extends "Lexeme"
	? AbstractLexemeLemma<Extract<D, DeprecatedPos>>
	: LK extends "Morpheme"
		? AbstractMorphemLemma<Extract<D, DeprecatedMorphemeKind>>
		: LK extends "Phraseme"
			? AbstractPhrasemLemma<Extract<D, DeprecatedPhrasemeKind>>
			: never;

type AbstractLexemeLemma<P extends DeprecatedPos = DeprecatedPos> = DeprecatedPrettify<{
	meaningInEmojis: string;
	lemmaKind: "Lexeme";
	language: DeprecatedTargetLanguage;
	pos: P;
	inherentFeatures: Partial<DeprecatedAbstractFeatures>;
	isClosedSet?: DeprecatedIsClosedSet;
	canonicalLemma: string;
}>;

type AbstractMorphemLemma<MK extends DeprecatedMorphemeKind = DeprecatedMorphemeKind> = DeprecatedPrettify<{
	meaningInEmojis: string;
	lemmaKind: "Morpheme";
	language: DeprecatedTargetLanguage;
	morphemeKind: MK;
	isClosedSet?: DeprecatedIsClosedSet;
	hasSepPrefix?: DeprecatedUniversalFeatureValue<"HasSepPrefix">;
	canonicalLemma: string;
}>;

type AbstractPhrasemLemma<PK extends DeprecatedPhrasemeKind = DeprecatedPhrasemeKind> = DeprecatedPrettify<
	{
		meaningInEmojis: string;
		lemmaKind: "Phraseme";
		language: DeprecatedTargetLanguage;
		[DeprecatedPHRASEME_KIND_KEY]: PK;
		canonicalLemma: string;
	} & (
		| {
				[DeprecatedPHRASEME_KIND_KEY]:
					| Extract<PK, typeof DeprecatedPhrasemeKind.enum.Aphorism>
					| Extract<PK, typeof DeprecatedPhrasemeKind.enum.Idiom>
					| Extract<PK, typeof DeprecatedPhrasemeKind.enum.Proverb>;
		  }
		| {
				[DeprecatedPHRASEME_KIND_KEY]: Extract<
					PK,
					typeof DeprecatedPhrasemeKind.enum.DiscourseFormula
				>;
				discourseFormulaRole?: DeprecatedUniversalFeatureValue<"DiscourseFormulaRole">;
		  }
	)
>;
