import type { AttestedSelection } from "dumling/types";
import type { Prettify } from "../../../helper-types";

export type DocPageMeta = {
	description?: string;
	order?: number;
	slug?: string;
	title: string;
};

export type DocCitePageFamily =
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
			scope: "de" | "u";
			subject: string;
		};
		meta: DocPageMeta;
		subsections?: readonly DocSection[];
	}
>;

export type TypedDocDocument = LegacyRuleDocument | DocCitePageDocument;

export type TypedDocExport =
	| TypedDocDocument
	| readonly TypedDocDocument[];
