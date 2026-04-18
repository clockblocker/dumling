import { z } from "zod/v3";

import {
	OrthographicStatus,
	SelectionCoverage,
	SpellingRelation,
} from "../../core/enums";
import { UniversalLanguage } from "../ontology";

export function buildUniversalSelectionSchema<
	SurfaceSchema extends z.ZodTypeAny,
>({
	surface,
}: {
	surface: SurfaceSchema;
}) {
	return z.object({
		language: UniversalLanguage,
		orthographicStatus: OrthographicStatus,
		selectionCoverage: SelectionCoverage,
		spelledSelection: z.string().min(1),
		spellingRelation: SpellingRelation,
		surface,
	});
}
