import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type { EnVerbalInflectionalFeatures } from "../shared/en-verbal-inflection-features";
import type {
	EnStyle,
} from "../shared/en-common-enums";

type EnVerbExtPos = Extract<AbstractFeatureValue<"extPos">, "ADP" | "CCONJ" | "PROPN">;
type EnVerbStyle = Extract<EnStyle, "Expr" | "Vrnc">;

export type EnVerbInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnVerbExtPos;
	hasGovPrep?: AbstractFeatureValue<"hasGovPrep">;
	phrasal?: AbstractFeatureValue<"phrasal">;
	style?: EnVerbStyle;
};

type EnVerbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"VERB",
		EnVerbInherentFeatures,
		EnVerbalInflectionalFeatures,
		OS
	>;

export type EnVerbLemma = EnVerbBundle["Lemma"];
export type EnVerbLemmaSurface = EnVerbBundle["LemmaSurface"];
export type EnVerbInflectionSurface = EnVerbBundle["InflectionSurface"];
export type EnVerbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnVerbBundle<OS>["LemmaSelection"];
export type EnVerbInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnVerbBundle<OS>["InflectionSelection"];

export type EnVerbTypes = EnVerbBundle;
