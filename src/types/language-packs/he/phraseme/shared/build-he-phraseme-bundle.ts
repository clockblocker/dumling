import type { AbstractInherentFeatures } from "../../../../abstract/features/features";
import type { OrthographicStatus, PhrasemeSubKind } from "../../../../core/enums";
import type {
	HeLemma,
	HeLemmaSelection,
	HeLemmaSurface,
} from "../../shared";

export type HePhrasemeLemma<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
> = HeLemma<"Phraseme", LSK, IF>;

export type HePhrasemeLemmaSurface<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
> = HeLemmaSurface<"Phraseme", LSK, IF>;

export type HePhrasemeLemmaSelection<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = HeLemmaSelection<"Phraseme", LSK, IF, OS>;
