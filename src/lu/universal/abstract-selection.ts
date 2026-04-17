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
	OS extends Exclude<OrthographicStatus, "Unknown"> = Exclude<
		OrthographicStatus,
		"Unknown"
	>,
	SK extends SurfaceKind = SurfaceKind,
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = OS extends "Standard"
	? Prettify<
			HydratedSelectionBaseFor<OS, SK, LK, D> &
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
				HydratedSelectionBaseFor<OS, SK, LK, D> & {
					selectionCoverage: SelectionCoverage;
				}
			>
		: never;

export type AbstractObservedSelectionFor = {
	language: TargetLanguage;
	orthographicStatus: "Unknown";
	spelledSelection: string;
};

type SurfaceFieldsFor<SK extends SurfaceKind> = SK extends "Inflection"
	? { inflectionalFeatures: Partial<AbstractFeatures> }
	: Record<never, never>;

type HydratedSelectionBaseFor<
	OS extends Exclude<OrthographicStatus, "Unknown">,
	SK extends SurfaceKind = SurfaceKind,
	LK extends LemmaKind = LemmaKind,
	D extends LemmaDiscriminatorFor<LK> = LemmaDiscriminatorFor<LK>,
> = {
	language: TargetLanguage;
	orthographicStatus: OS;
	spellingRelation: SpellingRelation;
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
	} & SurfaceFieldsFor<SK>
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
