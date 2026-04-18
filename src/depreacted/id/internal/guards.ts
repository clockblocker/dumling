import z from "zod/v3";
import { DeprecatedLemmaSchema, DeprecatedSelectionSchema, DeprecatedSurfaceSchema } from "../../lu/public-entities";
import type { DeprecatedTargetLanguage } from "../../lu/universal/enums/core/language";
import type { DeprecatedConcreteDumlingIdKind } from "../types";

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
		Lemma: unionLeafSchemas(DeprecatedLemmaSchema.English),
		Selection: unionLeafSchemas(DeprecatedSelectionSchema.English),
		Surface: unionLeafSchemas(DeprecatedSurfaceSchema.English),
	},
	German: {
		Lemma: unionLeafSchemas(DeprecatedLemmaSchema.German),
		Selection: unionLeafSchemas(DeprecatedSelectionSchema.German),
		Surface: unionLeafSchemas(DeprecatedSurfaceSchema.German),
	},
	Hebrew: {
		Lemma: unionLeafSchemas(DeprecatedLemmaSchema.Hebrew),
		Selection: unionLeafSchemas(DeprecatedSelectionSchema.Hebrew),
		Surface: unionLeafSchemas(DeprecatedSurfaceSchema.Hebrew),
	},
} satisfies {
	[L in DeprecatedTargetLanguage]: Record<DeprecatedConcreteDumlingIdKind, z.ZodTypeAny>;
};

export function deprecatedGetRuntimeSchema(
	language: DeprecatedTargetLanguage,
	kind: DeprecatedConcreteDumlingIdKind,
): z.ZodTypeAny {
	return runtimeSchemas[language][kind];
}

export function deprecatedIsPlainObject(
	value: unknown,
): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
