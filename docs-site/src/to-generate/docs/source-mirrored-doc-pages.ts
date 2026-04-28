import type {
	DocCitePageFamily,
	DocPageMeta,
	DocSection,
	GeneratedDocPageDocument,
	LanguageOverlayPageDocument,
	UniversalConceptPageDocument,
} from "./document-shapes.ts";
import {
	generatedDocPageMarker,
	languageOverlayPageMarker,
	universalConceptPageMarker,
} from "./document-shapes.ts";

type SharedOptions = DocSection & {
	description?: string;
	navTitle?: string;
	order?: number;
	subsections?: readonly DocSection[];
	title: string;
};

type LegacyMirroredOptions = SharedOptions & {
	family: DocCitePageFamily;
	leaf?: string | { docId: string; html: string };
	subject: string;
};

function toMeta(options: {
	description?: string;
	navTitle?: string;
	order?: number;
	title: string;
}): DocPageMeta {
	return {
		description: options.description,
		navTitle: options.navTitle,
		order: options.order,
		title: options.title,
	};
}

export function defineGeneratedDocPage(
	options: SharedOptions,
): GeneratedDocPageDocument {
	return {
		[generatedDocPageMarker]: true,
		body: options.body,
		examples: options.examples ?? [],
		meta: toMeta(options),
		subsections: options.subsections,
	};
}

export function defineUniversalConceptPage(
	options: LegacyMirroredOptions,
): UniversalConceptPageDocument {
	return {
		[universalConceptPageMarker]: true,
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

export function defineUniversalConceptStubPage(
	options: Omit<LegacyMirroredOptions, "body" | "examples" | "subsections">,
): UniversalConceptPageDocument {
	return defineUniversalConceptPage(options);
}

export function defineLanguageOverlayPage(
	options: LegacyMirroredOptions,
): LanguageOverlayPageDocument {
	return {
		[languageOverlayPageMarker]: true,
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

export type {
	DocSection,
	GeneratedDocPageDocument,
	LanguageOverlayPageDocument,
	UniversalConceptPageDocument,
};
