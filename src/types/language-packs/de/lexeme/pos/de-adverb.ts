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

export type DeAdverbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"ADV",
		DeAdverbInherentFeatures,
		DeAdverbInflectionalFeatures,
		OS
	>;
