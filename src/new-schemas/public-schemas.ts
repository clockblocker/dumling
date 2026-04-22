import type { SupportedLanguage } from "dumling/types";
import { deSubtree } from "./concrete-language/features/de/de-subtree";
import { enSubtree } from "./concrete-language/features/en/en-subtree";
import { heSubtree } from "./concrete-language/features/he/he-subtree";
import { adaptEntitySchemaTree } from "./shared/adapt-entity-schema-tree";
import type {
	NewRawEntitySchemaRegistry,
	NewSchemaRegistry,
} from "./shared/schema-helper-types";

const entitySchemasByLanguage = {
	de: deSubtree,
	en: enSubtree,
	he: heSubtree,
} satisfies NewRawEntitySchemaRegistry;

export const schemas: NewSchemaRegistry = {
	de: {
		entity: adaptEntitySchemaTree(entitySchemasByLanguage.de),
	},
	en: {
		entity: adaptEntitySchemaTree(entitySchemasByLanguage.en),
	},
	he: {
		entity: adaptEntitySchemaTree(entitySchemasByLanguage.he),
	},
};

export function getSchemaTreeFor<L extends SupportedLanguage>(
	language: L,
): NewSchemaRegistry[L] {
	return schemas[language];
}
