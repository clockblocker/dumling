import { z } from "zod/v3";

import {
	OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
} from "../core/enums";
import type { SurfaceKind } from "../core/enums";
import {
	UniversalLanguage,
	type UniversalLemmaKind,
	type UniversalLemmaSubKindFor,
} from "./ontology";
import { type UniversalSurface, UniversalSurfaceSchema } from "./surface";

export type UniversalSelection<
	OS extends OrthographicStatus = OrthographicStatus,
	SK extends SurfaceKind = SurfaceKind,
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = {
	language: "Universal";
	orthographicStatus: OS;
	selectionCoverage: SelectionCoverage;
	spelledSelection: string;
	spellingRelation: SpellingRelation;
	surface: UniversalSurface<SK, LK, LSK>;
};

export const UniversalSelectionSchema = z.object({
	language: UniversalLanguage,
	orthographicStatus: OrthographicStatus,
	selectionCoverage: SelectionCoverage,
	spelledSelection: z.string().min(1),
	spellingRelation: SpellingRelation,
	surface: UniversalSurfaceSchema,
});
