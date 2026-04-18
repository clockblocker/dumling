import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeCase, DeGender, DeNumber } from "../shared/de-common-enums";

export type DeProperNounInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	foreign?: AbstractFeatureValue<"foreign">;
	gender?: DeGender;
};

export type DeProperNounInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	number?: DeNumber;
}>;

type DeProperNounBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"PROPN",
		DeProperNounInherentFeatures,
		DeProperNounInflectionalFeatures,
		OS
	>;

export type DeProperNounLemma = DeProperNounBundle["Lemma"];
export type DeProperNounLemmaSurface = DeProperNounBundle["LemmaSurface"];
export type DeProperNounInflectionSurface =
	DeProperNounBundle["InflectionSurface"];
export type DeProperNounLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeProperNounBundle<OS>["LemmaSelection"];
export type DeProperNounInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeProperNounBundle<OS>["InflectionSelection"];

export type DeProperNounTypes = DeProperNounBundle;
