import {
	existsSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getLanguageApi } from "../../src/index.ts";
import type {
	EntityKind,
	EntityValue,
	Lemma,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../src/types/public-types.ts";
import {
	collectBlocksFromDirectory,
	renderMarkdownTemplate,
} from "../../scripts/doc-blocks";

interface Frontmatter {
	description?: string;
	order: number;
	slug?: string;
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
const sourceAttestationsDir = join(
	siteRoot,
	"src/content/attestations-to-generate",
);
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

function listTypeScriptFiles(dir: string): string[] {
	if (!existsSync(dir)) {
		return [];
	}

	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const entryPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			return listTypeScriptFiles(entryPath);
		}
		if (
			entry.isFile() &&
			entry.name.endsWith(".ts") &&
			!entry.name.endsWith(".d.ts")
		) {
			return [entryPath];
		}
		return [];
	});
}

function routeIdForSourcePath(sourcePath: string): string {
	const routeId = relative(sourceDocsDir, sourcePath).replace(/\.md$/, "");
	return routeId.endsWith("/index")
		? routeId.slice(0, -"/index".length)
		: routeId;
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
		...(frontmatter.slug === undefined ? [] : [`slug: ${frontmatter.slug}`]),
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

function removeGeneratedPublicFiles(dir: string): void {
	if (!existsSync(dir)) {
		return;
	}

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const entryPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			removeGeneratedPublicFiles(entryPath);
			if (readdirSync(entryPath).length === 0) {
				rmSync(entryPath, { recursive: true });
			}
			continue;
		}
		if (
			entry.isFile() &&
			(entry.name.endsWith(".md") || entry.name === "nav.json")
		) {
			rmSync(entryPath);
		}
	}
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

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object";
}

function isSupportedLanguage(value: unknown): value is SupportedLanguage {
	return value === "de" || value === "en" || value === "he";
}

function languageLabelFor(language: SupportedLanguage): string {
	return {
		de: "German",
		en: "English",
		he: "Hebrew",
	}[language];
}

function isLemma(value: unknown): value is Lemma<SupportedLanguage> {
	return (
		isRecord(value) &&
		isSupportedLanguage(value.language) &&
		typeof value.canonicalLemma === "string" &&
		typeof value.lemmaKind === "string" &&
		typeof value.lemmaSubKind === "string" &&
		isRecord(value.inherentFeatures) &&
		typeof value.meaningInEmojis === "string"
	);
}

function isSurface(value: unknown): value is Surface<SupportedLanguage> {
	return (
		isRecord(value) &&
		isSupportedLanguage(value.language) &&
		typeof value.normalizedFullSurface === "string" &&
		typeof value.surfaceKind === "string" &&
		isLemma(value.lemma)
	);
}

function isSelection(value: unknown): value is Selection<SupportedLanguage> {
	return (
		isRecord(value) &&
		isSupportedLanguage(value.language) &&
		typeof value.orthographicStatus === "string" &&
		typeof value.selectionCoverage === "string" &&
		typeof value.spelledSelection === "string" &&
		typeof value.spellingRelation === "string" &&
		isSurface(value.surface)
	);
}

function isEntityValue(value: unknown): value is EntityValue {
	return isSelection(value) || isSurface(value) || isLemma(value);
}

function entityKindFor(value: EntityValue): EntityKind {
	if (isSelection(value)) {
		return "Selection";
	}
	if (isSurface(value)) {
		return "Surface";
	}
	return "Lemma";
}

function surfaceForEntity(
	value: Surface<SupportedLanguage> | Selection<SupportedLanguage>,
): Surface<SupportedLanguage> {
	return isSelection(value) ? value.surface : value;
}

function lemmaForEntity(value: EntityValue): Lemma<SupportedLanguage> {
	if (isSelection(value)) {
		return value.surface.lemma;
	}
	if (isSurface(value)) {
		return value.lemma;
	}
	return value;
}

type AttestationSource = {
	entity: EntityValue;
	order?: number;
	sentenceMarkdown?: string;
	sourcePath: string;
	title?: string;
};

function getWrappedAttestation(
	moduleExports: Record<string, unknown>,
	sourcePath: string,
): Omit<AttestationSource, "sourcePath"> | undefined {
	const wrapped = moduleExports.attestation;
	if (wrapped === undefined) {
		return undefined;
	}
	if (!isRecord(wrapped)) {
		throw new Error(`${sourcePath} exports attestation, but it is not an object.`);
	}

	const entityEntries = [
		["lemma", wrapped.lemma],
		["surface", wrapped.surface],
		["selection", wrapped.selection],
	].filter(([, value]) => isEntityValue(value));

	if (entityEntries.length !== 1) {
		throw new Error(
			`${sourcePath} attestation must contain exactly one lemma, surface, or selection.`,
		);
	}

	const order =
		typeof wrapped.order === "number" && Number.isFinite(wrapped.order)
			? wrapped.order
			: undefined;
	const sentenceMarkdown =
		typeof wrapped.sentenceMarkdown === "string"
			? wrapped.sentenceMarkdown
			: undefined;
	const title =
		typeof wrapped.title === "string" && wrapped.title.length > 0
			? wrapped.title
			: undefined;

	return {
		entity: entityEntries[0]?.[1] as EntityValue,
		order,
		sentenceMarkdown,
		title,
	};
}

