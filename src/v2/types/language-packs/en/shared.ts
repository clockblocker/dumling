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

export type EnLanguage = "en";

export type EmptyFeatures = Record<never, never>;

export type ValueOf<T> = T[keyof T];

export type EnFeatureValueSet<T> = T | readonly [T, ...T[]];

export type RequireAtLeastOne<T extends object> = {
	[K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

type Replace<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };
type ReplaceMany<T, R extends Partial<Record<keyof T, unknown>>> = Omit<
	T,
	keyof R
> &
	R;

export type EnLemma<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
> = Replace<AbstractLemma<EnLanguage, LK, LSK>, "inherentFeatures", IF>;

export type EnLemmaSurface<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
> = Replace<
	AbstractSurface<EnLanguage, "Lemma", LK, LSK>,
	"lemma",
	EnLemma<LK, LSK, IF>
>;

export type EnInflectionSurface<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
> = ReplaceMany<
	AbstractSurface<EnLanguage, "Inflection", LK, LSK>,
	{
		inflectionalFeatures: FF;
		lemma: EnLemma<LK, LSK, IF>;
	}
>;

export type EnLemmaSelection<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = Replace<
	AbstractSelection<EnLanguage, OS, "Lemma", LK, LSK>,
	"surface",
	EnLemmaSurface<LK, LSK, IF>
>;

export type EnInflectionSelection<
	LK extends LemmaKind,
	LSK extends AbstractLemmaSubKindFor<LK>,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = Replace<
	AbstractSelection<EnLanguage, OS, "Inflection", LK, LSK>,
	"surface",
	EnInflectionSurface<LK, LSK, IF, FF>
>;
