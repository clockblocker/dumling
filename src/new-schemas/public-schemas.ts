import type { ConcreteLanguage } from "../types/concrete-language/features/feature-registry";
import { deSubtree } from "./concrete-language/features/de/de-subtree";
import { enSubtree } from "./concrete-language/features/en/en-subtree";
import { heSubtree } from "./concrete-language/features/he/he-subtree";
import {
	type NewDescriptorSchemaTree,
	buildDescriptorSchemas,
} from "./descriptor-schemas";
import type { NewSchemaTree as NewEntitySchemaTree } from "./shared/schema-helper-types";

export type NewSchemaTree = {
	[L in ConcreteLanguage]: {
		descriptor: NewDescriptorSchemaTree[L];
		entity: NewEntitySchemaTree[L];
	};
};

const entitySchemas = {
	de: deSubtree,
	en: enSubtree,
	he: heSubtree,
} satisfies NewEntitySchemaTree;

export const descriptorSchemas = buildDescriptorSchemas(entitySchemas);

export const newSchema = {
	de: {
		descriptor: descriptorSchemas.de,
		entity: entitySchemas.de,
	},
	en: {
		descriptor: descriptorSchemas.en,
		entity: entitySchemas.en,
	},
	he: {
		descriptor: descriptorSchemas.he,
		entity: entitySchemas.he,
	},
} satisfies NewSchemaTree;
