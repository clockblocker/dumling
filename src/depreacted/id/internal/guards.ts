import z from "zod/v3";
import { LemmaSchema, SelectionSchema, SurfaceSchema } from "../../lu/public-entities";
import type { TargetLanguage } from "../../lu/universal/enums/core/language";
import type { ConcreteDumlingIdKind } from "../types";

function isZodSchema(value: unknown): value is z.ZodTypeAny {
	return value instanceof z.ZodType;
}

function collectLeafSchemas(value: unknown): z.ZodTypeAny[] {
	if (isZodSchema(value)) {
		return [value];
	}

	if (typeof value !== "object" || value === null) {
		return [];
	}

	return Object.values(value).flatMap((entry) => collectLeafSchemas(entry));
}

function unionLeafSchemas(value: unknown): z.ZodTypeAny {
	const leaves = collectLeafSchemas(value);

	if (leaves.length === 0) {
		throw new Error("Expected at least one schema leaf");
	}

	if (leaves.length === 1) {
		const onlyLeaf = leaves[0];

		if (onlyLeaf === undefined) {
			throw new Error("Expected exactly one schema leaf");
		}

		return onlyLeaf;
	}

	const [first, second, ...rest] = leaves;

	return z.union([first, second, ...rest] as [
		z.ZodTypeAny,
		z.ZodTypeAny,
		...z.ZodTypeAny[],
	]);
}

const runtimeSchemas = {
	English: {
		Lemma: unionLeafSchemas(LemmaSchema.English),
		Selection: unionLeafSchemas(SelectionSchema.English),
		Surface: unionLeafSchemas(SurfaceSchema.English),
	},
	German: {
		Lemma: unionLeafSchemas(LemmaSchema.German),
		Selection: unionLeafSchemas(SelectionSchema.German),
		Surface: unionLeafSchemas(SurfaceSchema.German),
	},
	Hebrew: {
		Lemma: unionLeafSchemas(LemmaSchema.Hebrew),
		Selection: unionLeafSchemas(SelectionSchema.Hebrew),
		Surface: unionLeafSchemas(SurfaceSchema.Hebrew),
	},
} satisfies {
	[L in TargetLanguage]: Record<ConcreteDumlingIdKind, z.ZodTypeAny>;
};

export function getRuntimeSchema(
	language: TargetLanguage,
	kind: ConcreteDumlingIdKind,
): z.ZodTypeAny {
	return runtimeSchemas[language][kind];
}

export function isPlainObject(
	value: unknown,
): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
