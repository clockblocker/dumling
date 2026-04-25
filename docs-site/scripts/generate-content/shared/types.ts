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
	classificationMistakes?: string;
	entity: EntityValue;
	isVerified?: true;
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
	classificationMistakes?: string;
	entity: Selection<SupportedLanguage>;
	isVerified?: true;
	sentenceMarkdown: string;
	title: string;
};

export type LogbookFileKind = "classifier" | "reviewer" | "summary";
