import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

type DeCoordinatingConjunctionType = "Comp";

export type DeCoordinatingConjunctionInherentFeatures = {
	conjType?: DeCoordinatingConjunctionType;
};

export type DeCoordinatingConjunctionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<
	"CCONJ",
	DeCoordinatingConjunctionInherentFeatures,
	OS
>;
