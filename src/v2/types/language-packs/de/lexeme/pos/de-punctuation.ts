import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

export type DePunctuationInherentFeatures = {
	punctType?: AbstractFeatureValue<"punctType">;
};

type DePunctuationBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeUninflectableLexemeBundle<"PUNCT", DePunctuationInherentFeatures, OS>;

export type DePunctuationLemma = DePunctuationBundle["Lemma"];
export type DePunctuationLemmaSurface = DePunctuationBundle["LemmaSurface"];
export type DePunctuationLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DePunctuationBundle<OS>["LemmaSelection"];

export type DePunctuationTypes = DePunctuationBundle;
