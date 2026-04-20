import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

type DeSubordinatingConjunctionType = "Comp";

export type DeSubordinatingConjunctionInherentFeatures = {
	conjType?: DeSubordinatingConjunctionType;
};

type DeSubordinatingConjunctionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<
	"SCONJ",
	DeSubordinatingConjunctionInherentFeatures,
	OS
>;

export type DeSubordinatingConjunctionLemma =
	DeSubordinatingConjunctionBundle["Lemma"];
export type DeSubordinatingConjunctionLemmaSurface =
	DeSubordinatingConjunctionBundle["LemmaSurface"];
export type DeSubordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeSubordinatingConjunctionBundle<OS>["LemmaSelection"];

export type DeSubordinatingConjunctionTypes = DeSubordinatingConjunctionBundle;
