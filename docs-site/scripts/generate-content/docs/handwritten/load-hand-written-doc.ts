import { readFileSync } from "node:fs";
import {
	collectBlocksFromDirectory,
	renderMarkdownTemplate,
} from "../../../../../scripts/doc-blocks";
import { pathRelativeToSiteRoot, readmeExamplesDir } from "../../shared/paths";
import { parseFrontmatter } from "../frontmatter";
import {
	generatedPathForHandWrittenDoc,
	htmlRouteForRouteId,
	publicMarkdownPathForRouteId,
	routeIdForHandWrittenSourcePath,
} from "../routes";
import type { DocsOutput } from "../types";

const markdownBlocks = collectBlocksFromDirectory({
	examplesDir: readmeExamplesDir,
	markerPrefix: "README_BLOCK",
});

export function loadHandWrittenDoc(sourcePath: string): DocsOutput {
	const routeId = routeIdForHandWrittenSourcePath(sourcePath);
	const { body, frontmatter } = parseFrontmatter(
		readFileSync(sourcePath, "utf8"),
		sourcePath,
	);

	if (frontmatter.routeId !== undefined) {
		throw new Error(
			`${sourcePath} declares routeId, but docs routes are path-based.`,
		);
	}

	const renderedBody = renderMarkdownTemplate({
		allowUnusedBlocks: true,
		blocks: markdownBlocks,
		markerPrefix: "DOC_BLOCK",
		templateText: body,
	});

	return {
		body: renderedBody,
		frontmatter: {
			description: frontmatter.description,
			generatedFrom: pathRelativeToSiteRoot(sourcePath),
			order: frontmatter.order,
			routeId,
			title: frontmatter.title,
		},
		generatedPath: generatedPathForHandWrittenDoc(sourcePath),
		htmlRoute: htmlRouteForRouteId(routeId),
		publicPath: publicMarkdownPathForRouteId(routeId),
		routeId,
		sourcePath,
	};
}
