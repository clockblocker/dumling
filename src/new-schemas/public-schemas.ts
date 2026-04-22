import { deSubtree } from "./concrete-language/features/de/de-subtree";
import { enSubtree } from "./concrete-language/features/en/en-subtree";
import { heSubtree } from "./concrete-language/features/he/he-subtree";
import type { NewSchemaTree } from "./shared/schema-helper-types";

export const newSchema = {
	de: deSubtree,
	en: enSubtree,
	he: heSubtree,
} satisfies NewSchemaTree;
