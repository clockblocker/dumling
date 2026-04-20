import type {
	AbstractLemma,
	AbstractLemmaSubKindFor,
	AbstractSelection,
	AbstractSurface,
} from "../../abstract/entities";
import type {
	AbstractInherentFeatures,
	AbstractInflectionalFeatures,
} from "../../abstract/features/features";
import type { LemmaKind, OrthographicStatus } from "../../core/enums";

export type HeLanguage = "he";

export type EmptyFeatures = Record<never, never>;

export type ValueOf<T> = T[keyof T];

export type HeFeatureValueSet<T> = T | readonly [T, ...T[]];

export type RequireAtLeastOne<T extends object> = {
	[K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

type Replace<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };
type ReplaceMany<T, R extends Partial<Record<keyof T, unknown>>> = Omit<
	T,
	keyof R
> &
	R;

export type HeLemma<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
> = Replace<AbstractLemma<HeLanguage, LK, LSK>, "inherentFeatures", IF>;

export type HeLemmaSurface<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
> = Replace<
	AbstractSurface<HeLanguage, "Lemma", LK, LSK>,
	"lemma",
	HeLemma<LK, LSK, IF>
>;

export type HeInflectionSurface<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
> = ReplaceMany<
	AbstractSurface<HeLanguage, "Inflection", LK, LSK>,
	{
		inflectionalFeatures: FF;
		lemma: HeLemma<LK, LSK, IF>;
	}
>;

export type HeLemmaSelection<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = Replace<
	AbstractSelection<HeLanguage, OS, "Lemma", LK, LSK>,
	"surface",
	HeLemmaSurface<LK, LSK, IF>
>;

export type HeInflectionSelection<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = Replace<
	AbstractSelection<HeLanguage, OS, "Inflection", LK, LSK>,
	"surface",
	HeInflectionSurface<LK, LSK, IF, FF>
>;
