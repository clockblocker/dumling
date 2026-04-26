import type { AttestedSelection } from "dumling/types";
import type { Prettify } from "../../../../../../helper-types";

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

type RuleBlock = Prettify<{
	body?: string;
	examples: readonly RuleExample[];
	heading?: string;
	render?: string;
}>;

export type RuleDocument = Prettify<{
	blocks: readonly RuleBlock[];
	meta: DocPageMeta;
}>;
