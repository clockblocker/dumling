import { z } from "zod/v3";
import {
	OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
} from "../types/core/enums";
import type { DeLeafDefinition } from "./de-config";
import {
	abstractFeatureSchemas,
	type FeatureSchemaMap,
	featureValueSet,
} from "./feature-schemas";

type SchemaTreeLeaf = () => z.ZodTypeAny;
type NestedRecord = Record<string, unknown>;

function normalizeText(value: string) {
	return value.normalize("NFC");
}

function normalizeLowercaseText(value: string) {
	return normalizeText(value).toLowerCase();
}

function normalizedStringSchema(lowercase: boolean) {
	return z
		.string()
		.min(1)
		.transform((value) =>
			lowercase ? normalizeLowercaseText(value) : normalizeText(value),
		);
}

function featureObjectSchema(
	shape: FeatureSchemaMap,
	options: { requireNonEmpty?: boolean; allowAbstractFallback?: boolean } = {},
) {
	const effectiveShape =
		Object.keys(shape).length > 0
			? shape
			: options.allowAbstractFallback
				? abstractFeatureSchemas
				: {};
	const optionalShape = Object.fromEntries(
		Object.entries(effectiveShape).map(([name, schema]) => [
			name,
			schema.optional(),
		]),
	);

	const schema = z.object(optionalShape).strip();

	if (!options.requireNonEmpty) {
		return schema;
	}

	return schema.superRefine((value, ctx) => {
		if (Object.keys(value).length === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "inflectionalFeatures must not be empty",
			});
		}
	});
}

export function buildLemmaSchema(
	languageSchema: z.ZodTypeAny,
	definition: DeLeafDefinition,
	options: { abstract?: boolean } = {},
) {
	return z
		.object({
			language: languageSchema,
			canonicalLemma: normalizedStringSchema(true),
			lemmaKind: z.literal(definition.lemmaKind),
			lemmaSubKind: z.literal(definition.lemmaSubKind),
			inherentFeatures: featureObjectSchema(definition.inherentFeatures, {
				allowAbstractFallback: options.abstract,
			}),
			meaningInEmojis: normalizedStringSchema(false),
		})
		.strict();
}

export function buildSurfaceSchema(
	languageSchema: z.ZodTypeAny,
	definition: DeLeafDefinition,
	lemmaSchema: z.ZodTypeAny,
	surfaceKind: "Lemma" | "Inflection",
	options: { abstract?: boolean } = {},
) {
	return z
		.object({
			language: languageSchema,
			normalizedFullSurface: normalizedStringSchema(true),
			surfaceKind: z.literal(surfaceKind),
			lemma: lemmaSchema,
			...(surfaceKind === "Inflection"
				? {
						inflectionalFeatures: featureObjectSchema(
							definition.inflectionalFeatures ?? {},
							{
								allowAbstractFallback: options.abstract,
								requireNonEmpty: true,
							},
						),
					}
				: {}),
		})
		.strict();
}

export function buildSelectionSchema(
	languageSchema: z.ZodTypeAny,
	surfaceSchema: z.ZodTypeAny,
	orthographicStatus: z.infer<typeof OrthographicStatus>,
) {
	return z
		.object({
			language: languageSchema,
			orthographicStatus: z.literal(orthographicStatus),
			selectionCoverage: SelectionCoverage,
			spelledSelection: normalizedStringSchema(false),
			spellingRelation: SpellingRelation,
			surface: surfaceSchema,
		})
		.strict();
}

function emptyTree() {
	return Object.create(null) as NestedRecord;
}

