import { z } from "zod/v3";
import { AbstractLanguageTag } from "../types/core/enums";
import { abstractLeafDefinitions, deLeafDefinitions } from "./de-config";
import { NotImplementedYetError } from "./errors";
import { buildLanguageSchemaTree } from "./schema-factory";

const abstractLanguageSchema = AbstractLanguageTag;
const deLanguageSchema = z.literal("de");

const abstractRegistry = buildLanguageSchemaTree(abstractLeafDefinitions, {
	abstract: true,
	languageSchema: abstractLanguageSchema,
});

const deRegistry = buildLanguageSchemaTree(deLeafDefinitions, {
	languageSchema: deLanguageSchema,
});

type NestedShape = Record<string, unknown>;

function mapLeavesToThrowers(shape: NestedShape, language: "en" | "he"): NestedShape {
	return Object.fromEntries(
		Object.entries(shape).map(([key, value]) => [
			key,
			typeof value === "function"
				? () => {
						throw new NotImplementedYetError(language);
					}
				: mapLeavesToThrowers(value as NestedShape, language),
		]),
	);
}

export const schema: any = {
	abstract: abstractRegistry.schema,
	de: deRegistry.schema,
	en: mapLeavesToThrowers(abstractRegistry.schema as NestedShape, "en"),
	he: mapLeavesToThrowers(abstractRegistry.schema as NestedShape, "he"),
} as const;

export const runtimeSchemas = {
	abstract: abstractRegistry.unions,
	de: deRegistry.unions,
} as const;