function getDirectAttestation(
	moduleExports: Record<string, unknown>,
	sourcePath: string,
): Omit<AttestationSource, "sourcePath"> {
	const entityExports = Object.entries(moduleExports).filter(([, value]) =>
		isEntityValue(value),
	);
	if (entityExports.length !== 1) {
		throw new Error(
			`${sourcePath} must export exactly one dumling entity or one attestation wrapper.`,
		);
	}

	return { entity: entityExports[0]?.[1] as EntityValue };
}

async function loadAttestationSource(
	sourcePath: string,
): Promise<AttestationSource> {
	const moduleExports = (await import(
		pathToFileURL(sourcePath).href
	)) as Record<string, unknown>;
	const attestation =
		getWrappedAttestation(moduleExports, sourcePath) ??
		getDirectAttestation(moduleExports, sourcePath);

	return { ...attestation, sourcePath };
}

function expectedEntityKindForPath(sourcePath: string): EntityKind | undefined {
	const [, kindDirectory] = relative(sourceAttestationsDir, sourcePath).split(
		/[\\/]/u,
	);
	if (kindDirectory === "lemma") {
		return "Lemma";
	}
	if (kindDirectory === "surface") {
		return "Surface";
	}
	if (kindDirectory === "selection") {
		return "Selection";
	}
	return undefined;
}

function validateAttestationPath(source: AttestationSource, base64UrlId: string) {
	const expectedKind = expectedEntityKindForPath(source.sourcePath);
	const actualKind = entityKindFor(source.entity);
	if (expectedKind !== undefined && expectedKind !== actualKind) {
		throw new Error(
			`${source.sourcePath} lives under ${expectedKind.toLowerCase()}, but exports ${actualKind}.`,
		);
	}

	const actualBaseName = basename(source.sourcePath, ".ts");
	if (actualBaseName !== base64UrlId) {
		throw new Error(
			`${source.sourcePath} must be named ${base64UrlId}.ts for its generated ID.`,
		);
	}
}

function camelCaseIdentifier(text: string, fallback: string): string {
	const words = text
		.normalize("NFKD")
		.replace(/[^\dA-Za-z]+/gu, " ")
		.trim()
		.split(/\s+/u)
		.filter(Boolean);

	if (words.length === 0) {
		return fallback;
	}

	const identifier = words
		.map((word, index) => {
			const lower = word.toLowerCase();
			return index === 0
				? lower
				: `${lower[0]?.toUpperCase() ?? ""}${lower.slice(1)}`;
		})
		.join("");

	return /^\d/u.test(identifier) ? `${fallback}${identifier}` : identifier;
}

function renderTsValue(value: unknown, indent = 0): string {
	const indentation = "\t".repeat(indent);
	const childIndentation = "\t".repeat(indent + 1);

	if (Array.isArray(value)) {
		if (value.length === 0) {
			return "[]";
		}
		return `[\n${value
			.map((entry) => `${childIndentation}${renderTsValue(entry, indent + 1)},`)
			.join("\n")}\n${indentation}]`;
	}

	if (isRecord(value)) {
		const entries = Object.entries(value).filter(
			([, entryValue]) => entryValue !== undefined,
		);
		if (entries.length === 0) {
			return "{}";
		}
		return `{\n${entries
			.map(
				([key, entryValue]) =>
					`${childIndentation}${key}: ${renderTsValue(
						entryValue,
						indent + 1,
					)},`,
			)
			.join("\n")}\n${indentation}}`;
	}

	return JSON.stringify(value);
}

function typeExpressionForEntity(entity: EntityValue): string {
	const lemma = lemmaForEntity(entity);
	if (isSelection(entity)) {
		return `Selection<"${entity.language}", "${entity.orthographicStatus}", "${entity.surface.surfaceKind}", "${lemma.lemmaKind}", "${lemma.lemmaSubKind}">`;
	}
	if (isSurface(entity)) {
		return `Surface<"${entity.language}", "${entity.surfaceKind}", "${lemma.lemmaKind}", "${lemma.lemmaSubKind}">`;
	}
	return `Lemma<"${entity.language}", "${lemma.lemmaKind}", "${lemma.lemmaSubKind}">`;
}

