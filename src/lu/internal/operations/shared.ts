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
	lemma: { canonicalLemma: string } | LemmaLike<L>;
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

export type ResolvedSurfaceLikeFor<L extends TargetLanguage = TargetLanguage> =
	SurfaceLike<L> & { lemma: LemmaLike<L> };

export type UnresolvedSurfaceLikeFor<
	L extends TargetLanguage = TargetLanguage,
> = SurfaceLike<L> & { lemma: { canonicalLemma: string } };

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

export type ResolvedSurfaceWithLemma<
	S extends UnresolvedSurfaceLikeFor,
	T extends CompatibleLemmaForSurface<S>,
> = Omit<S, "lemma"> & { lemma: T };

export type UnresolvedSurfaceOf<S extends SurfaceLike> = Omit<S, "lemma"> & {
	lemma: Pick<S["lemma"], "canonicalLemma">;
};

export type LemmaOfSurface<S extends { lemma: unknown }> = S extends {
	lemma: infer SurfaceLemma;
}
	? Extract<SurfaceLemma, { lemmaKind: unknown }>
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

export type ResolvedLemmaSurfaceFor<T extends LemmaLike> = {
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
	StandardFullSelectionForSurface<ResolvedLemmaSurfaceFor<T>>;

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

export function hasResolvedSurfaceLemma<L extends TargetLanguage>(
	surface: SurfaceLike<L>,
): surface is ResolvedSurfaceLikeFor<L> {
	return (
		typeof surface.lemma === "object" &&
		surface.lemma !== null &&
		"lemmaKind" in surface.lemma
	);
}

export function getLemmaDiscriminators<T extends LemmaLike>(
	lemma: T,
): ResolvedLemmaSurfaceFor<T>["discriminators"] {
	switch (lemma.lemmaKind) {
		case "Lexeme":
			return {
				lemmaKind: lemma.lemmaKind,
				lemmaSubKind: lemma.pos,
			} as ResolvedLemmaSurfaceFor<T>["discriminators"];
		case "Morpheme":
			return {
				lemmaKind: lemma.lemmaKind,
				lemmaSubKind: lemma.morphemeKind,
			} as ResolvedLemmaSurfaceFor<T>["discriminators"];
		case "Phraseme":
			return {
				lemmaKind: lemma.lemmaKind,
				lemmaSubKind: lemma.phrasemeKind,
			} as ResolvedLemmaSurfaceFor<T>["discriminators"];
	}
}

export function assertSurfaceMatchesLemma<
	S extends UnresolvedSurfaceLikeFor,
	T extends CompatibleLemmaForSurface<S>,
>(surface: S, lemma: T): void {
	assertLanguageMatch(surface.language, lemma.language);

	if (surface.lemma.canonicalLemma !== lemma.canonicalLemma) {
		throw new Error(
			`lingOperation canonical lemma mismatch: expected ${surface.lemma.canonicalLemma}, received ${lemma.canonicalLemma}`,
		);
	}

	const lemmaDiscriminators = getLemmaDiscriminators(lemma);

	if (
		surface.discriminators.lemmaKind !== lemmaDiscriminators.lemmaKind ||
		surface.discriminators.lemmaSubKind !== lemmaDiscriminators.lemmaSubKind
	) {
		throw new Error(
			`lingOperation surface/lemma discriminator mismatch: expected ${surface.discriminators.lemmaKind}/${surface.discriminators.lemmaSubKind}, received ${lemmaDiscriminators.lemmaKind}/${lemmaDiscriminators.lemmaSubKind}`,
		);
	}
}
