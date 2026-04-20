import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeDegree } from "../shared/de-common-enums";

type DeAdverbNumType = Extract<
	AbstractFeatureValue<"numType">,
	"Card" | "Mult"
>;
type DeAdverbPronType = Extract<
	AbstractFeatureValue<"pronType">,
	"Dem" | "Ind" | "Int" | "Neg" | "Rel"
>;

export type DeAdverbInherentFeatures = {
	foreign?: AbstractFeatureValue<"foreign">;
	numType?: DeAdverbNumType;
	pronType?: DeAdverbPronType;
};

export type DeAdverbInflectionalFeatures = RequireAtLeastOne<{
	degree?: DeDegree;
}>;

type DeAdverbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"ADV",
		DeAdverbInherentFeatures,
		DeAdverbInflectionalFeatures,
		OS
	>;

export type DeAdverbLemma = DeAdverbBundle["Lemma"];
export type DeAdverbLemmaSurface = DeAdverbBundle["LemmaSurface"];
export type DeAdverbInflectionSurface = DeAdverbBundle["InflectionSurface"];
export type DeAdverbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeAdverbBundle<OS>["LemmaSelection"];
export type DeAdverbInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeAdverbBundle<OS>["InflectionSelection"];

export type DeAdverbTypes = DeAdverbBundle;
