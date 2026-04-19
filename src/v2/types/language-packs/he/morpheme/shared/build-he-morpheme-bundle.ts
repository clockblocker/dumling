import type {
	AbstractInherentFeatures,
} from "../../../../abstract/features/features";
import type { MorphemeSubKind, OrthographicStatus } from "../../../../core/enums";
import type {
	HeLemma,
	HeLemmaSelection,
	HeLemmaSurface,
} from "../../shared";

export type HeMorphemeLemma<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
> = HeLemma<"Morpheme", LSK, IF>;

export type HeMorphemeLemmaSurface<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
> = HeLemmaSurface<"Morpheme", LSK, IF>;

export type HeMorphemeLemmaSelection<
	LSK extends MorphemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = HeLemmaSelection<"Morpheme", LSK, IF, OS>;
