import type { z } from "zod/v3";
import { z as zod } from "zod/v3";
import type { ConcreteLanguage } from "../types/concrete-language/features/feature-registry";
import type { Descriptor } from "../types/descriptor";
import type {
	LemmaKindFor,
	LemmaKindForSurfaceKind,
	LemmaSubKindFor,
	OrthographicStatus,
	SurfaceKindFor,
} from "../types/public-types";
import { buildUnionSchema } from "./shared/builders";
import type {
	LemmaSubKindForSurfaceKind,
	NewSchemaTree,
} from "./shared/schema-helper-types";

type DescriptorSchema<TDescriptor> = z.ZodType<TDescriptor>;

export type NewLemmaDescriptorSchemaSubtree<L extends ConcreteLanguage> = {
	[LK in LemmaKindFor<L>]: {
		[LSK in LemmaSubKindFor<L, LK>]: DescriptorSchema<
			Descriptor<"Lemma", L, LK, LSK>
		>;
	};
};

export type NewSurfaceDescriptorSchemaSubtree<L extends ConcreteLanguage> = {
	[SK in SurfaceKindFor<L>]: {
		[LK in LemmaKindForSurfaceKind<L, SK>]: {
			[LSK in LemmaSubKindForSurfaceKind<L, SK, LK>]: DescriptorSchema<
				Descriptor<"Surface", L, LK, LSK, SK>
			>;
		};
	};
};

export type NewSelectionDescriptorSchemaSubtree<L extends ConcreteLanguage> = {
	[OS in OrthographicStatus]: {
		[SK in SurfaceKindFor<L>]: {
			[LK in LemmaKindForSurfaceKind<L, SK>]: {
				[LSK in LemmaSubKindForSurfaceKind<
					L,
					SK,
					LK
				>]: DescriptorSchema<
					Descriptor<"Selection", L, LK, LSK, SK, OS>
				>;
			};
		};
	};
};

export type NewLanguageDescriptorSchemaTree<L extends ConcreteLanguage> = {
	lemma: NewLemmaDescriptorSchemaSubtree<L>;
	surface: NewSurfaceDescriptorSchemaSubtree<L>;
	selection: NewSelectionDescriptorSchemaSubtree<L>;
};

export type NewDescriptorSchemaTree = {
	[L in ConcreteLanguage]: NewLanguageDescriptorSchemaTree<L>;
};

type MutableLanguageDescriptorSchemaTree = {
	lemma: Record<string, Record<string, z.ZodTypeAny>>;
	surface: Record<string, Record<string, Record<string, z.ZodTypeAny>>>;
	selection: Record<
		OrthographicStatus,
		Record<string, Record<string, Record<string, z.ZodTypeAny>>>
	>;
};

type IterableLanguageSchemaTree = {
	lemma: Record<string, Record<string, unknown>>;
	surface: Record<string, Record<string, Record<string, unknown>>>;
	selection: Record<
		OrthographicStatus,
		Record<string, Record<string, Record<string, unknown>>>
	>;
};

type SchemaTuple = readonly [z.ZodTypeAny, ...z.ZodTypeAny[]];

function ensureFamily<TValue>(
	tree: Record<string, Record<string, TValue>>,
	kind: string,
): Record<string, TValue> {
	tree[kind] ??= {};
	return tree[kind];
}

function buildLemmaDescriptorSchema<
	const L extends ConcreteLanguage,
	const LK extends LemmaKindFor<L>,
	const LSK extends LemmaSubKindFor<L, LK>,
>(
	language: L,
	lemmaKind: LK,
	lemmaSubKind: LSK,
): DescriptorSchema<Descriptor<"Lemma", L, LK, LSK>> {
	return zod
		.object({
			language: zod.literal(language),
			lemmaKind: zod.literal(lemmaKind),
			lemmaSubKind: zod.literal(lemmaSubKind),
		})
		.strict() as DescriptorSchema<Descriptor<"Lemma", L, LK, LSK>>;
}

function buildSurfaceDescriptorSchema<
	const L extends ConcreteLanguage,
	const SK extends SurfaceKindFor<L>,
	const LK extends LemmaKindForSurfaceKind<L, SK>,
	const LSK extends LemmaSubKindForSurfaceKind<L, SK, LK>,
>(
	language: L,
	surfaceKind: SK,
	lemmaKind: LK,
	lemmaSubKind: LSK,
): DescriptorSchema<Descriptor<"Surface", L, LK, LSK, SK>> {
	return zod
		.object({
			language: zod.literal(language),
			surfaceKind: zod.literal(surfaceKind),
			lemmaKind: zod.literal(lemmaKind),
			lemmaSubKind: zod.literal(lemmaSubKind),
		})
		.strict() as DescriptorSchema<Descriptor<"Surface", L, LK, LSK, SK>>;
}

function buildSelectionDescriptorSchema<
	const L extends ConcreteLanguage,
	const OS extends OrthographicStatus,
	const SK extends SurfaceKindFor<L>,
	const LK extends LemmaKindForSurfaceKind<L, SK>,
	const LSK extends LemmaSubKindForSurfaceKind<L, SK, LK>,
