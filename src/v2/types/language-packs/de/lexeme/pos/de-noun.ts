import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeCase, DeGender, DeNumber } from "../shared/de-common-enums";

export type DeNounInherentFeatures = {
	gender?: DeGender;
	hyph?: AbstractFeatureValue<"hyph">;
};

export type DeNounInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	number?: DeNumber;
}>;

type DeNounBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"NOUN",
		DeNounInherentFeatures,
		DeNounInflectionalFeatures,
		OS
	>;

export type DeNounLemma = DeNounBundle["Lemma"];
export type DeNounLemmaSurface = DeNounBundle["LemmaSurface"];
export type DeNounInflectionSurface = DeNounBundle["InflectionSurface"];
export type DeNounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeNounBundle<OS>["LemmaSelection"];
export type DeNounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeNounBundle<OS>["InflectionSelection"];

export type DeNounTypes = DeNounBundle;
