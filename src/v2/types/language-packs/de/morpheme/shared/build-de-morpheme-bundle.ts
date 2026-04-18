import type { AbstractInherentFeatures } from "../../../../abstract/features/features";
import type { MorphemeSubKind, OrthographicStatus } from "../../../../core/enums";
import type { DeLemma, DeLemmaSelection, DeLemmaSurface } from "../../shared";

export type DeMorphemeLemma<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
> = DeLemma<"Morpheme", LSK, IF>;

export type DeMorphemeLemmaSurface<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
> = DeLemmaSurface<"Morpheme", LSK, IF>;

export type DeMorphemeLemmaSelection<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLemmaSelection<"Morpheme", LSK, IF, OS>;
