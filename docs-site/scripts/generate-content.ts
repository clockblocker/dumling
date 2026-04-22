import {
	existsSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
	collectBlocksFromDirectory,
	renderMarkdownTemplate,
} from "../../scripts/doc-blocks";

interface Frontmatter {
	description?: string;
	order: number;
	title: string;
}

interface SourcePage {
	frontmatter: Frontmatter;
	routeId: string;
	sourcePath: string;
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(scriptDir, "..");
const repoRoot = resolve(siteRoot, "..");
const sourceDocsDir = join(siteRoot, "src/content/docs");
const generatedDocsDir = join(siteRoot, "src/generated/docs");
const publicDir = join(siteRoot, "public");
const readmeExamplesDir = join(repoRoot, "generate-readme/examples");

function listMarkdownFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const entryPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			return listMarkdownFiles(entryPath);
		}
		if (entry.isFile() && entry.name.endsWith(".md")) {
			return [entryPath];
		}
		return [];
	});
}

function routeIdForSourcePath(sourcePath: string): string {
	return relative(sourceDocsDir, sourcePath).replace(/\.md$/, "");
}

function publicMarkdownPathForRouteId(routeId: string): string {
	return routeId === "index"
		? join(publicDir, "index.md")
		: join(publicDir, `${routeId}.md`);
}

function parseFrontmatter(
	sourceText: string,
	sourcePath: string,
): {
	body: string;
	frontmatter: Frontmatter;
} {
	if (!sourceText.startsWith("---\n")) {
		throw new Error(`${sourcePath} is missing frontmatter.`);
	}

	const endIndex = sourceText.indexOf("\n---\n", 4);
	if (endIndex === -1) {
		throw new Error(`${sourcePath} has unterminated frontmatter.`);
	}

	const frontmatterText = sourceText.slice(4, endIndex);
	const body = sourceText
		.slice(endIndex + "\n---\n".length)
		.replace(/^\n/, "");
	const values = new Map<string, string>();

	for (const rawLine of frontmatterText.split("\n")) {
		const line = rawLine.trim();
		if (line.length === 0) {
			continue;
		}
		const separatorIndex = line.indexOf(":");
		if (separatorIndex === -1) {
			throw new Error(
				`Invalid frontmatter line in ${sourcePath}: ${rawLine}`,
			);
		}
		values.set(
			line.slice(0, separatorIndex).trim(),
			line.slice(separatorIndex + 1).trim(),
		);
	}

	const title = values.get("title");
	if (title === undefined || title.length === 0) {
		throw new Error(`${sourcePath} is missing a title.`);
	}

	const orderText = values.get("order") ?? "0";
	const order = Number(orderText);
	if (!Number.isFinite(order)) {
		throw new Error(`${sourcePath} has an invalid order: ${orderText}`);
	}

	return {
		body,
		frontmatter: {
			description: values.get("description"),
			order,
			title,
		},
	};
}

function serializeFrontmatter(frontmatter: Frontmatter): string {
	const lines = [
		"---",
		`title: ${frontmatter.title}`,
		...(frontmatter.description === undefined
			? []
			: [`description: ${frontmatter.description}`]),
		`order: ${frontmatter.order}`,
		"---",
	];

	return `${lines.join("\n")}\n`;
}

function ensureCleanDir(dir: string): void {
	if (existsSync(dir)) {
		rmSync(dir, { recursive: true });
	}
	mkdirSync(dir, { recursive: true });
}

function writeGeneratedMarkdown(
	routeId: string,
	frontmatter: Frontmatter,
	body: string,
): void {
	const generatedPath = join(generatedDocsDir, `${routeId}.md`);
	mkdirSync(dirname(generatedPath), { recursive: true });
	writeFileSync(
		generatedPath,
		`${serializeFrontmatter(frontmatter)}\n${body}`,
	);

	const publicPath = publicMarkdownPathForRouteId(routeId);
	mkdirSync(dirname(publicPath), { recursive: true });
	writeFileSync(publicPath, body);
}

function writeNavFiles(pages: SourcePage[]): void {
	const navItems = pages
		.toSorted((left, right) => {
			const orderDelta = left.frontmatter.order - right.frontmatter.order;
			if (orderDelta !== 0) {
				return orderDelta;
			}
			return left.frontmatter.title.localeCompare(
				right.frontmatter.title,
			);
		})
		.map((page) => ({
			href: page.routeId === "index" ? "/" : `/${page.routeId}/`,
			mdHref:
				page.routeId === "index" ? "/index.md" : `/${page.routeId}.md`,
			title: page.frontmatter.title,
		}));

	writeFileSync(
		join(publicDir, "nav.json"),
		`${JSON.stringify(navItems, null, 2)}\n`,
	);
	writeFileSync(
		join(publicDir, "nav.md"),
		`${navItems
			.map(
				(item) =>
					`- [${item.title}](${item.href}) ([md](${item.mdHref}))`,
			)
			.join("\n")}\n`,
	);
}

function generateContent(): void {
	const blocks = collectBlocksFromDirectory({
		examplesDir: readmeExamplesDir,
		markerPrefix: "README_BLOCK",
	});
	const pages: SourcePage[] = [];

	ensureCleanDir(generatedDocsDir);
	mkdirSync(publicDir, { recursive: true });

	for (const sourcePath of listMarkdownFiles(sourceDocsDir)) {
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

		writeGeneratedMarkdown(routeId, frontmatter, renderedBody);
		pages.push({ frontmatter, routeId, sourcePath });
	}

	writeNavFiles(pages);
}

generateContent();