function classificationLinesForEntity(entity: EntityValue): string[] {
	const lemma = lemmaForEntity(entity);
	if (isSelection(entity)) {
		return [
			`- \`${entity.selectionCoverage}\` **Selection**`,
			`- \`${lemma.lemmaSubKind}\` **${lemma.lemmaKind}**`,
			`- **Lemma** _"${lemma.canonicalLemma}"_`,
		];
	}
	if (isSurface(entity)) {
		return [
			`- \`${entity.surfaceKind}\` **Surface**`,
			`- \`${lemma.lemmaSubKind}\` **${lemma.lemmaKind}**`,
			`- **Lemma** _"${lemma.canonicalLemma}"_`,
		];
	}
	return [
		`- **Lemma** _"${lemma.canonicalLemma}"_`,
		`- \`${lemma.lemmaSubKind}\` **${lemma.lemmaKind}**`,
	];
}

function renderAttestationBody(
	source: AttestationSource,
	csvId: string,
): string {
	const entity = source.entity;
	const kind = entityKindFor(entity);
	const lemma = lemmaForEntity(entity);
	const surface =
		isSelection(entity) || isSurface(entity) ? surfaceForEntity(entity) : undefined;
	const displayName =
		surface?.normalizedFullSurface ?? lemma.canonicalLemma;
	const variableBase = camelCaseIdentifier(displayName, "attested");
	const entityVariable = `${variableBase}${kind}`;
	const idVariable = `${entityVariable}Id`;
	const importType = typeExpressionForEntity(entity).split("<", 1)[0];
	const title = source.title ?? displayName;
	const selectedText = isSelection(entity)
		? ` for the selected spelling **${entity.spelledSelection}**`
		: "";
	const sentenceBlock =
		source.sentenceMarkdown === undefined
			? ""
			: `\nSentence:\n\n- *${source.sentenceMarkdown}*\n`;
	const idNote = isSelection(entity)
		? "\nSelection IDs use the linked `Surface` CSV. Selection spelling and coverage metadata do not change the ID.\n"
		: "\nIDs are emitted as canonical CSV.\n";

	return `# ${languageLabelFor(entity.language)} attestation: ${title}

This attestation records one learner-facing ${kind.toLowerCase()} classification${selectedText}.
${sentenceBlock}
Classification:

${classificationLinesForEntity(entity).join("\n")}
${idNote}
\`\`\`ts
import type { ${importType} } from "dumling/types";

export const ${entityVariable} = ${renderTsValue(entity)} satisfies ${typeExpressionForEntity(entity)};

export const ${idVariable} =
\t${JSON.stringify(csvId)} as const;
\`\`\`
`;
}

function generatedFrontmatterForAttestation(
	source: AttestationSource,
	routeId: string,
): Frontmatter {
	const entity = source.entity;
	const lemma = lemmaForEntity(entity);
	const surface =
		isSelection(entity) || isSurface(entity) ? surfaceForEntity(entity) : undefined;
	const displayName =
		source.title ?? surface?.normalizedFullSurface ?? lemma.canonicalLemma;

	return {
		description: `Valid dumling object and CSV ID for ${displayName}.`,
		order: source.order ?? 1000,
		slug: routeId,
		title: `${languageLabelFor(entity.language)} attestation - ${displayName}`,
	};
}

async function generateAttestationMarkdown(): Promise<SourcePage[]> {
	const pages: SourcePage[] = [];

	for (const sourcePath of listTypeScriptFiles(sourceAttestationsDir)) {
		const source = await loadAttestationSource(sourcePath);
		const languageApi = getLanguageApi(source.entity.language);
		const base64UrlId = String(languageApi.id.encode.asBase64Url(source.entity));
		validateAttestationPath(source, base64UrlId);

		const routeId = `lang/${source.entity.language}/attestation/${base64UrlId}`;
		const frontmatter = generatedFrontmatterForAttestation(source, routeId);
		const body = renderAttestationBody(
			source,
			String(languageApi.id.encode.asCsv(source.entity)),
		);

		writeGeneratedMarkdown(routeId, frontmatter, body);
		pages.push({ frontmatter, routeId, sourcePath });
	}

	return pages;
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

async function generateContent(): Promise<void> {
	const blocks = collectBlocksFromDirectory({
		examplesDir: readmeExamplesDir,
		markerPrefix: "README_BLOCK",
	});
	const pages: SourcePage[] = [];

	ensureCleanDir(generatedDocsDir);
	mkdirSync(publicDir, { recursive: true });
	removeGeneratedPublicFiles(publicDir);

	pages.push(...(await generateAttestationMarkdown()));

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

await generateContent();
