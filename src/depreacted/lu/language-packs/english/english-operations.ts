import type { DeprecatedLanguageOperationPack } from "../../internal/operations/operation-pack-registry";

export const deprecatedEnglishOperationPack: DeprecatedLanguageOperationPack<"English"> = {
	normalizeLemmaSurface: (lemma) => lemma.canonicalLemma,
};
