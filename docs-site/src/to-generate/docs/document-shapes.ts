import type { AttestedSelection } from "dumling/types";
import type { Prettify } from "../../../helper-types";

export type DocPageMeta = {
	description?: string;
	order?: number;
	slug?: string;
	title: string;
};

export const sourceMirroredDocPageMarker = "source-mirrored-doc-page";

export type DocCitePageFamily =
	| "scope"
	| "entity"
	| "surface"
	| "kind"
	| "pos"
	| "morpheme"
	| "phraseme"
	| "construction"
	| "feature"
	| "feature-selection"
	| "feature-surface";

export type DocSection = {
	body?: string;
	examples?: readonly AttestedSelection[];
	heading?: string;
};

export type LegacyRuleDocument = Prettify<
	DocSection & {
		meta: DocPageMeta;
		subsections?: readonly DocSection[];
	}
>;

export type DocCitePageDocument = Prettify<
	DocSection & {
		doc: {
			docId: string;
			family: DocCitePageFamily;
			htmlRoute: `/${string}.html`;
			mirrorsDocId?: string;
			scope: string;
			subject: string;
		};
		meta: DocPageMeta;
		subsections?: readonly DocSection[];
	}
>;

export type SourceMirroredLeaf =
	| string
	| {
			docId: string;
			html: string;
	  };

export type SourceMirroredDocCitePageDefinition = Prettify<
	DocSection & {
		doc: {
			family: DocCitePageFamily;
			leaf?: SourceMirroredLeaf;
			subject: string;
		};
		meta: DocPageMeta;
		subsections?: readonly DocSection[];
		[sourceMirroredDocPageMarker]: true;
	}
>;

export type TypedDocDocument = LegacyRuleDocument | DocCitePageDocument;

export type TypedDocSourceDefinition =
	| TypedDocDocument
	| SourceMirroredDocCitePageDefinition;

export type TypedDocExport =
	| TypedDocSourceDefinition
	| readonly TypedDocSourceDefinition[];
