import { join } from "node:path";
import { readFileSync } from "node:fs";
import {
	collectBlocksFromDirectory,
	renderMarkdownTemplate,
} from "../../../../scripts/doc-blocks";
import { parseFrontmatter } from "./frontmatter";
import { publicMarkdownPathForRouteId, routeIdForSourcePath } from "./routes";
import { listMarkdownFiles, writeGeneratedMarkdown } from "../shared/fs";
import {
	generatedDocsDir,
	readmeExamplesDir,
	sourceDocsDir,
} from "../shared/paths";
import type { SourcePage } from "../shared/types";

export function generateDocPages(): SourcePage[] {
	const blocks = collectBlocksFromDirectory({
		examplesDir: readmeExamplesDir,
		markerPrefix: "README_BLOCK",
	});

	return listMarkdownFiles(sourceDocsDir).map((sourcePath) => {
		const routeId = routeIdForSourcePath(sourcePath);
		const { body, frontmatter } = parseFrontmatter(
			readFileSync(sourcePath, "utf8"),
			sourcePath,
		);
		const renderedBody = renderMarkdownTemplate({
			allowUnusedBlocks: true,
			blocks,
			markerPrefix: "DOC_BLOCK",
			templateText: body,
		});

		writeGeneratedMarkdown(
			join(generatedDocsDir, `${routeId}.md`),
			frontmatter,
			renderedBody,
			publicMarkdownPathForRouteId(routeId),
		);

		return { frontmatter, routeId, sourcePath };
	});
}
