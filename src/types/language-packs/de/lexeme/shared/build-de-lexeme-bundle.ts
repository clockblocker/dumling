import type {
	AbstractInflectionalFeatures,
	AbstractInherentFeatures,
} from "../../../../abstract/features/features";
import type { LexemeSubKind, OrthographicStatus } from "../../../../core/enums";
import type {
	DeInflectionSelection,
	DeInflectionSurface,
	DeLemma,
	DeLemmaSelection,
	DeLemmaSurface,
	RequireAtLeastOne,
} from "../../shared";

export type DeLexemeLemma<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
> = DeLemma<"Lexeme", LSK, IF>;

export type DeLexemeLemmaSurface<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
> = DeLemmaSurface<"Lexeme", LSK, IF>;

export type DeLexemeInflectionSurface<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
> = DeInflectionSurface<"Lexeme", LSK, IF, FF>;

export type DeLexemeLemmaSelection<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = DeLemmaSelection<"Lexeme", LSK, IF, OS>;

export type DeLexemeInflectionSelection<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = DeInflectionSelection<"Lexeme", LSK, IF, FF, OS>;

export type DeUninflectableLexemeBundle<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lemma: DeLexemeLemma<LSK, IF>;
	LemmaSelection: DeLexemeLemmaSelection<LSK, IF, OS>;
	LemmaSurface: DeLexemeLemmaSurface<LSK, IF>;
};

export type DeInflectableLexemeBundle<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = DeUninflectableLexemeBundle<LSK, IF, OS> & {
	InflectionSelection: DeLexemeInflectionSelection<LSK, IF, FF, OS>;
	InflectionSurface: DeLexemeInflectionSurface<LSK, IF, FF>;
};
