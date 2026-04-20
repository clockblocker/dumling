import type { OrthographicStatus } from "../../../../core/enums";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeVerbalInflectionalFeatures } from "../shared/de-verbal-inflection-features";

type DeAuxiliaryVerbType = "Mod";

export type DeAuxiliaryInherentFeatures = {
	verbType?: DeAuxiliaryVerbType;
};

export type DeAuxiliaryBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeInflectableLexemeBundle<
	"AUX",
	DeAuxiliaryInherentFeatures,
	DeVerbalInflectionalFeatures,
	OS
>;
