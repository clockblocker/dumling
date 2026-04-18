import z from "zod/v3";
import type { DeprecatedTargetLanguage } from "../enums/core/language";
import {
	type DeprecatedOrthographicStatus,
	DeprecatedSelectionCoverage,
	DeprecatedSpellingRelation,
} from "../enums/core/selection";

export type DeprecatedKnownSelectionValueFor<
	LanguageLiteral extends DeprecatedTargetLanguage,
	OrthographicStatusLiteral extends KnownOrthographicStatus,
	SurfaceSchema extends z.ZodTypeAny,
> = OrthographicStatusLiteral extends "Standard"
	? StandardSelectionValueFor<LanguageLiteral, SurfaceSchema>
	: TypoSelectionValueFor<LanguageLiteral, SurfaceSchema>;

export type DeprecatedKnownSelectionSchemaFor<
	LanguageLiteral extends DeprecatedTargetLanguage,
	OrthographicStatusLiteral extends KnownOrthographicStatus,
	SurfaceSchema extends z.ZodTypeAny,
> = Omit<z.ZodTypeAny, "_input" | "_output"> & {
	_input: unknown;
	_output: DeprecatedKnownSelectionValueFor<
		LanguageLiteral,
		OrthographicStatusLiteral,
		SurfaceSchema
	>;
	shape: SelectionShapeFor<
		LanguageLiteral,
		OrthographicStatusLiteral,
		SurfaceSchema
	>;
};

export function deprecatedBuildKnownSelectionSchema<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
>(args: {
	orthographicStatus: KnownOrthographicStatus;
	spellingRelation?: z.infer<typeof DeprecatedSpellingRelation>;
	surface: {
		language: LanguageLiteral;
		schema: SurfaceSchema;
	};
}):
	| DeprecatedKnownSelectionSchemaFor<LanguageLiteral, "Standard", SurfaceSchema>
	| DeprecatedKnownSelectionSchemaFor<LanguageLiteral, "Typo", SurfaceSchema>;

export function deprecatedBuildKnownSelectionSchema<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
>(args: {
	orthographicStatus: "Standard";
	spellingRelation?: z.infer<typeof DeprecatedSpellingRelation>;
	surface: {
		language: LanguageLiteral;
		schema: SurfaceSchema;
	};
}): DeprecatedKnownSelectionSchemaFor<LanguageLiteral, "Standard", SurfaceSchema>;

export function deprecatedBuildKnownSelectionSchema<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
>(args: {
	orthographicStatus: "Typo";
	spellingRelation?: z.infer<typeof DeprecatedSpellingRelation>;
	surface: {
		language: LanguageLiteral;
		schema: SurfaceSchema;
	};
}): DeprecatedKnownSelectionSchemaFor<LanguageLiteral, "Typo", SurfaceSchema>;

export function deprecatedBuildKnownSelectionSchema<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
>({
	orthographicStatus,
	spellingRelation,
	surface,
}: {
	orthographicStatus: KnownOrthographicStatus;
	spellingRelation?: z.infer<typeof DeprecatedSpellingRelation>;
	surface: {
		language: LanguageLiteral;
		schema: SurfaceSchema;
	};
}) {
	const { language, schema: surfaceSchema } = surface;

	if (orthographicStatus === "Standard") {
		return buildStandardKnownSelectionSchema({
			language,
			spellingRelation,
			surfaceSchema,
		});
	}

	return buildTypoKnownSelectionSchema({
		language,
		spellingRelation,
		surfaceSchema,
	});
}

type KnownOrthographicStatus = Exclude<DeprecatedOrthographicStatus, "Unknown">;

type SelectionShapeFor<
	LanguageLiteral extends DeprecatedTargetLanguage,
	OrthographicStatusLiteral extends KnownOrthographicStatus,
	SurfaceSchema extends z.ZodTypeAny,
