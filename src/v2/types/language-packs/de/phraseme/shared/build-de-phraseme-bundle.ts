import type { AbstractInherentFeatures } from "../../../../abstract/features/features";
import type { OrthographicStatus, PhrasemeSubKind } from "../../../../core/enums";
import type { DeLemma, DeLemmaSelection, DeLemmaSurface } from "../../shared";

export type DePhrasemeLemma<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
> = DeLemma<"Phraseme", LSK, IF>;

export type DePhrasemeLemmaSurface<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
> = DeLemmaSurface<"Phraseme", LSK, IF>;

export type DePhrasemeLemmaSelection<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLemmaSelection<"Phraseme", LSK, IF, OS>;
