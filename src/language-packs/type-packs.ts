import type {
	AbstractLemma,
	AbstractLemmaSubKindFor,
	AbstractSelection,
	AbstractSurface,
} from "../types/abstract/entities";
import type {
	LanguageLemmaUnionMap,
	LanguageSelectionUnionMap,
	LanguageSurfaceUnionMap,
} from "../types/concrete-language/concrete-language-types";
import type { ConcreteLanguage } from "../types/concrete-language/features/feature-registry";
import type {
	AbstractLanguageTag,
	LemmaKind,
	OrthographicStatus,
	SupportedLanguage,
	SurfaceKind,
} from "../types/core/enums";
import type { LanguageTypePack } from "./contracts";

type AbstractLanguageLemmaUnion<L extends AbstractLanguageTag> = {
	[LK in LemmaKind]: {
		[LSK in AbstractLemmaSubKindFor<LK>]: AbstractLemma<L, LK, LSK>;
	}[AbstractLemmaSubKindFor<LK>];
}[LemmaKind];

type AbstractLanguageSurfaceUnion<L extends AbstractLanguageTag> = {
	[SK in SurfaceKind]: {
		[LK in LemmaKind]: {
			[LSK in AbstractLemmaSubKindFor<LK>]: AbstractSurface<
				L,
				SK,
				LK,
				LSK
			>;
		}[AbstractLemmaSubKindFor<LK>];
	}[LemmaKind];
}[SurfaceKind];

type AbstractLanguageSelectionUnion<L extends AbstractLanguageTag> = {
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

type StubLanguageTypePack<L extends Exclude<SupportedLanguage, "de" | "en">> =
	LanguageTypePack<L> & {
		lemma: AbstractLanguageLemmaUnion<L>;
		selection: AbstractLanguageSelectionUnion<L>;
		surface: AbstractLanguageSurfaceUnion<L>;
	};

type ConcreteLanguageTypePack<L extends ConcreteLanguage> =
	LanguageTypePack<L> & {
		lemma: LanguageLemmaUnionMap[L];
		selection: LanguageSelectionUnionMap[L];
		surface: LanguageSurfaceUnionMap[L];
	};

export type LanguageTypePackMap = {
	[L in ConcreteLanguage]: ConcreteLanguageTypePack<L>;
};
