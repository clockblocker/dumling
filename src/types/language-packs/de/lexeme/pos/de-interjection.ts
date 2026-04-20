import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

type DeInterjectionPartType = "Res";

export type DeInterjectionInherentFeatures = {
	partType?: DeInterjectionPartType;
};

export type DeInterjectionBundle<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<"INTJ", DeInterjectionInherentFeatures, OS>;
