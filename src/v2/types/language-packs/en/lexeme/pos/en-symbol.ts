import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";

type EnSymbolExtPos = Extract<AbstractFeatureValue<"extPos">, "ADP" | "PROPN">;
type EnSymbolNumber = Extract<import("../shared/en-common-enums").EnNumber, "Plur" | "Sing">;

export type EnSymbolInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnSymbolExtPos;
};

export type EnSymbolInflectionalFeatures = RequireAtLeastOne<{
	number?: EnSymbolNumber;
}>;

type EnSymbolBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"SYM",
		EnSymbolInherentFeatures,
		EnSymbolInflectionalFeatures,
		OS
	>;

export type EnSymbolLemma = EnSymbolBundle["Lemma"];
export type EnSymbolLemmaSurface = EnSymbolBundle["LemmaSurface"];
export type EnSymbolInflectionSurface = EnSymbolBundle["InflectionSurface"];
export type EnSymbolLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnSymbolBundle<OS>["LemmaSelection"];
export type EnSymbolInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnSymbolBundle<OS>["InflectionSelection"];

export type EnSymbolTypes = EnSymbolBundle;
