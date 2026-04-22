import type { z } from "zod/v3";
import type { Descriptor } from "../types/descriptor";
import { deSubtree } from "./concrete-language/features/de/de-subtree";
import { enSubtree } from "./concrete-language/features/en/en-subtree";
import { heSubtree } from "./concrete-language/features/he/he-subtree";
import {
	type NewDescriptorSchemaTree,
	buildDescriptorSchema,
	buildDescriptorSchemas,
} from "./descriptor-schemas";
import type { NewSchemaTree } from "./shared/schema-helper-types";

export type NewPublicSchemaTree = NewSchemaTree & {
	descriptor: z.ZodType<Descriptor>;
	descriptors: NewDescriptorSchemaTree;
};

const languageSchemas = {
	de: deSubtree,
	en: enSubtree,
	he: heSubtree,
} satisfies NewSchemaTree;

export const descriptorSchemas = buildDescriptorSchemas(languageSchemas);
export const descriptorSchema = buildDescriptorSchema(descriptorSchemas);

export const newSchema = {
	...languageSchemas,
	descriptor: descriptorSchema,
	descriptors: descriptorSchemas,
} satisfies NewPublicSchemaTree;


newSchema = {
	de: {
		descriptor: descriptorSchemas
		entity: deSubtree
	}
}