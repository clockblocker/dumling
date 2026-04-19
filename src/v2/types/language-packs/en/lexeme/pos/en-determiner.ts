import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnFeatureValueSet, RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnDefinite,
	EnNumForm,
	EnNumType,
	EnPronType,
	EnStyle,
} from "../shared/en-common-enums";

type EnDeterminerExtPos = Extract<AbstractFeatureValue<"extPos">, "ADV" | "PRON">;
type EnDeterminerNumForm = Extract<EnNumForm, "Word">;
type EnDeterminerNumType = Extract<EnNumType, "Frac">;
type EnDeterminerPronType = Extract<EnPronType, "Art" | "Dem" | "Ind" | "Int" | "Neg" | "Rcp" | "Rel" | "Tot">;
type EnDeterminerStyle = Extract<EnStyle, "Vrnc">;
type EnDeterminerNumber = Extract<import("../shared/en-common-enums").EnNumber, "Plur" | "Sing">;

export type EnDeterminerInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	definite?: EnDefinite;
	extPos?: EnDeterminerExtPos;
	numForm?: EnDeterminerNumForm;
	numType?: EnDeterminerNumType;
	pronType?: EnFeatureValueSet<EnDeterminerPronType>;
	style?: EnDeterminerStyle;
};

export type EnDeterminerInflectionalFeatures = RequireAtLeastOne<{
	number?: EnDeterminerNumber;
}>;

type EnDeterminerBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"DET",
		EnDeterminerInherentFeatures,
		EnDeterminerInflectionalFeatures,
		OS
	>;

export type EnDeterminerLemma = EnDeterminerBundle["Lemma"];
export type EnDeterminerLemmaSurface = EnDeterminerBundle["LemmaSurface"];
export type EnDeterminerInflectionSurface = EnDeterminerBundle["InflectionSurface"];
export type EnDeterminerLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnDeterminerBundle<OS>["LemmaSelection"];
export type EnDeterminerInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnDeterminerBundle<OS>["InflectionSelection"];

export type EnDeterminerTypes = EnDeterminerBundle;
