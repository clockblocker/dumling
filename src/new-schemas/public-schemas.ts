import type { SupportedLanguage } from "dumling/types";
import { deSubtree } from "./concrete-language/features/de/de-subtree";
import { enSubtree } from "./concrete-language/features/en/en-subtree";
import { heSubtree } from "./concrete-language/features/he/he-subtree";
import { buildDescriptorSchemas } from "./descriptor-schemas";
import type {
	NewRawEntitySchemaRegistry,
	NewSchemaRegistry,
} from "./shared/schema-helper-types";
import { wrapEntitySchemaTree } from "./shared/wrap-entity-schema-tree";

const entitySchemasByLanguage = {
	de: deSubtree,
	en: enSubtree,
	he: heSubtree,
} satisfies NewRawEntitySchemaRegistry;

const descriptorSchemasByLanguage = buildDescriptorSchemas(
	entitySchemasByLanguage,
);

export const schemasFor = {
	de: {
		descriptor: descriptorSchemasByLanguage.de,
		entity: wrapEntitySchemaTree(entitySchemasByLanguage.de),
	},
	en: {
		descriptor: descriptorSchemasByLanguage.en,
		entity: wrapEntitySchemaTree(entitySchemasByLanguage.en),
	},
	he: {
		descriptor: descriptorSchemasByLanguage.he,
		entity: wrapEntitySchemaTree(entitySchemasByLanguage.he),
	},
} satisfies NewSchemaRegistry;

export function getSchemaTreeFor<L extends SupportedLanguage>(
	language: L,
): NewSchemaRegistry[L] {
	return schemasFor[language];
}
