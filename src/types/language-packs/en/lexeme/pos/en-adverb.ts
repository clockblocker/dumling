import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnFeatureValueSet, RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnDegree,
	EnNumForm,
	EnNumType,
	EnPronType,
	EnStyle,
} from "../shared/en-common-enums";

type EnAdverbExtPos = Extract<AbstractFeatureValue<"extPos">, "ADP" | "ADV" | "CCONJ" | "SCONJ">;
type EnAdverbNumForm = Extract<EnNumForm, "Word">;
type EnAdverbNumType = Extract<EnNumType, "Frac" | "Mult" | "Ord">;
type EnAdverbPronType = Extract<EnPronType, "Dem" | "Ind" | "Int" | "Neg" | "Rel" | "Tot">;
type EnAdverbStyle = Extract<EnStyle, "Expr" | "Slng">;

export type EnAdverbInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnAdverbExtPos;
	numForm?: EnAdverbNumForm;
	numType?: EnAdverbNumType;
	pronType?: EnFeatureValueSet<EnAdverbPronType>;
	style?: EnAdverbStyle;
};

export type EnAdverbInflectionalFeatures = RequireAtLeastOne<{
	degree?: EnDegree;
}>;

type EnAdverbBundle<OS extends OrthographicStatus = OrthographicStatus> =
	EnInflectableLexemeBundle<
		"ADV",
		EnAdverbInherentFeatures,
		EnAdverbInflectionalFeatures,
		OS
	>;

export type EnAdverbLemma = EnAdverbBundle["Lemma"];
export type EnAdverbLemmaSurface = EnAdverbBundle["LemmaSurface"];
export type EnAdverbInflectionSurface = EnAdverbBundle["InflectionSurface"];
export type EnAdverbLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnAdverbBundle<OS>["LemmaSelection"];
export type EnAdverbInflectionSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnAdverbBundle<OS>["InflectionSelection"];

export type EnAdverbTypes = EnAdverbBundle;
