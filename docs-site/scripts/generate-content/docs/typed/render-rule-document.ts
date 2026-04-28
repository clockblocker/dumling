import type { AttestedSelection } from "../../../../../src/types/public-types.ts";
import type { TypedDocsGenerationConfig } from "./config";
import type { RuleDocument } from "./load-typed-doc-source";

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
	const examples = document.examples ?? [];

	if (document.body !== undefined && document.body.trim().length > 0) {
		sections.push(document.body.trim());
	}
	if (examples.length > 0) {
		sections.push(
			[
				"Examples:",
				...examples.map((example) =>
					renderRuleExample(example, config, document.meta.title),
				),
			].join("\n"),
		);
	}

	for (const subsection of document.subsections ?? []) {
		if (subsection.heading !== undefined) {
			sections.push(`## ${subsection.heading}`);
		} else {
			sections.push("---");
		}
		if (
			subsection.body !== undefined &&
			subsection.body.trim().length > 0
		) {
			sections.push(subsection.body.trim());
		}
		const subsectionExamples = subsection.examples ?? [];
		if (subsectionExamples.length > 0) {
			sections.push(
				[
					"Examples:",
					...subsectionExamples.map((example) =>
						renderRuleExample(example, config, document.meta.title),
					),
				].join("\n"),
			);
		}
	}

	return `${sections.join("\n\n").trim()}\n`;
}
