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

export type DeLanguage = "de";

export type EmptyFeatures = Record<never, never>;

export type ValueOf<T> = T[keyof T];

export type DeFeatureValueSet<T> = T | readonly [T, ...T[]];

export type RequireAtLeastOne<T extends object> = {
	[K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

type Replace<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };
type ReplaceMany<T, R extends Partial<Record<keyof T, unknown>>> = Omit<
	T,
	keyof R
> &
	R;

export type DeLemma<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
> = Replace<AbstractLemma<DeLanguage, LK, LSK>, "inherentFeatures", IF>;

export type DeLemmaSurface<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
> = Replace<
	AbstractSurface<DeLanguage, "Lemma", LK, LSK>,
	"lemma",
	DeLemma<LK, LSK, IF>
>;

export type DeInflectionSurface<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
> = ReplaceMany<
	AbstractSurface<DeLanguage, "Inflection", LK, LSK>,
	{
		inflectionalFeatures: FF;
		lemma: DeLemma<LK, LSK, IF>;
	}
>;

export type DeLemmaSelection<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = Replace<
	AbstractSelection<DeLanguage, OS, "Lemma", LK, LSK>,
	"surface",
	DeLemmaSurface<LK, LSK, IF>
>;

export type DeInflectionSelection<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = Replace<
	AbstractSelection<DeLanguage, OS, "Inflection", LK, LSK>,
	"surface",
	DeInflectionSurface<LK, LSK, IF, FF>
>;
