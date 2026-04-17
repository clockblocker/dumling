import z from "zod/v3";
import type {
	ObservedSelectionSchemaLanguageShape,
	SelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { ObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import { deriveSelectionSchemaLanguage } from "../../universal/factories/deriveKnownSelectionSchemas";
import { HebrewSurfaceSchema } from "./hebrew-surface";

export const HebrewObservedSelectionSchema = z
	.object({
		language: z.literal("Hebrew"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies ObservedSelectionSchemaFor;

export const HebrewSelectionSchema = deriveSelectionSchemaLanguage({
	language: "Hebrew",
	surfaceSchema: HebrewSurfaceSchema,
}) satisfies SelectionSchemaLanguageShape;

const _hebrewObservedSelectionSchemaShapeCheck =
	HebrewObservedSelectionSchema satisfies ObservedSelectionSchemaLanguageShape;
