import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

type DeSubordinatingConjunctionType = "Comp";

export type DeSubordinatingConjunctionInherentFeatures = {
	conjType?: DeSubordinatingConjunctionType;
};

export type DeSubordinatingConjunctionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<
	"SCONJ",
	DeSubordinatingConjunctionInherentFeatures,
	OS
>;
