import z from "zod/v3";
import type {
	DeprecatedSelectionSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../registry-shapes";
import type { DeprecatedTargetLanguage } from "../enums/core/language";
import type { DeprecatedOrthographicStatus } from "../enums/core/selection";
import {
	type DeprecatedKnownSelectionSchemaFor,
	deprecatedBuildKnownSelectionSchema,
} from "./buildKnownSelection";

type KnownOrthographicStatus = Exclude<DeprecatedOrthographicStatus, "Unknown">;
type SurfaceSchemaPropKey = `${string}SurfaceSchema`;
type SurfaceSchemaTree = {
	[key: string]: z.ZodTypeAny | SurfaceSchemaTree;
};
type CachedKnownSelectionSchemas = Partial<
	Record<KnownOrthographicStatus, z.ZodTypeAny>
>;

type SelectionSchemaLanguageFor<
	LanguageLiteral extends DeprecatedTargetLanguage,
	Tree extends DeprecatedSurfaceSchemaLanguageShape,
> = {
	Standard: {
		[SK in keyof Tree]: {
			[LK in keyof Tree[SK]]: {
				[D in keyof Tree[SK][LK]]: DeprecatedKnownSelectionSchemaFor<
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
				[D in keyof Tree[SK][LK]]: DeprecatedKnownSelectionSchemaFor<
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
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchemaProps extends Partial<Record<SurfaceSchemaPropKey, z.ZodTypeAny>>,
> = {
	[K in keyof SurfaceSchemaProps as K extends string
		? SelectionSchemaPropKeyFor<K, "Standard">
		: never]: DeprecatedKnownSelectionSchemaFor<
		LanguageLiteral,
		"Standard",
		Extract<SurfaceSchemaProps[K], z.ZodTypeAny>
	>;
} & {
	[K in keyof SurfaceSchemaProps as K extends string
		? SelectionSchemaPropKeyFor<K, "Typo">
		: never]: DeprecatedKnownSelectionSchemaFor<
		LanguageLiteral,
		"Typo",
		Extract<SurfaceSchemaProps[K], z.ZodTypeAny>
	>;
};

export function deprecatedDeriveKnownSelectionSchemaProps<
	LanguageLiteral extends DeprecatedTargetLanguage,
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

export function deprecatedDeriveSelectionSchemaLanguage<
	LanguageLiteral extends DeprecatedTargetLanguage,
	Tree extends DeprecatedSurfaceSchemaLanguageShape,
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
	} satisfies DeprecatedSelectionSchemaLanguageShape;

	return derived as SelectionSchemaLanguageFor<LanguageLiteral, Tree>;
}

function deriveKnownSelectionSchemaTree<
	LanguageLiteral extends DeprecatedTargetLanguage,
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
	LanguageLiteral extends DeprecatedTargetLanguage,
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
}): DeprecatedKnownSelectionSchemaFor<
	LanguageLiteral,
	OrthographicStatusLiteral,
	SurfaceSchema
> {
	const cachedSchemas =
		knownSelectionSchemaCache.get(surfaceSchema) ?? {};
	const cachedSchema = cachedSchemas[orthographicStatus];

	if (cachedSchema !== undefined) {
		return cachedSchema as DeprecatedKnownSelectionSchemaFor<
			LanguageLiteral,
			OrthographicStatusLiteral,
			SurfaceSchema
		>;
	}

	const derivedSchema = deprecatedBuildKnownSelectionSchema({
		orthographicStatus,
		surface: {
			language,
			schema: surfaceSchema,
		},
	});

	cachedSchemas[orthographicStatus] = derivedSchema;
	knownSelectionSchemaCache.set(surfaceSchema, cachedSchemas);

	return derivedSchema as DeprecatedKnownSelectionSchemaFor<
		LanguageLiteral,
		OrthographicStatusLiteral,
		SurfaceSchema
	>;
}
