import type { TargetLanguage } from "../../../src/lu/universal/enums/core/language";

export function makeLexemeSurfaceReference<
	L extends TargetLanguage,
	lemmaSubKind extends string,
>(
	language: L,
	lemmaSubKind: lemmaSubKind,
	canonicalLemma: string,
) {
	return {
		lemma: {
			canonicalLemma,
			inherentFeatures: {},
			language,
			lemmaKind: "Lexeme" as const,
			meaningInEmojis: "📝",
			pos: lemmaSubKind,
		},
	};
}

export function makeMorphemeSurfaceReference<
	L extends TargetLanguage,
	lemmaSubKind extends string,
>(
	language: L,
	lemmaSubKind: lemmaSubKind,
	canonicalLemma: string,
) {
	return {
		lemma: {
			canonicalLemma,
			language,
			lemmaKind: "Morpheme" as const,
			meaningInEmojis: "🧩",
			morphemeKind: lemmaSubKind,
		},
	};
}

export function makePhrasemeSurfaceReference<
	L extends TargetLanguage,
	lemmaSubKind extends string,
>(
	language: L,
	lemmaSubKind: lemmaSubKind,
	canonicalLemma: string,
) {
	return {
		lemma: {
			canonicalLemma,
			language,
			lemmaKind: "Phraseme" as const,
			meaningInEmojis: "💬",
			phrasemeKind: lemmaSubKind,
		},
	};
}
