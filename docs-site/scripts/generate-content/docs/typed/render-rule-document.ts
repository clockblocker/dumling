import type { TypedDocsGenerationConfig } from "./config";
import type { RuleDocument, RuleExample } from "./load-typed-doc-source";

function renderSentenceMarkdown(sentenceMarkdown: string): string {
	return sentenceMarkdown
		.trim()
		.split("\n")
		.map((line) => `> ${line.trimEnd()}`)
		.join("\n");
}

function renderRuleExample(
	example: RuleExample,
	rendererName: string,
	config: TypedDocsGenerationConfig,
	sourceTitle: string,
): string {
	const renderer = config.attestedSelectionRenderers[rendererName];
	if (renderer === undefined) {
		throw new Error(
			`${sourceTitle} references unknown attested-selection renderer "${rendererName}".`,
		);
	}

	return [
		renderSentenceMarkdown(example.selection.sentenceMarkdown),
		"```text",
		renderer(example.selection),
		"```",
	].join("\n");
}

export function renderRuleDocument(
	document: RuleDocument,
	config: TypedDocsGenerationConfig,
): string {
	const sections = [`# ${document.meta.title}`];

	for (const block of document.blocks) {
		if (block.heading !== undefined) {
			sections.push(`## ${block.heading}`);
		}
		if (block.body !== undefined && block.body.trim().length > 0) {
			sections.push(block.body.trim());
		}
		if (block.examples.length > 0) {
			sections.push(
				block.examples
					.map((example) =>
						renderRuleExample(
							example,
							example.render ??
								block.render ??
								config.defaultAttestedSelectionRenderer,
							config,
							document.meta.title,
						),
					)
					.join("\n\n"),
			);
		}
	}

	return `${sections.join("\n\n").trim()}\n`;
}
