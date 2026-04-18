import type { Result } from "neverthrow";

/** @public */
export type DeprecatedConcreteDumlingIdKind = "Lemma" | "Selection" | "Surface";

/** @public */
export type DeprecatedDumlingIdLanguage = "English" | "German" | "Hebrew";

/**
 * @public
 * Minimal public lemma shape accepted by the Dumling ID codec.
 * The entity registries expose the exact DTO unions; the ID codec only requires the stable discriminator and payload fields used during serialization.
 */
export type DeprecatedDumlingIdLemma<L extends DeprecatedDumlingIdLanguage = DeprecatedDumlingIdLanguage> =
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
export type DeprecatedDumlingIdSurface<L extends DeprecatedDumlingIdLanguage = DeprecatedDumlingIdLanguage> = {
	inflectionalFeatures?: Record<string, unknown>;
	language: L;
	lemma: DeprecatedDumlingIdLemma<L>;
	normalizedFullSurface: string;
	surfaceKind: string;
} & Record<string, unknown>;

/**
 * @public
 * Minimal public hydrated-selection shape accepted by the Dumling ID codec.
 */
export type DeprecatedDumlingIdSelection<
	L extends DeprecatedDumlingIdLanguage = DeprecatedDumlingIdLanguage,
> = {
	language: L;
	orthographicStatus: string;
	selectionCoverage: string;
	spelledSelection: string;
	spellingRelation: string;
	surface: DeprecatedDumlingIdSurface<L>;
} & Record<string, unknown>;

/** @public */
export type DeprecatedDumlingId<
	LIK extends DeprecatedConcreteDumlingIdKind = DeprecatedConcreteDumlingIdKind,
	L extends DeprecatedDumlingIdLanguage = DeprecatedDumlingIdLanguage,
> = string & {
	readonly __lingIdBrand: unique symbol;
	readonly __lingEntity?: LIK;
	readonly __language?: L;
};

/** @public */
export type DeprecatedDumlingIdValueFor<
	LIK extends DeprecatedConcreteDumlingIdKind,
	L extends DeprecatedDumlingIdLanguage,
> = LIK extends "Lemma"
	? DeprecatedDumlingIdLemma<L>
	: LIK extends "Selection"
		? DeprecatedDumlingIdSelection<L>
		: LIK extends "Surface"
			? DeprecatedDumlingIdSurface<L>
			: never;

/** @public */
export type DeprecatedDumlingIdDecodeErrorCode =
	| "MalformedDumlingId"
	| "UnsupportedVersion"
	| "UnsupportedLanguage"
	| "UnsupportedEntityKind"
	| "LanguageMismatch"
	| "EntityMismatch"
	| "PayloadDecodeFailed";

/** @public */
export type DeprecatedDumlingIdDecodeError = {
	code: DeprecatedDumlingIdDecodeErrorCode;
	message: string;
	input: string;
	cause?: unknown;
};

/**
 * @public
 * Language-bound Dumling ID helpers.
 * `makeDumlingIdFor()` accepts the stable DTO fields the codec serializes, and the decode helpers return the corresponding codec-safe DTO shapes after runtime schema validation.
 */
export type DeprecatedDumlingIdApiFor<L extends DeprecatedDumlingIdLanguage> = {
	makeDumlingIdFor: {
		(value: DeprecatedDumlingIdLemma<L>): DeprecatedDumlingId<"Lemma", L>;
		(value: DeprecatedDumlingIdSelection<L>): DeprecatedDumlingId<"Selection", L>;
		(value: DeprecatedDumlingIdSurface<L>): DeprecatedDumlingId<"Surface", L>;
	};
	tryToDecode: (
		id: string,
	) => Result<DeprecatedDumlingIdValueFor<DeprecatedConcreteDumlingIdKind, L>, DeprecatedDumlingIdDecodeError>;
	tryToDecodeAs: {
		(kind: "Lemma", id: string): Result<DeprecatedDumlingIdLemma<L>, DeprecatedDumlingIdDecodeError>;
		(
			kind: "Selection",
			id: string,
		): Result<DeprecatedDumlingIdSelection<L>, DeprecatedDumlingIdDecodeError>;
		(kind: "Surface", id: string): Result<DeprecatedDumlingIdSurface<L>, DeprecatedDumlingIdDecodeError>;
	};
};
