import type { DeprecatedLanguageOperationPack } from "../../internal/operations/operation-pack-registry";

export const deprecatedGermanOperationPack: DeprecatedLanguageOperationPack<"German"> = {
	normalizeLemmaSurface: (lemma) => lemma.canonicalLemma,
};
