import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnNumber,
	EnNumForm,
	EnNumType,
	EnStyle,
} from "../shared/en-common-enums";

type EnNounExtPos = Extract<AbstractFeatureValue<"extPos">, "ADV" | "PROPN">;
type EnNounNumForm = Extract<EnNumForm, "Combi" | "Digit" | "Word">;
type EnNounNumType = Extract<EnNumType, "Card" | "Frac" | "Ord">;
type EnNounStyle = Extract<EnStyle, "Expr" | "Vrnc">;

export type EnNounInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnNounExtPos;
	foreign?: AbstractFeatureValue<"foreign">;
	numForm?: EnNounNumForm;
	numType?: EnNounNumType;
	style?: EnNounStyle;
};

export type EnNounInflectionalFeatures = RequireAtLeastOne<{
	number?: EnNumber;
}>;

export type EnNounBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"NOUN",
		EnNounInherentFeatures,
		EnNounInflectionalFeatures,
		OS
	>;