export function buildLanguageSchemaTree(
	definitions: Record<string, Record<string, DeLeafDefinition>>,
	options: { languageSchema: z.ZodTypeAny; abstract?: boolean },
) {
	const lemmaTree = emptyTree();
	const lemmaSurfaceTree = emptyTree();
	const inflectionSurfaceTree = emptyTree();
	const standardLemmaSelectionTree = emptyTree();
	const typoLemmaSelectionTree = emptyTree();
	const standardInflectionSelectionTree = emptyTree();
	const typoInflectionSelectionTree = emptyTree();

	const lemmaSchemas: z.ZodTypeAny[] = [];
	const surfaceSchemas: z.ZodTypeAny[] = [];
	const selectionSchemas: z.ZodTypeAny[] = [];

	function unionize(schemas: z.ZodTypeAny[]) {
		if (schemas.length === 1) {
			return schemas[0] as z.ZodTypeAny;
		}

		return z.union(schemas as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]);
	}

	for (const [lemmaKind, subKinds] of Object.entries(definitions)) {
		const lemmaKindKey = lemmaKind.toLowerCase();
		lemmaTree[lemmaKindKey] = emptyTree();
		lemmaSurfaceTree[lemmaKindKey] = emptyTree();
		standardLemmaSelectionTree[lemmaKindKey] = emptyTree();
		typoLemmaSelectionTree[lemmaKindKey] = emptyTree();

		for (const [lemmaSubKind, definition] of Object.entries(subKinds)) {
			const lemmaSubKindKey = lemmaSubKind.toLowerCase();
			const lemmaSchema = buildLemmaSchema(
				options.languageSchema,
				definition,
				{ abstract: options.abstract },
			);
			const lemmaSurfaceSchema = buildSurfaceSchema(
				options.languageSchema,
				definition,
				lemmaSchema,
				"Lemma",
				{ abstract: options.abstract },
			);
			const standardLemmaSelectionSchema = buildSelectionSchema(
				options.languageSchema,
				lemmaSurfaceSchema,
				"Standard",
			);
			const typoLemmaSelectionSchema = buildSelectionSchema(
				options.languageSchema,
				lemmaSurfaceSchema,
				"Typo",
			);

			(lemmaTree[lemmaKindKey] as NestedRecord)[lemmaSubKindKey] = () =>
				lemmaSchema;
			(lemmaSurfaceTree[lemmaKindKey] as NestedRecord)[lemmaSubKindKey] = () =>
				lemmaSurfaceSchema;
			(
				standardLemmaSelectionTree[lemmaKindKey] as NestedRecord
			)[lemmaSubKindKey] = () => standardLemmaSelectionSchema;
			(typoLemmaSelectionTree[lemmaKindKey] as NestedRecord)[lemmaSubKindKey] = () =>
				typoLemmaSelectionSchema;

			lemmaSchemas.push(lemmaSchema);
			surfaceSchemas.push(lemmaSurfaceSchema);
			selectionSchemas.push(standardLemmaSelectionSchema, typoLemmaSelectionSchema);

			if (definition.inflectionalFeatures === undefined) {
				continue;
			}

			if (inflectionSurfaceTree[lemmaKindKey] === undefined) {
				inflectionSurfaceTree[lemmaKindKey] = emptyTree();
				standardInflectionSelectionTree[lemmaKindKey] = emptyTree();
				typoInflectionSelectionTree[lemmaKindKey] = emptyTree();
			}

			const inflectionSurfaceSchema = buildSurfaceSchema(
				options.languageSchema,
				definition,
				lemmaSchema,
				"Inflection",
				{ abstract: options.abstract },
			);
			const standardInflectionSelectionSchema = buildSelectionSchema(
				options.languageSchema,
				inflectionSurfaceSchema,
				"Standard",
			);
			const typoInflectionSelectionSchema = buildSelectionSchema(
				options.languageSchema,
				inflectionSurfaceSchema,
				"Typo",
			);

			(inflectionSurfaceTree[lemmaKindKey] as NestedRecord)[lemmaSubKindKey] =
				() => inflectionSurfaceSchema;
			(
				standardInflectionSelectionTree[lemmaKindKey] as NestedRecord
			)[lemmaSubKindKey] = () => standardInflectionSelectionSchema;
			(
				typoInflectionSelectionTree[lemmaKindKey] as NestedRecord
			)[lemmaSubKindKey] = () => typoInflectionSelectionSchema;

			surfaceSchemas.push(inflectionSurfaceSchema);
			selectionSchemas.push(
				standardInflectionSelectionSchema,
				typoInflectionSelectionSchema,
			);
		}
	}

	return {
		schema: {
			lemma: lemmaTree,
			surface: {
				lemma: lemmaSurfaceTree,
				...(Object.keys(inflectionSurfaceTree).length > 0
					? { inflection: inflectionSurfaceTree }
					: {}),
			},
			selection: {
				standard: {
					lemma: standardLemmaSelectionTree,
					...(Object.keys(standardInflectionSelectionTree).length > 0
						? { inflection: standardInflectionSelectionTree }
						: {}),
				},
				typo: {
					lemma: typoLemmaSelectionTree,
					...(Object.keys(typoInflectionSelectionTree).length > 0
						? { inflection: typoInflectionSelectionTree }
						: {}),
				},
			},
		},
		unions: {
			lemma: unionize(lemmaSchemas),
			surface: unionize(surfaceSchemas),
			selection: unionize(selectionSchemas),
		},
	};
}
