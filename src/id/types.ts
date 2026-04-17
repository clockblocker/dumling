import type { Result } from "neverthrow";
import type { Lemma, Selection, Surface } from "../lu/public-entities";
import type { TargetLanguage } from "../lu/universal/enums/core/language";

export type ConcreteDumlingIdKind = "Lemma" | "Selection" | "Surface";

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
		? Selection<L>
		: LIK extends "Surface"
			? Surface<L>
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
		(value: Selection<L>): DumlingId<"Selection", L>;
		(value: Surface<L>): DumlingId<"Surface", L>;
	};
	tryToDecode: (
		id: string,
	) => Result<DumlingIdValueFor<ConcreteDumlingIdKind, L>, DumlingIdDecodeError>;
	tryToDecodeAs: {
		(kind: "Lemma", id: string): Result<Lemma<L>, DumlingIdDecodeError>;
		(
			kind: "Selection",
			id: string,
		): Result<Selection<L>, DumlingIdDecodeError>;
		(
			kind: "Surface",
			id: string,
		): Result<Surface<L>, DumlingIdDecodeError>;
	};
};
