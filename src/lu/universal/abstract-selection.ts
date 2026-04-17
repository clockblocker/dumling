import type { Prettify } from "../../types/helpers";
import type { AbstractLemma } from "./abstract-lemma";
import type { TargetLanguage } from "./enums/core/language";
import type {
	LemmaKind,
	OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
	SurfaceKind,
} from "./enums/core/selection";
import type { AbstractFeatures } from "./enums/feature";
import type { LemmaDiscriminatorFor } from "./lemma-discriminator";

type AbstractSurfaceFor<
	SK extends SurfaceKind = SurfaceKind,
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = SK extends SurfaceKind
	? Prettify<
			SurfaceBaseFor<SK, LK, D> & {
				lemma: AbstractLemma<LK, D>;
			}
		>
	: never;

export type AbstractSelectionFor<
	OS extends OrthographicStatus = OrthographicStatus,
	SK extends SurfaceKind = SurfaceKind,
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = OS extends "Unknown"
	? {
			language: TargetLanguage;
			orthographicStatus: OS;
			spelledSelection: string;
		}
	: OS extends "Standard"
		? Prettify<
				KnownSelectionBaseFor<OS, SK, LK, D> &
					(
						| {
								selectionCoverage: "Full";
						  }
						| {
								selectionCoverage: "Partial";
						  }
					)
			>
		: OS extends "Typo"
			? Prettify<
					KnownSelectionBaseFor<OS, SK, LK, D> & {
						selectionCoverage: SelectionCoverage;
					}
				>
			: never;

type DiscriminatorsFor<
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = Prettify<{
	lemmaKind: LK;
	lemmaSubKind: D;
}>;

type SurfaceFieldsFor<SK extends SurfaceKind> = SK extends "Inflection"
	? { inflectionalFeatures: Partial<AbstractFeatures> }
	: Record<never, never>;

type KnownSelectionBaseFor<
	OS extends Exclude<OrthographicStatus, "Unknown">,
	SK extends SurfaceKind = SurfaceKind,
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = {
	language: TargetLanguage;
	orthographicStatus: OS;
	spellingRelation?: SpellingRelation;
	spelledSelection: string;
	surface: SurfaceFor<SK, LK, D>;
};

type SurfaceBaseFor<
	SK extends SurfaceKind = SurfaceKind,
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = Prettify<
	{
		language: TargetLanguage;
		surfaceKind: SK;
		normalizedFullSurface: string;
	} & SurfaceFieldsFor<SK> & {
			discriminators: DiscriminatorsFor<LK, D>;
		}
>;

type SurfaceFor<
	SK extends SurfaceKind = SurfaceKind,
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = SK extends SurfaceKind
	? Prettify<
			{
				lemma: AbstractLemma<LK, D>;
			} & SurfaceBaseFor<SK, LK, D>
		>
	: never;
