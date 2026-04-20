import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnDegree,
	EnNumForm,
	EnNumType,
	EnStyle,
} from "../shared/en-common-enums";

type EnAdjectiveExtPos = Extract<AbstractFeatureValue<"extPos">, "ADP" | "ADV" | "SCONJ">;
type EnAdjectiveNumForm = Extract<EnNumForm, "Combi" | "Word">;
type EnAdjectiveNumType = Extract<EnNumType, "Frac" | "Ord">;
type EnAdjectiveStyle = Extract<EnStyle, "Expr">;

export type EnAdjectiveInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnAdjectiveExtPos;
	numForm?: EnAdjectiveNumForm;
	numType?: EnAdjectiveNumType;
	style?: EnAdjectiveStyle;
};

export type EnAdjectiveInflectionalFeatures = RequireAtLeastOne<{
	degree?: EnDegree;
}>;

type EnAdjectiveBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"ADJ",
		EnAdjectiveInherentFeatures,
		EnAdjectiveInflectionalFeatures,
		OS
	>;

export type EnAdjectiveLemma = EnAdjectiveBundle["Lemma"];
export type EnAdjectiveLemmaSurface = EnAdjectiveBundle["LemmaSurface"];
export type EnAdjectiveInflectionSurface = EnAdjectiveBundle["InflectionSurface"];
export type EnAdjectiveLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnAdjectiveBundle<OS>["LemmaSelection"];
export type EnAdjectiveInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnAdjectiveBundle<OS>["InflectionSelection"];

export type EnAdjectiveTypes = EnAdjectiveBundle;
