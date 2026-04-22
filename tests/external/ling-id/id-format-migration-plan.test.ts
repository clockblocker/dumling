import { describe, expect, it } from "bun:test";
import type { z } from "zod/v3";
import { dumling } from "../../../src";
import {
	concreteFeatureSchemaInventory,
	featureNameTokens,
	featureValueTokens,
	rawStringFeatureNames,
} from "../../../src/operations/shared/id-codec/tiny-tokens";
import { schemasFor } from "../../../src/schema";

type SchemaFactory = () => z.ZodTypeAny;
type SchemaLike = z.ZodTypeAny & {
	_def: {
		innerType?: SchemaLike;
		options?: SchemaLike[];
		schema?: SchemaLike;
		type?: SchemaLike;
		typeName: string;
		value?: unknown;
		values?: readonly unknown[];
	};
	shape?: Record<string, SchemaLike>;
	unwrap?: () => SchemaLike;
};

function sorted(values: Iterable<string>): string[] {
	return [...values].sort((left, right) => left.localeCompare(right));
}

function difference(left: readonly string[], right: readonly string[]) {
	const rightSet = new Set(right);
	return left.filter((value) => !rightSet.has(value));
}

function unwrapSchema(schema: SchemaLike): SchemaLike {
	let current = schema;

	while (
		current._def.typeName === "ZodEffects" ||
		current._def.typeName === "ZodOptional" ||
		current._def.typeName === "ZodNullable" ||
		current._def.typeName === "ZodDefault" ||
		current._def.typeName === "ZodCatch" ||
		current._def.typeName === "ZodReadonly"
	) {
		current =
			current._def.schema ??
			current._def.innerType ??
			current.unwrap?.() ??
			current;
	}

	return current;
}

function objectShape(schema: SchemaLike): Record<string, SchemaLike> {
	const unwrapped = unwrapSchema(schema);
	if (unwrapped._def.typeName !== "ZodObject") {
		throw new Error(
			`Expected ZodObject, received ${unwrapped._def.typeName}`,
		);
	}

	return unwrapped.shape ?? unwrapped._def.shape();
}

function objectShapes(schema: SchemaLike): Record<string, SchemaLike>[] {
	const unwrapped = unwrapSchema(schema);
	if (unwrapped._def.typeName === "ZodUnion") {
		return (unwrapped._def.options ?? []).flatMap(objectShapes);
	}

	return [objectShape(unwrapped)];
}

function finiteValuesFor(schema: SchemaLike): string[] | undefined {
	const unwrapped = unwrapSchema(schema);

	if (unwrapped._def.typeName === "ZodLiteral") {
		return [String(unwrapped._def.value)];
	}

	if (unwrapped._def.typeName === "ZodEnum") {
		return (unwrapped._def.values ?? []).map(String);
	}

	if (unwrapped._def.typeName === "ZodUnion") {
		const values = new Set<string>();
		for (const option of unwrapped._def.options ?? []) {
			const optionValues = finiteValuesFor(option);
			if (optionValues === undefined) {
				continue;
			}
			for (const value of optionValues) {
				values.add(value);
			}
		}
		return sorted(values);
	}

	if (unwrapped._def.typeName === "ZodArray") {
		return finiteValuesFor(unwrapped._def.type as SchemaLike);
	}

	return undefined;
}

function collectFeatureSetSchema(
	inventory: {
		featureNames: Set<string>;
		finiteFeatureValues: Map<string, Set<string>>;
	},
	schema: z.ZodTypeAny,
	featureSetProperty: "inherentFeatures" | "inflectionalFeatures",
) {
	for (const entityShape of objectShapes(schema as SchemaLike)) {
		const featureSetSchema = entityShape[featureSetProperty];
		if (featureSetSchema === undefined) {
			continue;
		}

		for (const featureSet of objectShapes(featureSetSchema)) {
			for (const [name, valueSchema] of Object.entries(featureSet)) {
				inventory.featureNames.add(name);

				const finiteValues = finiteValuesFor(valueSchema);
				if (finiteValues === undefined) {
					continue;
				}

				const values =
					inventory.finiteFeatureValues.get(name) ?? new Set();
				for (const value of finiteValues) {
					values.add(value);
				}
				inventory.finiteFeatureValues.set(name, values);
			}
		}
	}
}

