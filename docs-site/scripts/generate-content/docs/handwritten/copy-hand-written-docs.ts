import { listMarkdownFiles, writeGeneratedMarkdown } from "../../shared/fs";
import { handWrittenDocsDir } from "../../shared/paths";
import type { DocsOutput } from "../types";
import { sourcePageFromDocsOutput } from "../types";
import { loadHandWrittenDoc } from "./load-hand-written-doc";

export function discoverHandWrittenDocs(): DocsOutput[] {
	return listMarkdownFiles(handWrittenDocsDir)
		.toSorted((left, right) => left.localeCompare(right))
		.map((sourcePath) => loadHandWrittenDoc(sourcePath));
}

export function copyHandWrittenDocs(outputs: DocsOutput[]) {
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
