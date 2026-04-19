import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnMood,
	EnPerson,
	EnStyle,
	EnTense,
	EnVerbForm,
} from "../shared/en-common-enums";

type EnAuxiliaryNumber = Extract<import("../shared/en-common-enums").EnNumber, "Plur" | "Sing">;
type EnAuxiliaryStyle = Extract<EnStyle, "Arch" | "Vrnc">;
type EnAuxiliaryVerbForm = Extract<EnVerbForm, "Fin" | "Inf" | "Part">;

export type EnAuxiliaryInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	style?: EnAuxiliaryStyle;
};

export type EnAuxiliaryInflectionalFeatures = RequireAtLeastOne<{
	mood?: EnMood;
	number?: EnAuxiliaryNumber;
	person?: EnPerson;
	tense?: EnTense;
	verbForm?: EnAuxiliaryVerbForm;
}>;

type EnAuxiliaryBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"AUX",
		EnAuxiliaryInherentFeatures,
		EnAuxiliaryInflectionalFeatures,
		OS
	>;

export type EnAuxiliaryLemma = EnAuxiliaryBundle["Lemma"];
export type EnAuxiliaryLemmaSurface = EnAuxiliaryBundle["LemmaSurface"];
export type EnAuxiliaryInflectionSurface = EnAuxiliaryBundle["InflectionSurface"];
export type EnAuxiliaryLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnAuxiliaryBundle<OS>["LemmaSelection"];
export type EnAuxiliaryInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnAuxiliaryBundle<OS>["InflectionSelection"];

export type EnAuxiliaryTypes = EnAuxiliaryBundle;
