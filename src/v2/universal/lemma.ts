import { z } from "zod/v3";

import { LemmaKind, LemmaSubKind } from "../core/enums";
import {
	MeaningInEmojis,
	UniversalFeatureBagSchema,
	type UniversalFeatures,
	UniversalLanguage,
	type UniversalLemmaKind,
	type UniversalLemmaSubKindFor,
} from "./ontology";

export type UniversalInherentFeaturesFor<
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = UniversalFeatures;

export type UniversalLemma<
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = {
	language: "Universal";
	canonicalLemma: string;
	lemmaKind: LK;
	lemmaSubKind: LSK;
	inherentFeatures: UniversalInherentFeaturesFor<LK, LSK>;
	meaningInEmojis: string;
};

export const UniversalLemmaSchema = z.object({
	language: UniversalLanguage,
	canonicalLemma: z.string().min(1),
	lemmaKind: LemmaKind,
	lemmaSubKind: LemmaSubKind,
	inherentFeatures: UniversalFeatureBagSchema,
	meaningInEmojis: MeaningInEmojis,
});
