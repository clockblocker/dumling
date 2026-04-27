import { existsSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { listMarkdownFiles, listTypeScriptFiles } from "../shared/fs";
import { handWrittenDocsDir, sourceTypedDocsDir } from "../shared/paths";
import { parseFrontmatter } from "./frontmatter";
import { routeIdForHandWrittenSourcePath } from "./routes";
import { normalizeTypedDocSources } from "./typed/normalize-typed-doc-sources";

function normalizeRelativePath(path: string): string {
	return path.replaceAll("\\", "/");
}

function assertTypedDocsTreeContainsNoMarkdown(): void {
	const markdownFiles = listMarkdownFiles(sourceTypedDocsDir);
	if (markdownFiles.length === 0) {
		return;
	}

	throw new Error(
		`Markdown files are not allowed under src/to-generate/docs: ${markdownFiles.toSorted().join(", ")}.`,
	);
}

function assertHandWrittenTreeContainsNoTypeScript(): void {
	const typeScriptFiles = listTypeScriptFiles(handWrittenDocsDir);
	if (typeScriptFiles.length === 0) {
		return;
	}

	throw new Error(
		`TypeScript files are not allowed under src/hand-written: ${typeScriptFiles.toSorted().join(", ")}.`,
	);
}

function validateHandWrittenSectionIndexes(): void {
	const markdownFiles = listMarkdownFiles(handWrittenDocsDir).toSorted(
		(left, right) => left.localeCompare(right),
	);
	const routeIds = new Map<string, string>();

	for (const sourcePath of markdownFiles) {
		const routeId = routeIdForHandWrittenSourcePath(sourcePath);
		const existing = routeIds.get(routeId);
		if (existing !== undefined) {
			throw new Error(
				`Hand-written docs route collision: ${existing} and ${sourcePath} both resolve to /${routeId}/.`,
			);
		}
		routeIds.set(routeId, sourcePath);

		const { frontmatter } = parseFrontmatter(
			readFileSync(sourcePath, "utf8"),
			sourcePath,
		);
		if (frontmatter.routeId !== undefined) {
			throw new Error(
				`${sourcePath} declares routeId, but docs routes are path-based.`,
			);
		}

		const relativePath = normalizeRelativePath(
			relative(handWrittenDocsDir, sourcePath),
		);
		const lastDirectoryName = basename(relativePath, ".md");
		const parentDirectory = relativePath.slice(
			0,
			Math.max(0, relativePath.lastIndexOf("/")),
		);
		const parentName = basename(parentDirectory);
		const siblingIndexPath =
			parentDirectory.length === 0
				? join(handWrittenDocsDir, "index.md")
				: join(handWrittenDocsDir, parentDirectory, "index.md");

		if (
			parentName.length > 0 &&
			lastDirectoryName === parentName &&
			existsSync(siblingIndexPath)
		) {
			throw new Error(
				`${sourcePath} is not allowed because ${siblingIndexPath} is the canonical section index page.`,
			);
		}
	}
}

export async function runDocsHousekeeping(): Promise<void> {
	assertTypedDocsTreeContainsNoMarkdown();
	assertHandWrittenTreeContainsNoTypeScript();
	await normalizeTypedDocSources();
	validateHandWrittenSectionIndexes();
}
