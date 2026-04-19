import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";

type EnAdpositionExtPos = Extract<AbstractFeatureValue<"extPos">, "ADP" | "ADV" | "SCONJ">;

export type EnAdpositionInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnAdpositionExtPos;
};

type EnAdpositionBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnUninflectableLexemeBundle<"ADP", EnAdpositionInherentFeatures, OS>;

export type EnAdpositionLemma = EnAdpositionBundle["Lemma"];
export type EnAdpositionLemmaSurface = EnAdpositionBundle["LemmaSurface"];
export type EnAdpositionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnAdpositionBundle<OS>["LemmaSelection"];

export type EnAdpositionTypes = EnAdpositionBundle;
