import type { TargetLanguage } from "../../universal/enums/core/language";

export type LemmaLike<L extends TargetLanguage = TargetLanguage> =
	| {
			canonicalLemma: string;
			language: L;
			lemmaKind: "Lexeme";
			pos: string;
	  }
	| {
			canonicalLemma: string;
			language: L;
			lemmaKind: "Morpheme";
			morphemeKind: string;
	  }
	| {
			canonicalLemma: string;
			language: L;
			lemmaKind: "Phraseme";
			phrasemeKind: string;
	  };

export type SurfaceLike<L extends TargetLanguage = TargetLanguage> = {
	discriminators: {
		lemmaKind: string;
		lemmaSubKind: string;
	};
	language: L;
	normalizedFullSurface: string;
	surfaceKind: string;
	lemma: LemmaLike<L>;
};

export type UnknownSelectionLikeFor<L extends TargetLanguage = TargetLanguage> =
	{
		language: L;
		orthographicStatus: "Unknown";
		spelledSelection: string;
	};

export type KnownSelectionLikeFor<L extends TargetLanguage = TargetLanguage> = {
	language: L;
	orthographicStatus: "Standard" | "Typo";
	spellingRelation?: "Canonical" | "Variant";
	surface: SurfaceLike<L>;
};

export type SurfaceOfSelection<S extends { surface: unknown }> = S extends {
	surface: infer SelectionSurface;
}
	? SelectionSurface
	: never;

export type CompatibleLemmaForSurface<S extends SurfaceLike> = S extends {
	discriminators: infer D;
	language: infer L extends TargetLanguage;
}
	? D extends { lemmaKind: "Lexeme"; lemmaSubKind: infer K extends string }
		? LemmaLike<L> & { lemmaKind: "Lexeme"; pos: K }
		: D extends {
					lemmaKind: "Morpheme";
					lemmaSubKind: infer K extends string;
				}
			? LemmaLike<L> & { lemmaKind: "Morpheme"; morphemeKind: K }
			: D extends {
						lemmaKind: "Phraseme";
						lemmaSubKind: infer K extends string;
					}
				? LemmaLike<L> & { lemmaKind: "Phraseme"; phrasemeKind: K }
				: never
	: never;

export type LemmaOfSurface<S extends { lemma: unknown }> = S extends {
	lemma: infer SurfaceLemma;
}
	? SurfaceLemma
	: never;

type LemmaDiscriminatorOf<T extends LemmaLike> = T extends {
	lemmaKind: "Lexeme";
	pos: infer D;
}
	? Extract<D, string>
	: T extends {
				lemmaKind: "Morpheme";
				morphemeKind: infer D;
			}
		? Extract<D, string>
		: T extends {
					lemmaKind: "Phraseme";
					phrasemeKind: infer D;
				}
			? Extract<D, string>
			: never;

export type LemmaSurfaceFor<T extends LemmaLike> = {
	discriminators: {
		lemmaKind: T["lemmaKind"];
		lemmaSubKind: LemmaDiscriminatorOf<T>;
	};
	language: T["language"];
	normalizedFullSurface: string;
	surfaceKind: "Lemma";
	lemma: T;
};

export type StandardFullSelectionForSurface<
	T extends { language: TargetLanguage },
> = {
	language: T["language"];
	orthographicStatus: "Standard";
	spellingRelation: "Canonical";
	selectionCoverage: "Full";
	spelledSelection: string;
	surface: T;
};

export type StandardFullSelectionForLemma<T extends LemmaLike> =
	StandardFullSelectionForSurface<LemmaSurfaceFor<T>>;

export function assertLanguageMatch(
	expected: TargetLanguage,
	actual: TargetLanguage,
): void {
	if (expected !== actual) {
		throw new Error(
			`lingOperation language mismatch: expected ${expected}, received ${actual}`,
		);
	}
}

export function getLemmaDiscriminators<T extends LemmaLike>(
	lemma: T,
): LemmaSurfaceFor<T>["discriminators"] {
	switch (lemma.lemmaKind) {
		case "Lexeme":
			return {
				lemmaKind: lemma.lemmaKind,
				lemmaSubKind: lemma.pos,
			} as LemmaSurfaceFor<T>["discriminators"];
		case "Morpheme":
			return {
				lemmaKind: lemma.lemmaKind,
				lemmaSubKind: lemma.morphemeKind,
			} as LemmaSurfaceFor<T>["discriminators"];
		case "Phraseme":
			return {
				lemmaKind: lemma.lemmaKind,
				lemmaSubKind: lemma.phrasemeKind,
			} as LemmaSurfaceFor<T>["discriminators"];
	}
}
