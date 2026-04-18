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
	language: L;
	normalizedFullSurface: string;
	surfaceKind: string;
	lemma: LemmaLike<L>;
};

export type HydratedSelectionLikeFor<L extends TargetLanguage = TargetLanguage> = {
	language: L;
	orthographicStatus: "Standard" | "Typo";
	spellingRelation: "Canonical" | "Variant";
	surface: SurfaceLike<L>;
};

export type SurfaceOfSelection<S extends { surface: unknown }> = S extends {
	surface: infer SelectionSurface;
}
	? SelectionSurface
	: never;

export type LemmaOfSurface<S extends { lemma: unknown }> = S extends {
	lemma: infer SurfaceLemma;
}
	? SurfaceLemma
	: never;

export type LemmaSurfaceFor<T extends LemmaLike> = {
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
