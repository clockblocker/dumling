import type {
	DocCitePageFamily,
	DocPageMeta,
	DocSection,
	SourceMirroredDocCitePageDefinition,
	SourceMirroredLeaf,
} from "./document-shapes.ts";
import { sourceMirroredDocPageMarker as marker } from "./document-shapes.ts";

type SharedOptions = DocSection & {
	description?: string;
	order?: number;
	subsections?: readonly DocSection[];
	title: string;
};

type DefineSourceMirroredDocPageOptions = SharedOptions & {
	family: DocCitePageFamily;
	leaf?: SourceMirroredLeaf;
	subject: string;
};

type DefineStubDocPageOptions = {
	description?: string;
	family: DocCitePageFamily;
	leaf?: SourceMirroredLeaf;
	order?: number;
	subject: string;
	title: string;
};

function toMeta(options: {
	description?: string;
	order?: number;
	title: string;
}): DocPageMeta {
	return {
		description: options.description,
		order: options.order,
		title: options.title,
	};
}

export function defineSourceMirroredDocPage(
	options: DefineSourceMirroredDocPageOptions,
): SourceMirroredDocCitePageDefinition {
	return {
		[marker]: true,
		body: options.body,
		doc: {
			family: options.family,
			leaf: options.leaf,
			subject: options.subject,
		},
		examples: options.examples ?? [],
		meta: toMeta(options),
		subsections: options.subsections,
	};
}

export function defineStubDocPage(
	options: DefineStubDocPageOptions,
): SourceMirroredDocCitePageDefinition {
	return defineSourceMirroredDocPage({
		body: "",
		family: options.family,
		leaf: options.leaf,
		subject: options.subject,
		title: options.title,
		description: options.description,
		order: options.order,
	});
}

export type {
	DefineSourceMirroredDocPageOptions,
	DefineStubDocPageOptions,
	DocSection,
	SourceMirroredDocCitePageDefinition,
};
