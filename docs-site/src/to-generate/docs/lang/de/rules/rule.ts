import type { AttestedSelection } from "dumling/types";

type DocPageMeta = {
	description?: string;
	order?: number;
	slug?: string;
	title: string;
};

type RuleExample = {
	render?: string;
	selection: AttestedSelection;
};

type RuleBlock = {
	body?: string;
	examples: readonly RuleExample[];
	heading?: string;
	render?: string;
};

export type RuleDocument = {
	blocks: readonly RuleBlock[];
	meta: DocPageMeta;
};

export function defineRuleDocument(document: RuleDocument): RuleDocument {
	return document;
}
