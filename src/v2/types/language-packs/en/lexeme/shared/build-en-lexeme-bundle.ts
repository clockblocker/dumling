import type {
	AbstractInflectionalFeatures,
	AbstractInherentFeatures,
} from "../../../../abstract/features/features";
import type { LexemeSubKind, OrthographicStatus } from "../../../../core/enums";
import type {
	EnInflectionSelection,
	EnInflectionSurface,
	EnLemma,
	EnLemmaSelection,
	EnLemmaSurface,
	RequireAtLeastOne,
} from "../../shared";

export type EnLexemeLemma<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
> = EnLemma<"Lexeme", LSK, IF>;

export type EnLexemeLemmaSurface<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
> = EnLemmaSurface<"Lexeme", LSK, IF>;

export type EnLexemeInflectionSurface<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
> = EnInflectionSurface<"Lexeme", LSK, IF, FF>;

export type EnLexemeLemmaSelection<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = EnLemmaSelection<"Lexeme", LSK, IF, OS>;

export type EnLexemeInflectionSelection<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = EnInflectionSelection<"Lexeme", LSK, IF, FF, OS>;

export type EnUninflectableLexemeBundle<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	OS extends OrthographicStatus = OrthographicStatus,
> = {
	Lemma: EnLexemeLemma<LSK, IF>;
	LemmaSelection: EnLexemeLemmaSelection<LSK, IF, OS>;
	LemmaSurface: EnLexemeLemmaSurface<LSK, IF>;
};

export type EnInflectableLexemeBundle<
	LSK extends LexemeSubKind,
	IF extends AbstractInherentFeatures,
	FF extends RequireAtLeastOne<AbstractInflectionalFeatures>,
	OS extends OrthographicStatus = OrthographicStatus,
> = EnUninflectableLexemeBundle<LSK, IF, OS> & {
	InflectionSelection: EnLexemeInflectionSelection<LSK, IF, FF, OS>;
	InflectionSurface: EnLexemeInflectionSurface<LSK, IF, FF>;
};
