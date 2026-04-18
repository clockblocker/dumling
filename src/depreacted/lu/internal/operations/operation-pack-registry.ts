import { deprecatedEnglishOperationPack } from "../../language-packs/english/english-operations";
import { deprecatedGermanOperationPack } from "../../language-packs/german/german-operations";
import { deprecatedHebrewOperationPack } from "../../language-packs/hebrew/hebrew-operations";
import type { DeprecatedTargetLanguage } from "../../universal/enums/core/language";
import type { DeprecatedLemmaLike, DeprecatedSurfaceLike } from "./shared";

export type DeprecatedLanguageOperationPack<L extends DeprecatedTargetLanguage> = {
	normalizeLemmaSurface: (lemma: DeprecatedLemmaLike<L>) => string;
	defaultSpelledSelectionFromSurface?: (surface: DeprecatedSurfaceLike<L>) => string;
	getDefaultInflectionFeatures?: (
		lemma: DeprecatedLemmaLike<L>,
	) => Record<string, unknown>;
};

const operationPackByLanguage = {
	English: deprecatedEnglishOperationPack,
	German: deprecatedGermanOperationPack,
	Hebrew: deprecatedHebrewOperationPack,
} satisfies {
	[L in DeprecatedTargetLanguage]: DeprecatedLanguageOperationPack<L>;
};

export function deprecatedGetOperationPack<L extends DeprecatedTargetLanguage>(
	language: L,
): DeprecatedLanguageOperationPack<L> {
	return operationPackByLanguage[
		language
	] as unknown as DeprecatedLanguageOperationPack<L>;
}
