import { z } from "zod/v3";

import type { SurfaceKind } from "../core/enums";
import { type UniversalLemma, UniversalLemmaSchema } from "./lemma";
import {
	UniversalFeatureBagSchema,
	type UniversalFeatures,
	UniversalLanguage,
	type UniversalLemmaKind,
	type UniversalLemmaSubKindFor,
} from "./ontology";

export type UniversalInflectionalFeaturesFor<
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = UniversalFeatures;

export type UniversalSurfacePayloadFor<
	SK extends SurfaceKind,
	LK extends UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK>,
> = SK extends "Lemma"
	? Record<never, never>
	: SK extends "Inflection"
		? {
				inflectionalFeatures: UniversalInflectionalFeaturesFor<LK, LSK>;
			}
		: never;

export type UniversalSurface<
	SK extends SurfaceKind = SurfaceKind,
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = {
	language: "Universal";
	normalizedFullSurface: string;
	surfaceKind: SK;
	lemma: UniversalLemma<LK, LSK>;
} & UniversalSurfacePayloadFor<SK, LK, LSK>;

const universalSurfaceBaseShape = {
	language: UniversalLanguage,
	normalizedFullSurface: z.string().min(1),
	lemma: UniversalLemmaSchema,
} as const;

export const UniversalLemmaSurfaceSchema = z.object({
	...universalSurfaceBaseShape,
	surfaceKind: z.literal("Lemma"),
});

export const UniversalInflectionSurfaceSchema = z.object({
	...universalSurfaceBaseShape,
	surfaceKind: z.literal("Inflection"),
	inflectionalFeatures: UniversalFeatureBagSchema,
});

export const UniversalSurfaceSchema = z.discriminatedUnion("surfaceKind", [
	UniversalLemmaSurfaceSchema,
	UniversalInflectionSurfaceSchema,
]);
