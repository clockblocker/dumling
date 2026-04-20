import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnPolarity,
} from "../shared/en-common-enums";

type EnInterjectionStyle = Extract<import("../shared/en-common-enums").EnStyle, "Expr">;

export type EnInterjectionInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	polarity?: EnPolarity;
	style?: EnInterjectionStyle;
};

type EnInterjectionBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnUninflectableLexemeBundle<"INTJ", EnInterjectionInherentFeatures, OS>;

export type EnInterjectionLemma = EnInterjectionBundle["Lemma"];
export type EnInterjectionLemmaSurface = EnInterjectionBundle["LemmaSurface"];
export type EnInterjectionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnInterjectionBundle<OS>["LemmaSelection"];

export type EnInterjectionTypes = EnInterjectionBundle;
