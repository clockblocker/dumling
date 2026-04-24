import type {
	EntityValue,
	Selection,
	SupportedLanguage,
} from "../../../../src/types/public-types.ts";

export interface Frontmatter {
	description?: string;
	order: number;
	routeId?: string;
	title: string;
}

export interface SourcePage {
	frontmatter: Frontmatter;
	routeId: string;
	sourcePath: string;
}

export type AttestationSource = {
	classifierNotes?: string;
	entity: EntityValue;
	lessonsLearned?: string;
	order?: number;
	sentenceMarkdown?: string;
	sourcePath: string;
	title?: string;
};

export type SelectionSentenceParts = {
	selectedText: string;
	sentenceText: string;
};

export type SelectionAttestationSource = AttestationSource & {
	classifierNotes?: string;
	entity: Selection<SupportedLanguage>;
	lessonsLearned?: string;
	sentenceMarkdown: string;
	title: string;
};

export type LogbookFileKind = "classifier" | "reviewer" | "summary";
