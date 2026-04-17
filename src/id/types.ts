import type { Result } from "neverthrow";

/** @public */
export type ConcreteDumlingIdKind = "Lemma" | "Selection" | "Surface";

/** @public */
export type DumlingIdLanguage = "English" | "German" | "Hebrew";

/**
 * @public
 * Minimal public lemma shape accepted by the Dumling ID codec.
 * The entity registries expose the exact DTO unions; the ID codec only requires the stable discriminator and payload fields used during serialization.
 */
export type DumlingIdLemma<L extends DumlingIdLanguage = DumlingIdLanguage> =
	| ({
			canonicalLemma: string;
			inherentFeatures: Record<string, unknown>;
			language: L;
			lemmaKind: "Lexeme";
			meaningInEmojis?: string;
			pos: string;
	  } & Record<string, unknown>)
	| ({
			canonicalLemma: string;
			language: L;
			lemmaKind: "Morpheme";
			meaningInEmojis?: string;
			morphemeKind: string;
	  } & Record<string, unknown>)
	| ({
			canonicalLemma: string;
			language: L;
			lemmaKind: "Phraseme";
			meaningInEmojis?: string;
			phrasemeKind: string;
	  } & Record<string, unknown>);

/**
 * @public
 * Minimal public surface shape accepted by the Dumling ID codec.
 */
export type DumlingIdSurface<L extends DumlingIdLanguage = DumlingIdLanguage> = {
	inflectionalFeatures?: Record<string, unknown>;
	language: L;
	lemma: DumlingIdLemma<L>;
	normalizedFullSurface: string;
	surfaceKind: string;
} & Record<string, unknown>;

/**
 * @public
 * Minimal public hydrated-selection shape accepted by the Dumling ID codec.
 */
export type DumlingIdSelection<
	L extends DumlingIdLanguage = DumlingIdLanguage,
> = {
	language: L;
	orthographicStatus: string;
	selectionCoverage: string;
	spelledSelection: string;
	spellingRelation: string;
	surface: DumlingIdSurface<L>;
} & Record<string, unknown>;

/** @public */
export type DumlingId<
	LIK extends ConcreteDumlingIdKind = ConcreteDumlingIdKind,
	L extends DumlingIdLanguage = DumlingIdLanguage,
> = string & {
	readonly __lingIdBrand: unique symbol;
	readonly __lingEntity?: LIK;
	readonly __language?: L;
};

/** @public */
export type DumlingIdValueFor<
	LIK extends ConcreteDumlingIdKind,
	L extends DumlingIdLanguage,
> = LIK extends "Lemma"
	? DumlingIdLemma<L>
	: LIK extends "Selection"
		? DumlingIdSelection<L>
		: LIK extends "Surface"
			? DumlingIdSurface<L>
			: never;

/** @public */
export type DumlingIdDecodeErrorCode =
	| "MalformedDumlingId"
	| "UnsupportedVersion"
	| "UnsupportedLanguage"
	| "UnsupportedEntityKind"
	| "LanguageMismatch"
	| "EntityMismatch"
	| "PayloadDecodeFailed";

/** @public */
export type DumlingIdDecodeError = {
	code: DumlingIdDecodeErrorCode;
	message: string;
	input: string;
	cause?: unknown;
};

/**
 * @public
 * Language-bound Dumling ID helpers.
 * `makeDumlingIdFor()` accepts the stable DTO fields the codec serializes, and the decode helpers return the corresponding codec-safe DTO shapes after runtime schema validation.
 */
export type DumlingIdApiFor<L extends DumlingIdLanguage> = {
	makeDumlingIdFor: {
		(value: DumlingIdLemma<L>): DumlingId<"Lemma", L>;
		(value: DumlingIdSelection<L>): DumlingId<"Selection", L>;
		(value: DumlingIdSurface<L>): DumlingId<"Surface", L>;
	};
	tryToDecode: (
		id: string,
	) => Result<DumlingIdValueFor<ConcreteDumlingIdKind, L>, DumlingIdDecodeError>;
	tryToDecodeAs: {
		(kind: "Lemma", id: string): Result<DumlingIdLemma<L>, DumlingIdDecodeError>;
		(
			kind: "Selection",
			id: string,
		): Result<DumlingIdSelection<L>, DumlingIdDecodeError>;
		(kind: "Surface", id: string): Result<DumlingIdSurface<L>, DumlingIdDecodeError>;
	};
};
