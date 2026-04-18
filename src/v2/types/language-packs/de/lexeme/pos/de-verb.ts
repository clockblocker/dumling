import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type { DeVerbalInflectionalFeatures } from "../shared/de-verbal-inflection-features";

type DeVerbVerbType = "Mod";

export type DeVerbInherentFeatures = {
	hasGovPrep?: AbstractFeatureValue<"hasGovPrep">;
	hasSepPrefix?: AbstractFeatureValue<"hasSepPrefix">;
	lexicallyReflexive?: AbstractFeatureValue<"lexicallyReflexive">;
	verbType?: DeVerbVerbType;
};

type DeVerbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeInflectableLexemeBundle<
		"VERB",
		DeVerbInherentFeatures,
		DeVerbalInflectionalFeatures,
		OS
	>;

export type DeVerbLemma = DeVerbBundle["Lemma"];
export type DeVerbLemmaSurface = DeVerbBundle["LemmaSurface"];
export type DeVerbInflectionSurface = DeVerbBundle["InflectionSurface"];
export type DeVerbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeVerbBundle<OS>["LemmaSelection"];
export type DeVerbInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeVerbBundle<OS>["InflectionSelection"];

export type DeVerbTypes = DeVerbBundle;
