import type { OrthographicStatus } from "../../../../core/enums";
import type { DeUninflectableLexemeBundle } from "../shared/build-de-lexeme-bundle";

type DeInterjectionPartType = "Res";

export type DeInterjectionInherentFeatures = {
	partType?: DeInterjectionPartType;
};

type DeInterjectionBundle<OS extends OrthographicStatus = OrthographicStatus> =
	DeUninflectableLexemeBundle<"INTJ", DeInterjectionInherentFeatures, OS>;

export type DeInterjectionLemma = DeInterjectionBundle["Lemma"];
export type DeInterjectionLemmaSurface = DeInterjectionBundle["LemmaSurface"];
export type DeInterjectionLemmaSelection<
	OS extends OrthographicStatus = OrthographicStatus,
> = DeInterjectionBundle<OS>["LemmaSelection"];

export type DeInterjectionTypes = DeInterjectionBundle;
