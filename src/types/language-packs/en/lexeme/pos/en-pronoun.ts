import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { EnFeatureValueSet, RequireAtLeastOne } from "../../shared";
import type { EnInflectableLexemeBundle } from "../shared/build-en-lexeme-bundle";
import type {
	EnCase,
	EnGender,
	EnPerson,
	EnPronType,
	EnStyle,
} from "../shared/en-common-enums";

type EnPronounExtPos = Extract<AbstractFeatureValue<"extPos">, "ADV" | "PRON">;
type EnPronounPronType = Extract<
	EnPronType,
	"Dem" | "Emp" | "Ind" | "Int" | "Neg" | "Prs" | "Rcp" | "Rel" | "Tot"
>;
type EnPronounStyle = Extract<
	EnStyle,
	"Arch" | "Coll" | "Expr" | "Slng" | "Vrnc"
>;
type EnPronounNumber = Extract<
	import("../shared/en-common-enums").EnNumber,
	"Plur" | "Sing"
>;

export type EnPronounInherentFeatures = {
	abbr?: AbstractFeatureValue<"abbr">;
	extPos?: EnPronounExtPos;
	person?: EnPerson;
	poss?: AbstractFeatureValue<"poss">;
	pronType?: EnFeatureValueSet<EnPronounPronType>;
	style?: EnPronounStyle;
};

export type EnPronounInflectionalFeatures = RequireAtLeastOne<{
	case?: EnCase;
	gender?: EnGender;
	number?: EnPronounNumber;
	reflex?: AbstractFeatureValue<"reflex">;
}>;

export type EnPronounBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = EnInflectableLexemeBundle<
	"PRON",
	EnPronounInherentFeatures,
	EnPronounInflectionalFeatures,
	OS
>;
