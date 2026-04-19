import type {
	AbstractInflectionalFeatures,
	AbstractInherentFeatures,
} from "../../../../abstract/features/features";
import type { LexemeSubKind, OrthographicStatus } from "../../../../core/enums";
import type {
	HeInflectionSelection,
	HeInflectionSurface,
	HeLemma,
	HeLemmaSelection,
	HeLemmaSurface,
	RequireAtLeastOne,
} from "../../shared";

export type HeLexemeLemma<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
> = HeLemma<"Lexeme", LSK, IF>;

export type HeLexemeLemmaSurface<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
> = HeLemmaSurface<"Lexeme", LSK, IF>;

export type HeLexemeInflectionSurface<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
> = HeInflectionSurface<"Lexeme", LSK, IF, FF>;

export type HeLexemeLemmaSelection<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = HeLemmaSelection<"Lexeme", LSK, IF, OS>;

export type HeLexemeInflectionSelection<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = HeInflectionSelection<"Lexeme", LSK, IF, FF, OS>;

export type HeUninflectableLexemeBundle<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lemma: HeLexemeLemma<LSK, IF>;
	LemmaSelection: HeLexemeLemmaSelection<LSK, IF, OS>;
	LemmaSurface: HeLexemeLemmaSurface<LSK, IF>;
};

export type HeInflectableLexemeBundle<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = HeUninflectableLexemeBundle<LSK, IF, OS> & {
	InflectionSelection: HeLexemeInflectionSelection<LSK, IF, FF, OS>;
	InflectionSurface: HeLexemeInflectionSurface<LSK, IF, FF>;
};
