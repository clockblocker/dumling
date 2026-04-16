import type { Result } from "neverthrow";
import type {
	Lemma,
	ResolvedSurface,
	Selection,
	UnresolvedSurface,
} from "../lu/public-entities";
import type { TargetLanguage } from "../lu/universal/enums/core/language";

export type ConcreteDumlingIdKind =
	| "Lemma"
	| "Selection"
	| "ResolvedSurface"
	| "UnresolvedSurface";

export type KnownSelection<L extends TargetLanguage = TargetLanguage> = Exclude<
	Selection<L>,
	{ orthographicStatus: "Unknown" }
>;

export type DumlingId<
	LIK extends ConcreteDumlingIdKind = ConcreteDumlingIdKind,
	L extends TargetLanguage = TargetLanguage,
> = string & {
	readonly __lingIdBrand: unique symbol;
	readonly __lingEntity?: LIK;
	readonly __language?: L;
};

export type DumlingIdValueFor<
	LIK extends ConcreteDumlingIdKind,
	L extends TargetLanguage,
> = LIK extends "Lemma"
	? Lemma<L>
	: LIK extends "Selection"
		? KnownSelection<L>
		: LIK extends "ResolvedSurface"
			? ResolvedSurface<L>
			: LIK extends "UnresolvedSurface"
				? UnresolvedSurface<L>
				: never;

export type DumlingIdDecodeErrorCode =
	| "MalformedDumlingId"
	| "UnsupportedVersion"
	| "UnsupportedLanguage"
	| "UnsupportedEntityKind"
	| "LanguageMismatch"
	| "EntityMismatch"
	| "PayloadDecodeFailed";

export type DumlingIdDecodeError = {
	code: DumlingIdDecodeErrorCode;
	message: string;
	input: string;
	cause?: unknown;
};

export type DumlingIdApiFor<L extends TargetLanguage> = {
	makeDumlingIdFor: {
		(value: Lemma<L>): DumlingId<"Lemma", L>;
		(value: KnownSelection<L>): DumlingId<"Selection", L>;
		(value: ResolvedSurface<L>): DumlingId<"ResolvedSurface", L>;
		(value: UnresolvedSurface<L>): DumlingId<"UnresolvedSurface", L>;
	};
	tryToDecode: (
		id: string,
	) => Result<DumlingIdValueFor<ConcreteDumlingIdKind, L>, DumlingIdDecodeError>;
	tryToDecodeAs: {
		(kind: "Lemma", id: string): Result<Lemma<L>, DumlingIdDecodeError>;
		(
			kind: "Selection",
			id: string,
		): Result<KnownSelection<L>, DumlingIdDecodeError>;
		(
			kind: "ResolvedSurface",
			id: string,
		): Result<ResolvedSurface<L>, DumlingIdDecodeError>;
		(
			kind: "UnresolvedSurface",
			id: string,
		): Result<UnresolvedSurface<L>, DumlingIdDecodeError>;
	};
};
