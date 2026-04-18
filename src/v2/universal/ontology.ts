import { z } from "zod/v3";

import { LexemeSubKind, MorphemeSubKind, PhrasemeSubKind } from "../core/enums";
import type {
	LemmaKind,
	LemmaSubKind,
	OrthographicStatus,
	SurfaceKind,
} from "../core/enums";
import {
	UniversalCustomFeatureName,
	UniversalCustomFeatureSchemaByName,
	type UniversalCustomFeatureValue,
	type UniversalCustomFeatures,
} from "./features/custom/core";
import {
	UniversalUdFeatureName,
	UniversalUdFeatureSchemaByName,
	type UniversalUdFeatureValue,
	type UniversalUdFeatures,
} from "./features/ud/core";

export const UniversalLanguage = z.literal("Universal");
export type UniversalLanguage = z.infer<typeof UniversalLanguage>;

export type UniversalLemmaKind = LemmaKind;
export type UniversalLexemeSubKind = z.infer<typeof LexemeSubKind>;
export type UniversalPhrasemeSubKind = z.infer<typeof PhrasemeSubKind>;
export type UniversalMorphemeSubKind = z.infer<typeof MorphemeSubKind>;
export type UniversalLemmaSubKind = LemmaSubKind;

export const UniversalLemmaSubKindSchemaByKind = {
	Lexeme: LexemeSubKind,
	Phraseme: PhrasemeSubKind,
	Morpheme: MorphemeSubKind,
} as const;

export type UniversalLemmaSubKindFor<LK extends UniversalLemmaKind> =
	LK extends "Lexeme"
		? UniversalLexemeSubKind
		: LK extends "Phraseme"
			? UniversalPhrasemeSubKind
			: LK extends "Morpheme"
				? UniversalMorphemeSubKind
				: never;

export const MeaningInEmojis = z.string().min(1);
export type MeaningInEmojis = z.infer<typeof MeaningInEmojis>;

const universalFeatureNameValues = [
	...UniversalUdFeatureName.options,
	...UniversalCustomFeatureName.options,
] as const;

export const UniversalFeatureName = z.enum(universalFeatureNameValues);
export type UniversalFeatureName = z.infer<typeof UniversalFeatureName>;

export const UniversalFeatureSchemaByName = {
	...UniversalUdFeatureSchemaByName,
	...UniversalCustomFeatureSchemaByName,
} as const;

const makeOptionalShape = <T extends Record<string, z.ZodTypeAny>>(
	schemas: T,
) =>
	Object.fromEntries(
		Object.entries(schemas).map(([name, schema]) => [
			name,
			schema.optional(),
		]),
	) as {
		[K in keyof T]: z.ZodOptional<T[K]>;
	};

export const UniversalFeatureBagSchema = z.object(
	makeOptionalShape(UniversalFeatureSchemaByName),
);

export type UniversalFeatureValue<
	F extends UniversalFeatureName = UniversalFeatureName,
> = F extends z.infer<typeof UniversalUdFeatureName>
	? UniversalUdFeatureValue<F>
	: F extends z.infer<typeof UniversalCustomFeatureName>
		? UniversalCustomFeatureValue<F>
		: never;

export type UniversalFeatures = UniversalUdFeatures & UniversalCustomFeatures;

export type UniversalLemmaDescriptor<
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = {
	language: "Universal";
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

export type UniversalSurfaceDescriptor<
	SK extends SurfaceKind = SurfaceKind,
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = {
	language: "Universal";
	surfaceKind: SK;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};

export type UniversalSelectionDescriptor<
	OS extends OrthographicStatus = OrthographicStatus,
	SK extends SurfaceKind = SurfaceKind,
	LK extends UniversalLemmaKind = UniversalLemmaKind,
	LSK extends UniversalLemmaSubKindFor<LK> = UniversalLemmaSubKindFor<LK>,
> = {
	language: "Universal";
	orthographicStatus: OS;
	surfaceKind: SK;
	lemmaKind: LK;
	lemmaSubKind: LSK;
};
