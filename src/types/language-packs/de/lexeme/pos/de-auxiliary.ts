import type { OrthographicStatus } from "../../../../core/enums";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeVerbalInflectionalFeatures } from "../shared/de-verbal-inflection-features";

type DeAuxiliaryVerbType = "Mod";

export type DeAuxiliaryInherentFeatures = {
	verbType?: DeAuxiliaryVerbType;
};

type DeAuxiliaryBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"AUX",
		DeAuxiliaryInherentFeatures,
		DeVerbalInflectionalFeatures,
		OS
	>;

export type DeAuxiliaryLemma = DeAuxiliaryBundle["Lemma"];
export type DeAuxiliaryLemmaSurface = DeAuxiliaryBundle["LemmaSurface"];
export type DeAuxiliaryInflectionSurface =
	DeAuxiliaryBundle["InflectionSurface"];
export type DeAuxiliaryLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeAuxiliaryBundle<OS>["LemmaSelection"];
export type DeAuxiliaryInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeAuxiliaryBundle<OS>["InflectionSelection"];

export type DeAuxiliaryTypes = DeAuxiliaryBundle;
