import z from "zod/v3";
import type {
	DeprecatedSelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { DeprecatedObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import { deprecatedDeriveSelectionSchemaLanguage } from "../../universal/factories/deriveKnownSelectionSchemas";
import { DeprecatedHebrewSurfaceSchema } from "./hebrew-surface";

export const DeprecatedHebrewObservedSelectionSchema = z
	.object({
		language: z.literal("Hebrew"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies DeprecatedObservedSelectionSchemaFor;

export const DeprecatedHebrewSelectionSchema = deprecatedDeriveSelectionSchemaLanguage({
	language: "Hebrew",
	surfaceSchema: DeprecatedHebrewSurfaceSchema,
}) satisfies DeprecatedSelectionSchemaLanguageShape;
