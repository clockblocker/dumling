import type { AbstractFeatureValue } from "../../../../abstract/features/features";
import type { OrthographicStatus } from "../../../../core/enums";
import type { RequireAtLeastOne } from "../../shared";
import type { DeInflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";
import type {
	DeCase,
	DeGender,
	DeNumber,
	DePerson,
	DePolite,
} from "../shared/de-common-enums";

type DePronounExtPos = Extract<AbstractFeatureValue<"extPos">, "DET">;
type DePronounType = Extract<
	AbstractFeatureValue<"pronType">,
	"Dem" | "Ind" | "Int" | "Neg" | "Prs" | "Rcp" | "Rel" | "Tot"
>;

export type DePronounInherentFeatures = {
	extPos?: DePronounExtPos;
	foreign?: AbstractFeatureValue<"foreign">;
	person?: DePerson;
	polite?: DePolite;
	poss?: AbstractFeatureValue<"poss">;
	pronType?: DePronounType;
};

export type DePronounInflectionalFeatures = RequireAtLeastOne<{
	case?: DeCase;
	gender?: DeGender;
	number?: DeNumber;
	reflex?: AbstractFeatureValue<"reflex">;
}>;

export type DePronounBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeInflectableLexemeBundle<
	"PRON",
	DePronounInherentFeatures,
	DePronounInflectionalFeatures,
	OS
>;
