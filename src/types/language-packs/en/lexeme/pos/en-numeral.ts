import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnUninflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type { EnNumForm, EnNumType } from "../shared/en-common-enums";

type EnNumeralExtPos = Extract<AbstractFeatureValue<"extPos">, "PROPN">;
type EnNumeralNumForm = Extract<EnNumForm, "Digit" | "Roman" | "Word">;
type EnNumeralNumType = Extract<EnNumType, "Card" | "Frac">;

export type EnNumeralInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnNumeralExtPos;
	numForm?: EnNumeralNumForm;
	numType?: EnNumeralNumType;
};

export type EnNumeralBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnUninflectableLexemeBundle<"NUM", EnNumeralInherentFeatures, OS>;
