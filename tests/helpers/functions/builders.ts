import type { TargetLanguage } from "../../../src/lu/universal/enums/core/language";

export function makeLexemeSurfaceReference<lemmaSubKind extends string>(
	language: TargetLanguage,
	lemmaSubKind: lemmaSubKind,
	canonicalLemma: string,
) {
	return {
		discriminators: {
			lemmaKind: "Lexeme" as const,
			lemmaSubKind,
		},
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

export function makeMorphemeSurfaceReference<lemmaSubKind extends string>(
	language: TargetLanguage,
	lemmaSubKind: lemmaSubKind,
	canonicalLemma: string,
) {
	return {
		discriminators: {
			lemmaKind: "Morpheme" as const,
			lemmaSubKind,
		},
		lemma: {
			canonicalLemma,
			language,
			lemmaKind: "Morpheme" as const,
			meaningInEmojis: "🧩",
			morphemeKind: lemmaSubKind,
		},
	};
}

export function makePhrasemeSurfaceReference<lemmaSubKind extends string>(
	language: TargetLanguage,
	lemmaSubKind: lemmaSubKind,
	canonicalLemma: string,
) {
	return {
		discriminators: {
			lemmaKind: "Phraseme" as const,
			lemmaSubKind,
		},
		lemma: {
			canonicalLemma,
			language,
			lemmaKind: "Phraseme" as const,
			meaningInEmojis: "💬",
			phrasemeKind: lemmaSubKind,
		},
	};
}
