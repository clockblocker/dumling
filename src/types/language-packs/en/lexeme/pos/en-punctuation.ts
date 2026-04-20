import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";

export type EnPunctuationInherentFeatures = {
};

type EnPunctuationBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnUninflectableLexemeBundle<"PUNCT", EnPunctuationInherentFeatures, OS>;

export type EnPunctuationLemma = EnPunctuationBundle["Lemma"];
export type EnPunctuationLemmaSurface = EnPunctuationBundle["LemmaSurface"];
export type EnPunctuationLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnPunctuationBundle<OS>["LemmaSelection"];

export type EnPunctuationTypes = EnPunctuationBundle;