function concreteSchemaFeatureInventory() {
	const inventory = {
		featureNames: new Set<string>(),
		finiteFeatureValues: new Map<string, Set<string>>(),
	};

	for (const language of ["de", "en", "he"] as const) {
		const entitySchemas = schemasFor[language].entity;

		for (const lemmaKindSchemas of Object.values(entitySchemas.Lemma)) {
			for (const lemmaSchemaFactory of Object.values(
				lemmaKindSchemas,
			) as SchemaFactory[]) {
				collectFeatureSetSchema(
					inventory,
					lemmaSchemaFactory(),
					"inherentFeatures",
				);
			}
		}

		for (const lemmaKindSchemas of Object.values(
			entitySchemas.Surface.Inflection,
		)) {
			for (const surfaceSchemaFactory of Object.values(
				lemmaKindSchemas,
			) as SchemaFactory[]) {
				collectFeatureSetSchema(
					inventory,
					surfaceSchemaFactory(),
					"inflectionalFeatures",
				);
			}
		}
	}

	return {
		featureNames: sorted(inventory.featureNames),
		finiteFeatureValues: Object.fromEntries(
			[...inventory.finiteFeatureValues]
				.map(([name, values]) => [name, sorted(values)] as const)
				.sort(([left], [right]) => left.localeCompare(right)),
		),
	};
}

describe("ID format migration plan contracts", () => {
	it("rejects readable CSV feature values containing ID feature delimiters", () => {
		const decoded = dumling.en.id.decode.asLemma(
			"Lemma,en,Lexeme,VERB,give,👉,hasGovPrep=up=down",
		);

		expect(decoded.success).toBe(false);
		if (decoded.success) {
			throw new Error(
				"Expected delimiter-containing feature value to fail",
			);
		}
		expect(decoded.error.code).toBe("InvalidPayload");
		expect(decoded.error.message).toContain("must not contain");
	});

	it("keeps tiny token feature coverage in lockstep with the concrete schema inventory", () => {
		const schemaInventory = concreteSchemaFeatureInventory();
		const explicitInventory = {
			featureNames: sorted(concreteFeatureSchemaInventory.featureNames),
			finiteFeatureValues: Object.fromEntries(
				Object.entries(
					concreteFeatureSchemaInventory.finiteFeatureValues,
				)
					.map(([name, values]) => [name, sorted(values)] as const)
					.sort(([left], [right]) => left.localeCompare(right)),
			),
		};
		const tokenFeatureNames = sorted(Object.keys(featureNameTokens));

		expect(schemaInventory).toEqual(explicitInventory);
		expect({
			missingFromTokens: difference(
				explicitInventory.featureNames,
				tokenFeatureNames,
			),
			notInConcreteSchemas: difference(
				tokenFeatureNames,
				explicitInventory.featureNames,
			),
		}).toEqual({
			missingFromTokens: [],
			notInConcreteSchemas: [],
		});

		const rawStringFeatureNameSet: ReadonlySet<string> =
			rawStringFeatureNames;
		const finiteTokenValues = Object.fromEntries(
			Object.entries(featureValueTokens)
				.filter(([name]) => !rawStringFeatureNameSet.has(name))
				.map(
					([name, values]) =>
						[name, sorted(Object.keys(values))] as const,
				)
				.sort(([left], [right]) => left.localeCompare(right)),
		);

		const valueCoverageMismatches = sorted(
			sorted([
				...Object.keys(explicitInventory.finiteFeatureValues),
				...Object.keys(finiteTokenValues),
			]).flatMap((name) => {
				const schemaValues =
					explicitInventory.finiteFeatureValues[name] ?? [];
				const tokenValues = finiteTokenValues[name] ?? [];
				const missingFromTokens = difference(schemaValues, tokenValues);
				const notInConcreteSchemas = difference(
					tokenValues,
					schemaValues,
				);

				if (
					missingFromTokens.length === 0 &&
					notInConcreteSchemas.length === 0
				) {
					return [];
				}

				return `${name}: missingFromTokens=${missingFromTokens.join(
					"+",
				)} notInConcreteSchemas=${notInConcreteSchemas.join("+")}`;
			}),
		);

		expect(valueCoverageMismatches).toEqual([]);
	});

	it("requires explicit short tokens instead of using readable feature values as tiny tokens", () => {
		const identityFeatureValueTokens = Object.entries(featureValueTokens)
			.flatMap(([name, values]) =>
				Object.entries(values).map(([value, token]) => ({
					name,
					token,
					value,
				})),
			)
			.filter(({ token, value }) => token === value)
			.map(({ name, value }) => `${name}=${value}`);

		if (identityFeatureValueTokens.length > 0) {
			throw new Error(
				`Tiny CSV uses readable feature values as v1 tokens: ${identityFeatureValueTokens
					.slice(0, 20)
					.join(", ")}`,
			);
		}
	});
});
