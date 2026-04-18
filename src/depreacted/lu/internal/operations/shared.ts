import type { DeprecatedTargetLanguage } from "../../universal/enums/core/language";

export type DeprecatedLemmaLike<L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage> =
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

export type DeprecatedSurfaceLike<L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage> = {
	language: L;
	normalizedFullSurface: string;
	surfaceKind: string;
	lemma: DeprecatedLemmaLike<L>;
};

export type DeprecatedHydratedSelectionLikeFor<L extends DeprecatedTargetLanguage = DeprecatedTargetLanguage> = {
	language: L;
	orthographicStatus: "Standard" | "Typo";
	spellingRelation: "Canonical" | "Variant";
	surface: DeprecatedSurfaceLike<L>;
};

export type DeprecatedSurfaceOfSelection<S extends { surface: unknown }> = S extends {
	surface: infer SelectionSurface;
}
	? SelectionSurface
	: never;

export type DeprecatedLemmaOfSurface<S extends { lemma: unknown }> = S extends {
	lemma: infer SurfaceLemma;
}
	? SurfaceLemma
	: never;

export type DeprecatedLemmaSurfaceFor<T extends DeprecatedLemmaLike> = {
	language: T["language"];
	normalizedFullSurface: string;
	surfaceKind: "Lemma";
	lemma: T;
};

export type DeprecatedStandardFullSelectionForSurface<
	T extends { language: DeprecatedTargetLanguage },
> = {
	language: T["language"];
	orthographicStatus: "Standard";
	spellingRelation: "Canonical";
	selectionCoverage: "Full";
	spelledSelection: string;
	surface: T;
};

export type DeprecatedStandardFullSelectionForLemma<T extends DeprecatedLemmaLike> =
	DeprecatedStandardFullSelectionForSurface<DeprecatedLemmaSurfaceFor<T>>;

export function deprecatedAssertLanguageMatch(
	expected: DeprecatedTargetLanguage,
	actual: DeprecatedTargetLanguage,
): void {
	if (expected !== actual) {
		throw new Error(
			`lingOperation language mismatch: expected ${expected}, received ${actual}`,
		);
	}
}
