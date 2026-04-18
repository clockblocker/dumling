import type { DeprecatedPrettify } from "../../types/helpers";
import type { DeprecatedAbstractLemma } from "./abstract-lemma";
import type { DeprecatedTargetLanguage } from "./enums/core/language";
import type {
	DeprecatedLemmaKind,
	DeprecatedOrthographicStatus,
	DeprecatedSelectionCoverage,
	DeprecatedSpellingRelation,
	DeprecatedSurfaceKind,
} from "./enums/core/selection";
import type { DeprecatedAbstractFeatures } from "./enums/feature";
import type { DeprecatedLemmaDiscriminatorFor } from "./lemma-discriminator";

export type DeprecatedAbstractSelectionFor<
	OS extends Exclude<DeprecatedOrthographicStatus, "Unknown"> = Exclude<
		DeprecatedOrthographicStatus,
		"Unknown"
	>,
	SK extends DeprecatedSurfaceKind = DeprecatedSurfaceKind,
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = OS extends "Standard"
	? DeprecatedPrettify<
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
		? DeprecatedPrettify<
				HydratedSelectionBaseFor<OS, SK, LK, D> & {
					selectionCoverage: DeprecatedSelectionCoverage;
				}
			>
		: never;

export type DeprecatedAbstractObservedSelectionFor = {
	language: DeprecatedTargetLanguage;
	orthographicStatus: "Unknown";
	spelledSelection: string;
};

type SurfaceFieldsFor<SK extends DeprecatedSurfaceKind> = SK extends "Inflection"
	? { inflectionalFeatures: Partial<DeprecatedAbstractFeatures> }
	: Record<never, never>;

type HydratedSelectionBaseFor<
	OS extends Exclude<DeprecatedOrthographicStatus, "Unknown">,
	SK extends DeprecatedSurfaceKind = DeprecatedSurfaceKind,
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = {
	language: DeprecatedTargetLanguage;
	orthographicStatus: OS;
	spellingRelation: DeprecatedSpellingRelation;
	spelledSelection: string;
	surface: SurfaceFor<SK, LK, D>;
};

type SurfaceBaseFor<
	SK extends DeprecatedSurfaceKind = DeprecatedSurfaceKind,
> = DeprecatedPrettify<
	{
		language: DeprecatedTargetLanguage;
		surfaceKind: SK;
		normalizedFullSurface: string;
	} & SurfaceFieldsFor<SK>
>;

type SurfaceFor<
	SK extends DeprecatedSurfaceKind = DeprecatedSurfaceKind,
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = SK extends DeprecatedSurfaceKind
	? DeprecatedPrettify<
			{
				lemma: DeprecatedAbstractLemma<LK, D>;
			} & SurfaceBaseFor<SK>
		>
	: never;
