import type { DeprecatedLanguageOperationPack } from "../../internal/operations/operation-pack-registry";

export const deprecatedHebrewOperationPack: DeprecatedLanguageOperationPack<"Hebrew"> = {
	normalizeLemmaSurface: (lemma) => lemma.canonicalLemma,
};
