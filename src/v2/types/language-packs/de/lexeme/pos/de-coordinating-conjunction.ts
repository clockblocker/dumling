import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

type DeCoordinatingConjunctionType = "Comp";

export type DeCoordinatingConjunctionInherentFeatures = {
	conjType?: DeCoordinatingConjunctionType;
};

type DeCoordinatingConjunctionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<
	"CCONJ",
	DeCoordinatingConjunctionInherentFeatures,
	OS
>;

export type DeCoordinatingConjunctionLemma =
	DeCoordinatingConjunctionBundle["Lemma"];
export type DeCoordinatingConjunctionLemmaSurface =
	DeCoordinatingConjunctionBundle["LemmaSurface"];
export type DeCoordinatingConjunctionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeCoordinatingConjunctionBundle<OS>["LemmaSelection"];

export type DeCoordinatingConjunctionTypes = DeCoordinatingConjunctionBundle;
