import z from "zod/v3";
import type {
	DeprecatedSelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { DeprecatedObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import { deprecatedDeriveSelectionSchemaLanguage } from "../../universal/factories/deriveKnownSelectionSchemas";
import { DeprecatedEnglishSurfaceSchema } from "./english-surface";

export const DeprecatedEnglishObservedSelectionSchema = z
	.object({
		language: z.literal("English"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies DeprecatedObservedSelectionSchemaFor;

export const DeprecatedEnglishSelectionSchema = deprecatedDeriveSelectionSchemaLanguage({
	language: "English",
	surfaceSchema: DeprecatedEnglishSurfaceSchema,
}) satisfies DeprecatedSelectionSchemaLanguageShape;
