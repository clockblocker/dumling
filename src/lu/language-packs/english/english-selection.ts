import z from "zod/v3";
import type {
	ObservedSelectionSchemaLanguageShape,
	SelectionSchemaLanguageShape,
} from "../../registry-shapes";
import type { ObservedSelectionSchemaFor } from "../../universal/helpers/schema-targets";
import { deriveSelectionSchemaLanguage } from "../../universal/factories/deriveKnownSelectionSchemas";
import { EnglishSurfaceSchema } from "./english-surface";

export const EnglishObservedSelectionSchema = z
	.object({
		language: z.literal("English"),
		orthographicStatus: z.literal("Unknown"),
		spelledSelection: z.string(),
	})
	.strict() satisfies ObservedSelectionSchemaFor;

export const EnglishSelectionSchema = deriveSelectionSchemaLanguage({
	language: "English",
	surfaceSchema: EnglishSurfaceSchema,
}) satisfies SelectionSchemaLanguageShape;

const _englishObservedSelectionSchemaShapeCheck =
	EnglishObservedSelectionSchema satisfies ObservedSelectionSchemaLanguageShape;
