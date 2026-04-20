import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";

type EnSubordinatingConjunctionExtPos = Extract<AbstractFeatureValue<"extPos">, "ADP" | "SCONJ">;
type EnSubordinatingConjunctionStyle = Extract<import("../shared/en-common-enums").EnStyle, "Vrnc">;

export type EnSubordinatingConjunctionInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnSubordinatingConjunctionExtPos;
	style?: EnSubordinatingConjunctionStyle;
};

type EnSubordinatingConjunctionBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnUninflectableLexemeBundle<"SCONJ", EnSubordinatingConjunctionInherentFeatures, OS>;

export type EnSubordinatingConjunctionLemma = EnSubordinatingConjunctionBundle["Lemma"];
export type EnSubordinatingConjunctionLemmaSurface = EnSubordinatingConjunctionBundle["LemmaSurface"];
export type EnSubordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnSubordinatingConjunctionBundle<OS>["LemmaSelection"];

export type EnSubordinatingConjunctionTypes = EnSubordinatingConjunctionBundle;
