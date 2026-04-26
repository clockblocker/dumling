import type { TypedDocsGenerationConfig } from "./config";
import type { RuleDocument } from "./load-typed-doc-source";
import type { AttestedSelection } from "../../../../../src/types/public-types.ts";

function renderRuleExample(
	example: AttestedSelection,
	config: TypedDocsGenerationConfig,
	sourceTitle: string,
): string {
	const renderer =
		config.attestedSelectionRenderers[
			config.defaultAttestedSelectionRenderer
		];
	if (renderer === undefined) {
		throw new Error(
			`${sourceTitle} references unknown attested-selection renderer "${config.defaultAttestedSelectionRenderer}".`,
		);
	}

	return renderer(example);
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
				[
					"Examples:",
					...block.examples.map((example) =>
						renderRuleExample(
							example,
							config,
							document.meta.title,
						),
					),
				].join("\n"),
			);
		}
	}

	return `${sections.join("\n\n").trim()}\n`;
}