> = {
	language: z.ZodLiteral<LanguageLiteral>;
	orthographicStatus: z.ZodLiteral<OrthographicStatusLiteral>;
	spellingRelation: z.ZodType<z.infer<typeof DeprecatedSpellingRelation>>;
	spelledSelection: z.ZodString;
	selectionCoverage: typeof DeprecatedSelectionCoverage;
	surface: SurfaceSchema;
};

type StandardSelectionValueFor<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
> =
	| {
			language: LanguageLiteral;
			orthographicStatus: "Standard";
			spellingRelation: z.infer<typeof DeprecatedSpellingRelation>;
			selectionCoverage: "Full";
			spelledSelection: string;
			surface: z.infer<SurfaceSchema>;
	  }
	| {
			language: LanguageLiteral;
			orthographicStatus: "Standard";
			spellingRelation: z.infer<typeof DeprecatedSpellingRelation>;
			selectionCoverage: "Partial";
			spelledSelection: string;
			surface: z.infer<SurfaceSchema>;
	  };

type TypoSelectionValueFor<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
> = {
	language: LanguageLiteral;
	orthographicStatus: "Typo";
	spellingRelation: z.infer<typeof DeprecatedSpellingRelation>;
	selectionCoverage: z.infer<typeof DeprecatedSelectionCoverage>;
	spelledSelection: string;
	surface: z.infer<SurfaceSchema>;
};

function buildStandardKnownSelectionSchema<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
>({
	language,
	spellingRelation,
	surfaceSchema,
}: {
	language: LanguageLiteral;
	spellingRelation?: z.infer<typeof DeprecatedSpellingRelation>;
	surfaceSchema: SurfaceSchema;
}): DeprecatedKnownSelectionSchemaFor<LanguageLiteral, "Standard", SurfaceSchema> {
	const spellingRelationSchema =
		spellingRelation === undefined
			? DeprecatedSpellingRelation
			: z.literal(spellingRelation);
	const sharedShape = {
		language: z.literal(language),
		orthographicStatus: z.literal("Standard"),
		spelledSelection: z.string(),
		spellingRelation: spellingRelationSchema,
		surface: surfaceSchema,
	};

	const fullSchema = z
		.object({
			...sharedShape,
			selectionCoverage: z.literal("Full"),
		})
		.strict();
	const partialSchema = z
		.object({
			...sharedShape,
			selectionCoverage: z.literal("Partial"),
		})
		.strict();

	return withShape(z.union([fullSchema, partialSchema]), {
		...sharedShape,
		selectionCoverage: DeprecatedSelectionCoverage,
	}) as unknown as DeprecatedKnownSelectionSchemaFor<
		LanguageLiteral,
		"Standard",
		SurfaceSchema
	>;
}

function buildTypoKnownSelectionSchema<
	LanguageLiteral extends DeprecatedTargetLanguage,
	SurfaceSchema extends z.ZodTypeAny,
>({
	language,
	spellingRelation,
	surfaceSchema,
}: {
	language: LanguageLiteral;
	spellingRelation?: z.infer<typeof DeprecatedSpellingRelation>;
	surfaceSchema: SurfaceSchema;
}): DeprecatedKnownSelectionSchemaFor<LanguageLiteral, "Typo", SurfaceSchema> {
	const spellingRelationSchema =
		spellingRelation === undefined
			? DeprecatedSpellingRelation
			: z.literal(spellingRelation);
	return z
		.object({
			language: z.literal(language),
			orthographicStatus: z.literal("Typo"),
			selectionCoverage: DeprecatedSelectionCoverage,
			spelledSelection: z.string(),
			spellingRelation: spellingRelationSchema,
			surface: surfaceSchema,
		})
		.strict() as unknown as DeprecatedKnownSelectionSchemaFor<
		LanguageLiteral,
		"Typo",
		SurfaceSchema
	>;
}

function withShape<
	Schema extends z.ZodTypeAny,
	Shape extends Record<string, z.ZodTypeAny>,
>(schema: Schema, shape: Shape): Schema & { shape: Shape } {
	Object.defineProperty(schema, "shape", {
		configurable: true,
		value: shape,
	});

	return schema as Schema & { shape: Shape };
}
