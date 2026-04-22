import type { SupportedLanguage } from "dumling/types";
import type {
	NewLanguageEntitySchemaTree,
	NewRawLanguageEntitySchemaTree,
} from "./schema-helper-types";

function isZodSchema(value: unknown): value is { safeParse: unknown } {
	return (
		typeof value === "object" &&
		value !== null &&
		"safeParse" in value &&
		typeof value.safeParse === "function"
	);
}

function wrapSchemaLeaves(value: unknown): unknown {
	if (isZodSchema(value)) {
		return () => value;
	}

	return Object.fromEntries(
		Object.entries(value as Record<string, unknown>).map(([key, child]) => [
			key,
			wrapSchemaLeaves(child),
		]),
	);
}

export function adaptEntitySchemaTree<L extends SupportedLanguage>(
	tree: NewRawLanguageEntitySchemaTree<L>,
): NewLanguageEntitySchemaTree<L> {
	return {
		Lemma: wrapSchemaLeaves(tree.lemma),
		Surface: wrapSchemaLeaves(tree.surface),
		Selection: wrapSchemaLeaves(tree.selection),
	} as NewLanguageEntitySchemaTree<L>;
}
