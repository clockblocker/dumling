import { writeGeneratedMarkdown } from "../../shared/fs";
import type { DocsOutput } from "../types";
import { sourcePageFromDocsOutput } from "../types";
import type { TypedDocsGenerationConfig } from "./config";
import { listTypedDocEntrypoints } from "./list-typed-doc-entrypoints";
import { loadTypedDocSource } from "./load-typed-doc-source";
import { renderRuleDocument } from "./render-rule-document";

export async function discoverTypedDocs(
	config: TypedDocsGenerationConfig,
): Promise<DocsOutput[]> {
	const entrypoints = listTypedDocEntrypoints();
	const sources = await Promise.all(
		entrypoints.map((sourcePath) => loadTypedDocSource(sourcePath)),
	);

	return sources.map((source) => ({
		body: renderRuleDocument(source.document, config),
		frontmatter: source.frontmatter,
		generatedPath: source.generatedPath,
		publicPath: source.publicPath,
		routeId: source.routeId,
		sourcePath: source.sourcePath,
	}));
}

export function writeTypedDocs(outputs: DocsOutput[]) {
	for (const output of outputs) {
		writeGeneratedMarkdown(
			output.generatedPath,
			output.frontmatter,
			output.body,
			output.publicPath,
		);
	}

	return outputs.map((output) => sourcePageFromDocsOutput(output));
}
