/**
 * @public
 * Supported Dumling languages across the public DTO entrypoints.
 */
export type DumlingLanguage = "English" | "German" | "Hebrew";

/**
 * @public
 * Stable public lemma DTOs.
 * The exact language- and discriminator-specific unions live in `dumling/schema`; this entrypoint keeps the transport shape readable and stable.
 */
export type Lemma<
	L extends DumlingLanguage = DumlingLanguage,
	LK extends string = string,
	D extends string = string,
> = LK extends "Lexeme"
	? ({
			canonicalLemma: string;
			inherentFeatures: Record<string, unknown>;
			language: L;
			lemmaKind: "Lexeme";
			meaningInEmojis?: string;
			pos: D;
	  } & Record<string, unknown>)
	: LK extends "Morpheme"
		? ({
			canonicalLemma: string;
			language: L;
			lemmaKind: "Morpheme";
			meaningInEmojis?: string;
			morphemeKind: D;
	  } & Record<string, unknown>)
		: LK extends "Phraseme"
			? ({
				canonicalLemma: string;
				language: L;
				lemmaKind: "Phraseme";
				meaningInEmojis?: string;
				phrasemeKind: D;
		  } & Record<string, unknown>)
			:
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
 * Stable public surface DTOs.
 * `surfaceKind` tells you whether the payload is lemma-backed or inflected; exact per-language feature validation lives in `dumling/schema`.
 */
export type Surface<L extends DumlingLanguage = DumlingLanguage> = ({
	inflectionalFeatures?: Record<string, unknown>;
	language: L;
	lemma: Lemma<L>;
	normalizedFullSurface: string;
	surfaceKind: "Inflection" | "Lemma";
} & Record<string, unknown>);

/**
 * @public
 * Stable public hydrated selection DTOs.
 * These always include the resolved surface payload and a known orthographic status.
 */
export type Selection<
	L extends DumlingLanguage = DumlingLanguage,
	OS extends string = string,
	SK extends string = string,
	LK extends string = string,
	D extends string = string,
> = ({
	language: L;
	orthographicStatus: OS extends "Standard" | "Typo"
		? OS
		: "Standard" | "Typo";
	selectionCoverage: "Full" | "Partial";
	spelledSelection: string;
	spellingRelation: "Canonical" | "Variant";
	surface: Surface<L> & { surfaceKind: SK extends string ? SK : string; lemma: Lemma<L, LK, D> };
} & Record<string, unknown>);

/**
 * @public
 * Public learner-selection DTOs before hydration resolves the orthographic status and nested surface payload.
 */
export type ObservedSelection<
	L extends DumlingLanguage = DumlingLanguage,
> = {
	language: L;
	orthographicStatus: "Unknown";
	spelledSelection: string;
} & Record<string, unknown>;
