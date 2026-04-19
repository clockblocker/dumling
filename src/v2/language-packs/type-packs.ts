import type {
	AbstractLemma,
	AbstractLemmaSubKindFor,
	AbstractSelection,
	AbstractSurface,
} from "../types/abstract/entities";
import type {
	LemmaKind,
	OrthographicStatus,
	SupportedLanguage,
	SurfaceKind,
} from "../types/core/enums";
import type { DeLemma } from "../types/language-packs/de/de-lemma";
import type { DeSelection } from "../types/language-packs/de/de-selection";
import type { DeSurface } from "../types/language-packs/de/de-surface";
import type { LanguageTypePack } from "./contracts";

type AbstractLanguageLemma<L extends Exclude<SupportedLanguage, "de">> = {
	[LK in LemmaKind]: {
		[LSK in AbstractLemmaSubKindFor<LK>]: AbstractLemma<L, LK, LSK>;
	}[AbstractLemmaSubKindFor<LK>];
}[LemmaKind];

type AbstractLanguageSurface<L extends Exclude<SupportedLanguage, "de">> = {
	[SK in SurfaceKind]: {
		[LK in LemmaKind]: {
			[LSK in AbstractLemmaSubKindFor<LK>]: AbstractSurface<L, SK, LK, LSK>;
		}[AbstractLemmaSubKindFor<LK>];
	}[LemmaKind];
}[SurfaceKind];

type AbstractLanguageSelection<L extends Exclude<SupportedLanguage, "de">> = {
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

type StubLanguageTypePack<L extends Exclude<SupportedLanguage, "de">> =
	LanguageTypePack<L> & {
		lemma: AbstractLanguageLemma<L>;
		selection: AbstractLanguageSelection<L>;
		surface: AbstractLanguageSurface<L>;
	};

export type LanguageTypePackMap = {
	de: LanguageTypePack<"de"> & {
		lemma: DeLemma;
		selection: DeSelection;
		surface: DeSurface;
	};
	en: StubLanguageTypePack<"en">;
	he: StubLanguageTypePack<"he">;
};
