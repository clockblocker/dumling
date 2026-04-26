import type { AttestedSelection } from "dumling/types";
import type { Prettify } from "../../../../../../helper-types";

type DocPageMeta = {
	description?: string;
	order?: number;
	slug?: string;
	title: string;
};

type RuleBlock = {
	body?: string;
	examples: readonly AttestedSelection[];
	heading?: string;
};

export type RuleDocument = Prettify<{
	blocks: readonly RuleBlock[];
	meta: DocPageMeta;
}>;
