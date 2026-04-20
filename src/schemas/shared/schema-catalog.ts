import { z } from "zod/v3";
import { buildUnionSchema } from "./builders";

type SchemaOutput<TSchema extends z.ZodTypeAny> = z.output<TSchema>;
type SchemaLeaf = () => z.ZodTypeAny;

export type SchemaCatalogBundle = {
	lemma: SchemaLeaf;
	lemmaSchema: z.ZodTypeAny;
	lemmaSurfaceSchema: z.ZodTypeAny;
	selection: {
		standard: {
			lemma: SchemaLeaf;
			inflection?: SchemaLeaf;
		};
		typo: {
			lemma: SchemaLeaf;
			inflection?: SchemaLeaf;
		};
	};
	surface: {
		lemma: SchemaLeaf;
		inflection?: SchemaLeaf;
	};
};

export type InflectableSchemaCatalogBundle = SchemaCatalogBundle & {
	inflectionSurfaceSchema: z.ZodTypeAny;
	selection: {
		standard: {
			inflection: SchemaLeaf;
			lemma: SchemaLeaf;
		};
		typo: {
			inflection: SchemaLeaf;
			lemma: SchemaLeaf;
		};
	};
	surface: {
		inflection: SchemaLeaf;
		lemma: SchemaLeaf;
	};
};

type BaseSchemaCatalogEntry<TSubKind extends string> = {
	key: Lowercase<TSubKind>;
	lemmaSubKind: TSubKind;
};

type InflectableSchemaCatalogEntry<TSubKind extends string> =
	BaseSchemaCatalogEntry<TSubKind> & {
		bundle: InflectableSchemaCatalogBundle;
		hasInflection: true;
	};

type UninflectableSchemaCatalogEntry<TSubKind extends string> =
	BaseSchemaCatalogEntry<TSubKind> & {
		bundle: SchemaCatalogBundle;
		hasInflection: false;
	};

export type SchemaCatalogEntry<TSubKind extends string = string> =
	| InflectableSchemaCatalogEntry<TSubKind>
	| UninflectableSchemaCatalogEntry<TSubKind>;

export type SchemaCatalogDefinition<TSubKind extends string> = {
	[TKey in Lowercase<TSubKind>]: SchemaCatalogEntry<TSubKind> & { key: TKey };
};

type InflectionEntryKeys<TEntries extends Record<string, SchemaCatalogEntry>> = {
	[TKey in keyof TEntries]: TEntries[TKey]["hasInflection"] extends true
		? TKey
		: never;
}[keyof TEntries];

type RuntimeSchemaSetFor<
	TEntries extends Record<string, SchemaCatalogEntry>,
> = {
	lemma: z.ZodType<SchemaOutput<TEntries[keyof TEntries]["bundle"]["lemmaSchema"]>>;
	selection: z.ZodType<
		SchemaOutput<
			| ReturnType<TEntries[keyof TEntries]["bundle"]["selection"]["standard"]["lemma"]>
			| ReturnType<TEntries[keyof TEntries]["bundle"]["selection"]["typo"]["lemma"]>
			| (TEntries[InflectionEntryKeys<TEntries>]["bundle"] extends {
					selection: {
						standard: { inflection: SchemaLeaf };
						typo: { inflection: SchemaLeaf };
					};
			  }
					? | ReturnType<
							TEntries[InflectionEntryKeys<TEntries>]["bundle"]["selection"]["standard"]["inflection"]
					  >
					  | ReturnType<
							TEntries[InflectionEntryKeys<TEntries>]["bundle"]["selection"]["typo"]["inflection"]
					  >
					: never)
		>
	>;
	surface: z.ZodType<
		SchemaOutput<TEntries[keyof TEntries]["bundle"]["lemmaSurfaceSchema"]> |
			SchemaOutput<
				TEntries[InflectionEntryKeys<TEntries>]["bundle"] extends {
					inflectionSurfaceSchema: z.ZodTypeAny;
				}
					? TEntries[InflectionEntryKeys<TEntries>]["bundle"]["inflectionSurfaceSchema"]
					: never
			>
	>;
};

export type FamilySchemaCatalog<
	TEntries extends Record<string, SchemaCatalogEntry>,
