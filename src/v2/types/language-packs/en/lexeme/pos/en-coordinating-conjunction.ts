import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnPolarity,
} from "../shared/en-common-enums";

type EnCoordinatingConjunctionPolarity = Extract<EnPolarity, "Neg">;

export type EnCoordinatingConjunctionInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	polarity?: EnCoordinatingConjunctionPolarity;
};

type EnCoordinatingConjunctionBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnUninflectableLexemeBundle<"CCONJ", EnCoordinatingConjunctionInherentFeatures, OS>;

export type EnCoordinatingConjunctionLemma = EnCoordinatingConjunctionBundle["Lemma"];
export type EnCoordinatingConjunctionLemmaSurface = EnCoordinatingConjunctionBundle["LemmaSurface"];
export type EnCoordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnCoordinatingConjunctionBundle<OS>["LemmaSelection"];

export type EnCoordinatingConjunctionTypes = EnCoordinatingConjunctionBundle;
