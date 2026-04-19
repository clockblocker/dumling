import type { AbstractInherentFeatures } from "../../../../abstract/features/features";
import type { MorphemeSubKind, OrthographicStatus } from "../../../../core/enums";
import type { EnLemma, EnLemmaSelection, EnLemmaSurface } from "../../shared";

export type EnMorphemeLemma<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
> = EnLemma<"Morpheme", LSK, IF>;

export type EnMorphemeLemmaSurface<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
> = EnLemmaSurface<"Morpheme", LSK, IF>;

export type EnMorphemeLemmaSelection<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = EnLemmaSelection<"Morpheme", LSK, IF, OS>;
