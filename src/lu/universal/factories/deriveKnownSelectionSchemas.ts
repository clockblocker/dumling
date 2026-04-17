import z from "zod/v3";
import type {
	SelectionSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../registry-shapes";
import type { TargetLanguage } from "../enums/core/language";
import type { OrthographicStatus } from "../enums/core/selection";
import {
	type KnownSelectionSchemaFor,
	buildKnownSelectionSchema,
} from "./buildKnownSelection";

type KnownOrthographicStatus = Exclude<OrthographicStatus, "Unknown">;
type SurfaceSchemaPropKey = `${string}SurfaceSchema`;
type SurfaceSchemaTree = {
	[key: string]: z.ZodTypeAny | SurfaceSchemaTree;
};
type CachedKnownSelectionSchemas = Partial<
	Record<KnownOrthographicStatus, z.ZodTypeAny>
>;

type SelectionSchemaLanguageFor<
	LanguageLiteral extends TargetLanguage,
	Tree extends SurfaceSchemaLanguageShape,
> = {
	Standard: {
		[SK in keyof Tree]: {
			[LK in keyof Tree[SK]]: {
				[D in keyof Tree[SK][LK]]: KnownSelectionSchemaFor<
					LanguageLiteral,
					"Standard",
					Extract<Tree[SK][LK][D], z.ZodTypeAny>
				>;
			};
		};
	};
	Typo: {
		[SK in keyof Tree]: {
			[LK in keyof Tree[SK]]: {
				[D in keyof Tree[SK][LK]]: KnownSelectionSchemaFor<
					LanguageLiteral,
					"Typo",
					Extract<Tree[SK][LK][D], z.ZodTypeAny>
				>;
			};
		};
	};
};

type SelectionSchemaPropKeyFor<
	Key extends string,
	OrthographicStatusLiteral extends KnownOrthographicStatus,
> = Key extends `${infer Prefix}SurfaceSchema`
	? OrthographicStatusLiteral extends "Standard"
		? `${Prefix}SelectionSchema`
		: `Typo${Prefix}SelectionSchema`
	: never;

type KnownSelectionSchemaPropsFor<
	LanguageLiteral extends TargetLanguage,
	SurfaceSchemaProps extends Partial<Record<SurfaceSchemaPropKey, z.ZodTypeAny>>,
> = {
	[K in keyof SurfaceSchemaProps as K extends string
		? SelectionSchemaPropKeyFor<K, "Standard">
		: never]: KnownSelectionSchemaFor<
		LanguageLiteral,
		"Standard",
		Extract<SurfaceSchemaProps[K], z.ZodTypeAny>
	>;
} & {
	[K in keyof SurfaceSchemaProps as K extends string
		? SelectionSchemaPropKeyFor<K, "Typo">
		: never]: KnownSelectionSchemaFor<
		LanguageLiteral,
		"Typo",
		Extract<SurfaceSchemaProps[K], z.ZodTypeAny>
	>;
};

export function deriveKnownSelectionSchemaProps<
	LanguageLiteral extends TargetLanguage,
	SurfaceSchemaProps extends Partial<Record<SurfaceSchemaPropKey, z.ZodTypeAny>>,
>({
	language,
	surfaceSchemas,
}: {
	language: LanguageLiteral;
	surfaceSchemas: SurfaceSchemaProps;
}): KnownSelectionSchemaPropsFor<LanguageLiteral, SurfaceSchemaProps> {
	const derivedEntries = Object.entries(surfaceSchemas).flatMap(
		([surfaceSchemaKey, surfaceSchema]) => {
			const selectionSchemaKey = surfaceSchemaKey.replace(
				/SurfaceSchema$/,
				"SelectionSchema",
			);
			const typedSurfaceSchema = surfaceSchema as z.ZodTypeAny;

			return [
				[
					selectionSchemaKey,
					getDerivedKnownSelectionSchema({
						language,
						orthographicStatus: "Standard",
						surfaceSchema: typedSurfaceSchema,
					}),
				],
				[
					`Typo${selectionSchemaKey}`,
					getDerivedKnownSelectionSchema({
						language,
						orthographicStatus: "Typo",
						surfaceSchema: typedSurfaceSchema,
					}),
				],
			];
		},
	);

	return Object.fromEntries(
		derivedEntries,
	) as KnownSelectionSchemaPropsFor<LanguageLiteral, SurfaceSchemaProps>;
}

export function deriveSelectionSchemaLanguage<
	LanguageLiteral extends TargetLanguage,
	Tree extends SurfaceSchemaLanguageShape,
>({
	language,
	surfaceSchema,
}: {
	language: LanguageLiteral;
	surfaceSchema: Tree;
}): SelectionSchemaLanguageFor<LanguageLiteral, Tree> {
	const standard = deriveKnownSelectionSchemaTree({
		language,
		orthographicStatus: "Standard",
		surfaceSchema,
	}) as SelectionSchemaLanguageFor<LanguageLiteral, Tree>["Standard"];
	const typo = deriveKnownSelectionSchemaTree({
		language,
		orthographicStatus: "Typo",
		surfaceSchema,
	}) as SelectionSchemaLanguageFor<LanguageLiteral, Tree>["Typo"];
	const derived = {
		Standard: standard,
		Typo: typo,
	} satisfies SelectionSchemaLanguageShape;

	return derived as SelectionSchemaLanguageFor<LanguageLiteral, Tree>;
}

function deriveKnownSelectionSchemaTree<
	LanguageLiteral extends TargetLanguage,
	OrthographicStatusLiteral extends KnownOrthographicStatus,
	Tree extends SurfaceSchemaTree,
>({
	language,
	orthographicStatus,
	surfaceSchema,
}: {
	language: LanguageLiteral;
	orthographicStatus: OrthographicStatusLiteral;
	surfaceSchema: Tree;
}): SurfaceSchemaTree {
	const derivedEntries = Object.entries(surfaceSchema).map(([key, value]) => {
		if (isZodSchema(value)) {
			return [
				key,
				getDerivedKnownSelectionSchema({
					language,
					orthographicStatus,
					surfaceSchema: value,
				}),
			];
		}

		return [
			key,
			deriveKnownSelectionSchemaTree({
				language,
				orthographicStatus,
				surfaceSchema: value,
			}),
		];
	});

	return Object.fromEntries(derivedEntries);
}

function isZodSchema(value: unknown): value is z.ZodTypeAny {
	return value instanceof z.ZodType;
}

const knownSelectionSchemaCache = new WeakMap<
	z.ZodTypeAny,
	CachedKnownSelectionSchemas
>();

function getDerivedKnownSelectionSchema<
	LanguageLiteral extends TargetLanguage,
	OrthographicStatusLiteral extends KnownOrthographicStatus,
	SurfaceSchema extends z.ZodTypeAny,
>({
	language,
	orthographicStatus,
	surfaceSchema,
}: {
	language: LanguageLiteral;
	orthographicStatus: OrthographicStatusLiteral;
	surfaceSchema: SurfaceSchema;
}): KnownSelectionSchemaFor<
	LanguageLiteral,
	OrthographicStatusLiteral,
	SurfaceSchema
> {
	const cachedSchemas =
		knownSelectionSchemaCache.get(surfaceSchema) ?? {};
	const cachedSchema = cachedSchemas[orthographicStatus];

	if (cachedSchema !== undefined) {
		return cachedSchema as KnownSelectionSchemaFor<
			LanguageLiteral,
			OrthographicStatusLiteral,
			SurfaceSchema
		>;
	}

	const derivedSchema = buildKnownSelectionSchema({
		orthographicStatus,
		surface: {
			language,
			schema: surfaceSchema,
		},
	});

	cachedSchemas[orthographicStatus] = derivedSchema;
	knownSelectionSchemaCache.set(surfaceSchema, cachedSchemas);

	return derivedSchema as KnownSelectionSchemaFor<
		LanguageLiteral,
		OrthographicStatusLiteral,
		SurfaceSchema
	>;
}
