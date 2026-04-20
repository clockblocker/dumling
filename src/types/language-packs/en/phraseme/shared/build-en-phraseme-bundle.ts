import type { AbstractInherentFeatures } from "../../../../abstract/features/features";
import type { OrthographicStatus, PhrasemeSubKind } from "../../../../core/enums";
import type { EnLemma, EnLemmaSelection, EnLemmaSurface } from "../../shared";

export type EnPhrasemeLemma<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
> = EnLemma<"Phraseme", LSK, IF>;

export type EnPhrasemeLemmaSurface<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
> = EnLemmaSurface<"Phraseme", LSK, IF>;

export type EnPhrasemeLemmaSelection<
	LSK extends PhrasemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = EnLemmaSelection<"Phraseme", LSK, IF, OS>;