> = {
	entries: TEntries;
	inflectionSelectionSchemaTree: {
		standard: {
			[TKey in InflectionEntryKeys<TEntries>]: TEntries[TKey]["bundle"] extends {
				selection: { standard: { inflection: infer TLeaf } };
			}
				? TLeaf
				: never;
		};
		typo: {
			[TKey in InflectionEntryKeys<TEntries>]: TEntries[TKey]["bundle"] extends {
				selection: { typo: { inflection: infer TLeaf } };
			}
				? TLeaf
				: never;
		};
	};
	inflectionSurfaceSchemaTree: {
		[TKey in InflectionEntryKeys<TEntries>]: TEntries[TKey]["bundle"] extends {
			surface: { inflection: infer TLeaf };
		}
			? TLeaf
			: never;
	};
	lemmaSchemaTree: {
		[TKey in keyof TEntries]: TEntries[TKey]["bundle"]["lemma"];
	};
	lemmaSelectionSchemaTree: {
		standard: {
			[TKey in keyof TEntries]: TEntries[TKey]["bundle"]["selection"]["standard"]["lemma"];
		};
		typo: {
			[TKey in keyof TEntries]: TEntries[TKey]["bundle"]["selection"]["typo"]["lemma"];
		};
	};
	lemmaSurfaceSchemaTree: {
		[TKey in keyof TEntries]: TEntries[TKey]["bundle"]["surface"]["lemma"];
	};
	runtimeSchemas: RuntimeSchemaSetFor<TEntries>;
};

export function defineSchemaCatalog<
	const TEntries extends Record<string, SchemaCatalogEntry>,
>(entries: TEntries): TEntries {
	return entries;
}

function asUnionInput<TSchema extends z.ZodTypeAny>(
	schemas: readonly TSchema[],
): [TSchema, TSchema, ...TSchema[]] {
	return schemas as unknown as [TSchema, TSchema, ...TSchema[]];
}

export function buildFamilySchemaCatalog<
	const TEntries extends Record<string, SchemaCatalogEntry>,
>(entries: TEntries): FamilySchemaCatalog<TEntries> {
	const lemmaSchemaTree: Record<string, SchemaLeaf> = {};
	const lemmaSurfaceSchemaTree: Record<string, SchemaLeaf> = {};
	const inflectionSurfaceSchemaTree: Record<string, SchemaLeaf> = {};
	const lemmaSelectionSchemaTree = {
		standard: {} as Record<string, SchemaLeaf>,
		typo: {} as Record<string, SchemaLeaf>,
	};
	const inflectionSelectionSchemaTree = {
		standard: {} as Record<string, SchemaLeaf>,
		typo: {} as Record<string, SchemaLeaf>,
	};

	const lemmaSchemas: z.ZodTypeAny[] = [];
	const surfaceSchemas: z.ZodTypeAny[] = [];
	const selectionSchemas: z.ZodTypeAny[] = [];

	for (const entry of Object.values(entries) as TEntries[keyof TEntries][]) {
		lemmaSchemaTree[entry.key] = entry.bundle.lemma;
		lemmaSurfaceSchemaTree[entry.key] = entry.bundle.surface.lemma;
		lemmaSelectionSchemaTree.standard[entry.key] = entry.bundle.selection.standard.lemma;
		lemmaSelectionSchemaTree.typo[entry.key] = entry.bundle.selection.typo.lemma;

		lemmaSchemas.push(entry.bundle.lemmaSchema);
		surfaceSchemas.push(entry.bundle.lemmaSurfaceSchema);
		selectionSchemas.push(
			entry.bundle.selection.standard.lemma(),
			entry.bundle.selection.typo.lemma(),
		);

		if (entry.hasInflection) {
			surfaceSchemas.push(entry.bundle.inflectionSurfaceSchema);
			inflectionSurfaceSchemaTree[entry.key] = entry.bundle.surface.inflection;
			inflectionSelectionSchemaTree.standard[entry.key] =
				entry.bundle.selection.standard.inflection;
			inflectionSelectionSchemaTree.typo[entry.key] =
				entry.bundle.selection.typo.inflection;
			selectionSchemas.push(
				entry.bundle.selection.standard.inflection(),
				entry.bundle.selection.typo.inflection(),
			);
		}
	}

	return {
		entries,
		lemmaSchemaTree:
			lemmaSchemaTree as FamilySchemaCatalog<TEntries>["lemmaSchemaTree"],
		lemmaSurfaceSchemaTree:
			lemmaSurfaceSchemaTree as FamilySchemaCatalog<TEntries>["lemmaSurfaceSchemaTree"],
		inflectionSurfaceSchemaTree:
			inflectionSurfaceSchemaTree as FamilySchemaCatalog<TEntries>["inflectionSurfaceSchemaTree"],
		lemmaSelectionSchemaTree:
			lemmaSelectionSchemaTree as FamilySchemaCatalog<TEntries>["lemmaSelectionSchemaTree"],
		inflectionSelectionSchemaTree:
			inflectionSelectionSchemaTree as FamilySchemaCatalog<TEntries>["inflectionSelectionSchemaTree"],
		runtimeSchemas: {
			lemma: buildUnionSchema(asUnionInput(lemmaSchemas)),
			surface: buildUnionSchema(asUnionInput(surfaceSchemas)),
			selection: buildUnionSchema(asUnionInput(selectionSchemas)),
		} as FamilySchemaCatalog<TEntries>["runtimeSchemas"],
	};
}