>(
	language: L,
	orthographicStatus: OS,
	surfaceKind: SK,
	lemmaKind: LK,
	lemmaSubKind: LSK,
): DescriptorSchema<Descriptor<"Selection", L, LK, LSK, SK, OS>> {
	return zod
		.object({
			language: zod.literal(language),
			orthographicStatus: zod.literal(orthographicStatus),
			surfaceKind: zod.literal(surfaceKind),
			lemmaKind: zod.literal(lemmaKind),
			lemmaSubKind: zod.literal(lemmaSubKind),
		})
		.strict() as DescriptorSchema<
		Descriptor<"Selection", L, LK, LSK, SK, OS>
	>;
}

function buildLanguageDescriptorSchemas<const L extends ConcreteLanguage>(
	language: L,
	schemaTree: NewSchemaTree[L],
): NewLanguageDescriptorSchemaTree<L> {
	const descriptorTree: MutableLanguageDescriptorSchemaTree = {
		lemma: {},
		surface: {
			Lemma: {},
			Inflection: {},
		},
		selection: {
			Standard: {
				Lemma: {},
				Inflection: {},
			},
			Typo: {
				Lemma: {},
				Inflection: {},
			},
		},
	};
	const iterableSchemaTree =
		schemaTree as unknown as IterableLanguageSchemaTree;

	for (const [lemmaKind, subKindSchemas] of Object.entries(
		iterableSchemaTree.lemma,
	)) {
		const lemmaFamily = ensureFamily(descriptorTree.lemma, lemmaKind);

		for (const lemmaSubKind of Object.keys(subKindSchemas)) {
			lemmaFamily[lemmaSubKind] = buildLemmaDescriptorSchema(
				language,
				lemmaKind as LemmaKindFor<L>,
				lemmaSubKind as LemmaSubKindFor<L, LemmaKindFor<L>>,
			);
		}
	}

	for (const [surfaceKind, lemmaKindSchemas] of Object.entries(
		iterableSchemaTree.surface,
	)) {
		descriptorTree.surface[surfaceKind] ??= {};
		const surfaceKindTree = descriptorTree.surface[surfaceKind];

		for (const [lemmaKind, subKindSchemas] of Object.entries(
			lemmaKindSchemas,
		)) {
			const surfaceFamily = ensureFamily(surfaceKindTree, lemmaKind);

			for (const lemmaSubKind of Object.keys(subKindSchemas)) {
				surfaceFamily[lemmaSubKind] = buildSurfaceDescriptorSchema(
					language,
					surfaceKind as SurfaceKindFor<L>,
					lemmaKind as LemmaKindForSurfaceKind<L, SurfaceKindFor<L>>,
					lemmaSubKind as LemmaSubKindForSurfaceKind<
						L,
						SurfaceKindFor<L>,
						LemmaKindForSurfaceKind<L, SurfaceKindFor<L>>
					>,
				);
			}
		}
	}

	for (const [orthographicStatus, surfaceKindSchemas] of Object.entries(
		iterableSchemaTree.selection,
	) as [
		OrthographicStatus,
		IterableLanguageSchemaTree["selection"][OrthographicStatus],
	][]) {
		for (const [surfaceKind, lemmaKindSchemas] of Object.entries(
			surfaceKindSchemas,
		)) {
			descriptorTree.selection[orthographicStatus][surfaceKind] ??= {};
			const surfaceKindTree =
				descriptorTree.selection[orthographicStatus][surfaceKind];

			for (const [lemmaKind, subKindSchemas] of Object.entries(
				lemmaKindSchemas,
			)) {
				const selectionFamily = ensureFamily(
					surfaceKindTree,
					lemmaKind,
				);

				for (const lemmaSubKind of Object.keys(subKindSchemas)) {
					selectionFamily[lemmaSubKind] =
						buildSelectionDescriptorSchema(
							language,
							orthographicStatus,
							surfaceKind as SurfaceKindFor<L>,
							lemmaKind as LemmaKindForSurfaceKind<
								L,
								SurfaceKindFor<L>
							>,
							lemmaSubKind as LemmaSubKindForSurfaceKind<
								L,
								SurfaceKindFor<L>,
								LemmaKindForSurfaceKind<L, SurfaceKindFor<L>>
							>,
						);
				}
			}
		}
	}

	return descriptorTree as unknown as NewLanguageDescriptorSchemaTree<L>;
}

function collectLeafSchemas(value: unknown, schemas: z.ZodTypeAny[]): void {
	if (value instanceof zod.ZodType) {
		schemas.push(value);
		return;
	}

	if (!value || typeof value !== "object") {
		return;
	}

	for (const child of Object.values(value)) {
		collectLeafSchemas(child, schemas);
	}
}

function asSchemaTuple(schemas: z.ZodTypeAny[]): SchemaTuple {
	if (schemas.length === 0) {
		throw new Error("Expected at least one descriptor schema");
	}

	return schemas as unknown as SchemaTuple;
}

export function buildDescriptorSchemas(
	schemaTree: NewSchemaTree,
): NewDescriptorSchemaTree {
	return Object.fromEntries(
		Object.entries(schemaTree).map(([language, languageSchemaTree]) => [
			language,
			buildLanguageDescriptorSchemas(
				language as ConcreteLanguage,
				languageSchemaTree,
			),
		]),
	) as NewDescriptorSchemaTree;
}

export function buildDescriptorSchema(
	descriptorSchemas: NewDescriptorSchemaTree,
): z.ZodType<Descriptor> {
	const schemas: z.ZodTypeAny[] = [];
	collectLeafSchemas(descriptorSchemas, schemas);
	return buildUnionSchema(asSchemaTuple(schemas)) as z.ZodType<Descriptor>;
}
