import z from "zod/v3";
import type {
	DeprecatedSelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { DeprecatedObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import { deprecatedDeriveSelectionSchemaLanguage } from "../../universal/factories/deriveKnownSelectionSchemas";
import { DeprecatedGermanSurfaceSchema } from "./german-surface";

export const DeprecatedGermanObservedSelectionSchema = z
	.object({
		language: z.literal("German"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies DeprecatedObservedSelectionSchemaFor;

export const DeprecatedGermanSelectionSchema = deprecatedDeriveSelectionSchemaLanguage({
	language: "German",
	surfaceSchema: DeprecatedGermanSurfaceSchema,
}) satisfies DeprecatedSelectionSchemaLanguageShape;
