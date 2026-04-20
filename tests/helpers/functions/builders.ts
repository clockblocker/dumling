import type {
	InherentFeaturesFor,
	Lemma,
	LemmaKind,
	LemmaSubKindFor,
	SupportedLanguage,
} from "../../../src/types";

type BuilderOptions<
	L extends SupportedLanguage,
	LK extends LemmaKind,
	LSK extends LemmaSubKindFor<L, LK>,
> = {
	inherentFeatures?: InherentFeaturesFor<L, LK, LSK>;
	meaningInEmojis?: string;
};

function makeLemma<
	L extends SupportedLanguage,
	LK extends LemmaKind,
	LSK extends LemmaSubKindFor<L, LK>,
>(
	language: L,
	lemmaKind: LK,
	lemmaSubKind: LSK,
	canonicalLemma: string,
	options: BuilderOptions<L, LK, LSK> = {},
): Lemma<L, LK, LSK> {
	return {
		language,
		canonicalLemma,
		lemmaKind,
		lemmaSubKind,
		inherentFeatures: (options.inherentFeatures ?? {}) as InherentFeaturesFor<
			L,
			LK,
			LSK
		>,
		meaningInEmojis: options.meaningInEmojis ?? "🔤",
	} as Lemma<L, LK, LSK>;
}

export function makeLexemeSurfaceReference<
	L extends SupportedLanguage,
	LSK extends LemmaSubKindFor<L, "Lexeme">,
>(
	language: L,
	lemmaSubKind: LSK,
	canonicalLemma: string,
	options: BuilderOptions<L, "Lexeme", LSK> = {},
) {
	return {
		lemma: makeLemma(language, "Lexeme", lemmaSubKind, canonicalLemma, options),
	};
}

export function makeMorphemeSurfaceReference<
	L extends SupportedLanguage,
	LSK extends LemmaSubKindFor<L, "Morpheme">,
>(
	language: L,
	lemmaSubKind: LSK,
	canonicalLemma: string,
	options: BuilderOptions<L, "Morpheme", LSK> = {},
) {
	return {
		lemma: makeLemma(language, "Morpheme", lemmaSubKind, canonicalLemma, options),
	};
}

export function makePhrasemeSurfaceReference<
	L extends SupportedLanguage,
	LSK extends LemmaSubKindFor<L, "Phraseme">,
>(
	language: L,
	lemmaSubKind: LSK,
	canonicalLemma: string,
	options: BuilderOptions<L, "Phraseme", LSK> = {},
) {
	return {
		lemma: makeLemma(language, "Phraseme", lemmaSubKind, canonicalLemma, options),
	};
}
