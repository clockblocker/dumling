import z from "zod/v3";
import type { DeprecatedAbstractLemma } from "../abstract-lemma";
import type {
	DeprecatedAbstractObservedSelectionFor,
	DeprecatedAbstractSelectionFor,
} from "../abstract-selection";
import type {
	DeprecatedLemmaKind,
	DeprecatedSurfaceKind,
} from "../enums/core/selection";
import type { DeprecatedAbstractFeatures } from "../enums/feature";
import type { DeprecatedLemmaDiscriminatorFor } from "../lemma-discriminator";

export type DeprecatedLemmaFor<
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = DeprecatedAbstractLemma<LK, D>;

export type DeprecatedLemmaSchemaFor<
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = z.ZodType<DeprecatedLemmaFor<LK, D>>;

export type DeprecatedSurfaceFor<
	SK extends DeprecatedSurfaceKind = DeprecatedSurfaceKind,
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = DeprecatedAbstractSelectionFor<"Standard", SK, LK, D>["surface"];

export type DeprecatedSurfaceSchemaFor<
	SK extends DeprecatedSurfaceKind = DeprecatedSurfaceKind,
	LK extends DeprecatedLemmaKind = DeprecatedLemmaKind,
	D extends DeprecatedLemmaDiscriminatorFor<LK> = DeprecatedLemmaDiscriminatorFor<LK>,
> = z.ZodType<DeprecatedSurfaceFor<SK, LK, D>>;

export type DeprecatedObservedSelectionFor = DeprecatedAbstractObservedSelectionFor;

export type DeprecatedObservedSelectionSchemaFor = z.ZodType<DeprecatedObservedSelectionFor>;

type ValidFeatureSchemaShape<Shape extends z.ZodRawShape> = {
	[K in keyof Shape]: K extends keyof DeprecatedAbstractFeatures
		? z.infer<Shape[K]> extends DeprecatedAbstractFeatures[K]
			? Shape[K]
			: never
		: never;
};

type OptionalizedFeatureSchemaShape<Shape extends z.ZodRawShape> = {
	[K in keyof Shape]: Shape[K] extends z.ZodTypeAny
		? z.ZodOptional<Shape[K]>
		: never;
};

export function deprecatedFeatureValueSet<Schema extends z.ZodTypeAny>(schema: Schema) {
	return z.union([
		schema,
		z
			.array(schema)
			.nonempty()
			.superRefine((values, ctx) => {
				if (new Set(values).size !== values.length) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Duplicate feature values are not allowed",
					});
				}
			}),
	]);
}

export function deprecatedFeatureSpecificValueSets<
	Schema extends z.ZodTypeAny,
	const Allowed extends readonly (readonly [
		z.infer<Schema>,
		...z.infer<Schema>[],
	])[],
>(schema: Schema, allowedValueSets: Allowed) {
	const exactSetSchema = z
		.array(schema)
		.nonempty()
		.superRefine((values, ctx) => {
			if (new Set(values).size !== values.length) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Duplicate feature values are not allowed",
				});
				return;
			}

			const normalizedValues = [...values].sort();
			const isAllowed = allowedValueSets.some((allowedValues) => {
				const normalizedAllowedValues = [...allowedValues].sort();

				return (
					normalizedAllowedValues.length ===
						normalizedValues.length &&
					normalizedAllowedValues.every(
						(allowedValue, index) =>
							allowedValue === normalizedValues[index],
					)
				);
			});

			if (!isAllowed) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Unsupported feature value combination",
				});
			}
		});

	return z.union([schema, exactSetSchema]);
}

function makeFeatureSchemaShapeOptional<const Shape extends z.ZodRawShape>(
	shape: Shape,
): OptionalizedFeatureSchemaShape<Shape> {
	return Object.fromEntries(
		Object.entries(shape).map(([key, schema]) => [key, schema.optional()]),
	) as OptionalizedFeatureSchemaShape<Shape>;
}

export function deprecatedFeatureSchema<const Shape extends z.ZodRawShape>(
	shape: Shape & ValidFeatureSchemaShape<Shape>,
): z.ZodObject<OptionalizedFeatureSchemaShape<Shape>, "strict"> {
	return z.object(makeFeatureSchemaShapeOptional(shape)).strict();
}
