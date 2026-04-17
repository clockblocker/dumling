import z from "zod/v3";
import type {
	ObservedSelectionSchemaLanguageShape,
	SelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { ObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import { deriveSelectionSchemaLanguage } from "../../universal/factories/deriveKnownSelectionSchemas";
import { GermanSurfaceSchema } from "./german-surface";

export const GermanObservedSelectionSchema = z
	.object({
		language: z.literal("German"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies ObservedSelectionSchemaFor;

export const GermanSelectionSchema = deriveSelectionSchemaLanguage({
	language: "German",
	surfaceSchema: GermanSurfaceSchema,
}) satisfies SelectionSchemaLanguageShape;

const _germanObservedSelectionSchemaShapeCheck =
	GermanObservedSelectionSchema satisfies ObservedSelectionSchemaLanguageShape;
