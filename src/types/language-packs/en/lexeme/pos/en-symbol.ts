import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";

type EnSymbolExtPos = Extract<AbstractFeatureValue<"extPos">, "ADP" | "PROPN">;
type EnSymbolNumber = Extract<
	import("../shared/en-common-enums").EnNumber,
	"Plur" | "Sing"
>;

export type EnSymbolInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnSymbolExtPos;
};

export type EnSymbolInflectionalFeatures = RequireAtLeastOne<{
	number?: EnSymbolNumber;
}>;

export type EnSymbolBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"SYM",
		EnSymbolInherentFeatures,
		EnSymbolInflectionalFeatures,
		OS
	>;
