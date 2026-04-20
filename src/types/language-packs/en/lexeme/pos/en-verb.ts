import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type { EnVerbalInflectionalFeatures } from "../shared/en-verbal-inflection-features";
import type { EnStyle } from "../shared/en-common-enums";

type EnVerbExtPos = Extract<
	AbstractFeatureValue<"extPos">,
	"ADP" | "CCONJ" | "PROPN"
>;
type EnVerbStyle = Extract<EnStyle, "Expr" | "Vrnc">;

export type EnVerbInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnVerbExtPos;
	hasGovPrep?: AbstractFeatureValue<"hasGovPrep">;
	phrasal?: AbstractFeatureValue<"phrasal">;
	style?: EnVerbStyle;
};

export type EnVerbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"VERB",
		EnVerbInherentFeatures,
		EnVerbalInflectionalFeatures,
		OS
	>;
