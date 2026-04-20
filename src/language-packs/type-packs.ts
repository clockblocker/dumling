import type {
	AbstractLemma,
	AbstractLemmaSubKindFor,
	AbstractSelection,
	AbstractSurface,
} from "../types/abstract/entities";
import type {
	AbstractLanguageTag,
	LemmaKind,
	OrthographicStatus,
	SupportedLanguage,
	SurfaceKind,
} from "../types/core/enums";
import type { EnLemma } from "../types/concrete-language/language-packs/en/en-lemma";
import type { EnSelection } from "../types/concrete-language/language-packs/en/en-selection";
import type { EnSurface } from "../types/concrete-language/language-packs/en/en-surface";
import type { DeLemma } from "../types/concrete-language/language-packs/de/de-lemma";
import type { DeSelection } from "../types/concrete-language/language-packs/de/de-selection";
import type { DeSurface } from "../types/concrete-language/language-packs/de/de-surface";
import type { HeLemma } from "../types/concrete-language/language-packs/he/he-lemma";
import type { HeSelection } from "../types/concrete-language/language-packs/he/he-selection";
import type { HeSurface } from "../types/concrete-language/language-packs/he/he-surface";
import type { LanguageTypePack } from "./contracts";

export type AbstractLanguageLemmaUnion<L extends AbstractLanguageTag> = {
	[LK in LemmaKind]: {
		[LSK in AbstractLemmaSubKindFor<LK>]: AbstractLemma<L, LK, LSK>;
	}[AbstractLemmaSubKindFor<LK>];
}[LemmaKind];

export type AbstractLanguageSurfaceUnion<L extends AbstractLanguageTag> = {
	[SK in SurfaceKind]: {
		[LK in LemmaKind]: {
			[LSK in AbstractLemmaSubKindFor<LK>]: AbstractSurface<L, SK, LK, LSK>;
		}[AbstractLemmaSubKindFor<LK>];
	}[LemmaKind];
}[SurfaceKind];

export type AbstractLanguageSelectionUnion<L extends AbstractLanguageTag> = {
	[OS in OrthographicStatus]: {
		[SK in SurfaceKind]: {
			[LK in LemmaKind]: {
				[LSK in AbstractLemmaSubKindFor<LK>]: AbstractSelection<
					L,
					OS,
					SK,
					LK,
					LSK
				>;
			}[AbstractLemmaSubKindFor<LK>];
		}[LemmaKind];
	}[SurfaceKind];
}[OrthographicStatus];

export type StubLanguageTypePack<
	L extends Exclude<SupportedLanguage, "de" | "en">,
> =
	LanguageTypePack<L> & {
		lemma: AbstractLanguageLemmaUnion<L>;
		selection: AbstractLanguageSelectionUnion<L>;
		surface: AbstractLanguageSurfaceUnion<L>;
	};

export type LanguageTypePackMap = {
	de: LanguageTypePack<"de"> & {
		lemma: DeLemma;
		selection: DeSelection;
		surface: DeSurface;
	};
	en: LanguageTypePack<"en"> & {
		lemma: EnLemma;
		selection: EnSelection;
		surface: EnSurface;
	};
	he: LanguageTypePack<"he"> & {
		lemma: HeLemma;
		selection: HeSelection;
		surface: HeSurface;
	};
};
