import { pathToFileURL } from "node:url";
import type { AttestedSelection } from "../../../../../src/types/public-types.ts";
import type {
	DocCitePageDocument,
	DocCitePageFamily,
	DocPageMeta,
	DocSection,
	LegacyRuleDocument,
	TypedDocDocument,
	TypedDocExport,
} from "../../../../src/to-generate/docs/document-shapes.ts";
import { pathRelativeToSiteRoot } from "../../shared/paths";
import type { Frontmatter } from "../../shared/types";
import {
	canonicalSlugForDocMeta,
	frontmatterForDocMeta,
	parseDocPageMeta,
} from "../metadata";
import {
	generatedPathForTypedDoc,
	htmlRouteForRouteId,
	publicMarkdownPathForRouteId,
	routeIdForTypedDocSourcePath,
} from "../routes";

export type RuleBlock = {
	body?: string;
	examples: readonly AttestedSelection[];
	heading?: string;
};

export type RuleDocument = TypedDocDocument;

export type TypedDocSource = {
	document: RuleDocument;
	frontmatter: Frontmatter;
	generatedPath: string;
	htmlRoute: string;
	publicPath: string;
	routeId: string;
	sourcePath: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAttestedSelection(value: unknown): value is AttestedSelection {
	if (!isRecord(value)) {
		return false;
	}
	if (typeof value.sentenceMarkdown !== "string") {
		return false;
	}
	if (!isRecord(value.selection)) {
		return false;
	}
	return typeof value.selection.language === "string";
}

function parseRuleExample(
	value: unknown,
	sourcePath: string,
): AttestedSelection {
	if (!isAttestedSelection(value)) {
		throw new Error(
			`${sourcePath} rule examples must reference AttestedSelection sources.`,
		);
	}
	return value;
}

function parseRuleBlock(value: unknown, sourcePath: string): RuleBlock {
	if (!isRecord(value)) {
		throw new Error(`${sourcePath} has an invalid rule block.`);
	}
	if (value.heading !== undefined && typeof value.heading !== "string") {
		throw new Error(`${sourcePath} has a non-string rule block heading.`);
	}
	if (value.body !== undefined && typeof value.body !== "string") {
		throw new Error(`${sourcePath} has a non-string rule block body.`);
	}

	const examples =
		value.examples === undefined
			? []
			: Array.isArray(value.examples)
				? value.examples.map((example) =>
						parseRuleExample(example, sourcePath),
					)
				: (() => {
						throw new Error(
							`${sourcePath} rule blocks must define examples as an array when present.`,
						);
					})();

	return {
		body: value.body,
		examples,
		heading: value.heading,
	};
}

function parseRuleBlocks(
	value: unknown,
	sourcePath: string,
): readonly RuleBlock[] | undefined {
	if (value === undefined) {
		return undefined;
	}
	if (!Array.isArray(value)) {
		throw new Error(
			`${sourcePath} must export subsections as an array when present.`,
		);
	}

	return value.map((block) => parseRuleBlock(block, sourcePath));
}

function parseDocumentBody(
	value: unknown,
	sourcePath: string,
): string | undefined {
	if (value === undefined) {
		return undefined;
	}
	if (typeof value !== "string") {
		throw new Error(`${sourcePath} has a non-string document body.`);
	}
	return value;
}

function parseDocPageFamily(
	value: unknown,
	sourcePath: string,
): DocCitePageFamily {
	if (
		value !== "entity" &&
		value !== "surface" &&
		value !== "kind" &&
		value !== "pos" &&
		value !== "morpheme" &&
		value !== "phraseme" &&
		value !== "construction" &&
		value !== "feature" &&
		value !== "feature-selection" &&
		value !== "feature-surface"
	) {
		throw new Error(`${sourcePath} has an invalid doc.family value.`);
	}

	return value;
}

function parseNonEmptyString(
	value: unknown,
	fieldName: string,
	sourcePath: string,
): string {
	if (typeof value !== "string" || value.trim().length === 0) {
		throw new Error(`${sourcePath} is missing ${fieldName}.`);
	}

	return value.trim();
}

function normalizeDocRouteId(docId: string): string {
	return docId
		.replaceAll("\\", "/")
		.replace(/^\/+/u, "")
		.replace(/\/+$/u, "");
}

function normalizeHtmlRoute(htmlRoute: string, sourcePath: string): `/${string}` {
	const normalized = `/${htmlRoute
		.replaceAll("\\", "/")
		.replace(/^\/+/u, "")
		.replace(/\/+$/u, "")}`;

	if (!normalized.endsWith(".html")) {
		throw new Error(
			`${sourcePath} has invalid doc.htmlRoute "${htmlRoute}". Public doc-cite routes must end in .html.`,
		);
	}

	return normalized as `/${string}`;
}

function parseDocCiteSection(
	value: Record<string, unknown>,
	sourcePath: string,
): {
	body?: string;
	examples: readonly AttestedSelection[];
	meta: DocPageMeta;
	subsections?: readonly DocSection[];
} {
	const meta = parseDocPageMeta(value.meta, sourcePath);
	const body = parseDocumentBody(value.body, sourcePath);
	const examples =
		value.examples === undefined
			? []
			: Array.isArray(value.examples)
				? value.examples.map((example) =>
						parseRuleExample(example, sourcePath),
					)
				: (() => {
						throw new Error(`${sourcePath} must export examples as an array.`);
					})();

	return {
		body,
		examples,
		meta,
		subsections: parseRuleBlocks(value.subsections, sourcePath),
	};
}

function parseLegacyRuleDocument(
	value: Record<string, unknown>,
	sourcePath: string,
): LegacyRuleDocument {
	const parsed = parseDocCiteSection(value, sourcePath);

	return {
		body: parsed.body,
		examples: parsed.examples,
		meta: parsed.meta,
		subsections: parsed.subsections,
	};
}

function parseDocCitePageDocument(
	value: Record<string, unknown>,
	sourcePath: string,
): DocCitePageDocument {
	if (!isRecord(value.doc)) {
		throw new Error(`${sourcePath} must export a doc object.`);
	}

	const parsed = parseDocCiteSection(value, sourcePath);
	const docId = normalizeDocRouteId(
		parseNonEmptyString(value.doc.docId, "doc.docId", sourcePath),
	);
	const htmlRoute = normalizeHtmlRoute(
		parseNonEmptyString(value.doc.htmlRoute, "doc.htmlRoute", sourcePath),
		sourcePath,
	);
	const scope = parseNonEmptyString(value.doc.scope, "doc.scope", sourcePath);

	if (scope !== "de" && scope !== "u") {
		throw new Error(`${sourcePath} has an invalid doc.scope value.`);
	}

	const mirrorsDocId =
		value.doc.mirrorsDocId === undefined
			? undefined
			: normalizeDocRouteId(
					parseNonEmptyString(
						value.doc.mirrorsDocId,
						"doc.mirrorsDocId",
						sourcePath,
					),
				);

	return {
		body: parsed.body,
		doc: {
			docId,
			family: parseDocPageFamily(value.doc.family, sourcePath),
			htmlRoute: htmlRoute as `/${string}.html`,
			mirrorsDocId,
			scope,
			subject: parseNonEmptyString(
				value.doc.subject,
				"doc.subject",
				sourcePath,
			),
		},
		examples: parsed.examples,
		meta: parsed.meta,
		subsections: parsed.subsections,
	};
}

function parseTypedDocDocument(
	value: unknown,
	sourcePath: string,
): TypedDocDocument {
	if (!isRecord(value)) {
		throw new Error(
			`${sourcePath} must default-export a typed document object or document array.`,
		);
	}

	return "doc" in value
		? parseDocCitePageDocument(value, sourcePath)
		: parseLegacyRuleDocument(value, sourcePath);
}

function parseTypedDocExport(
	value: unknown,
	sourcePath: string,
): readonly TypedDocDocument[] {
	const exported = value as TypedDocExport;
	return Array.isArray(exported)
		? exported.map((entry) => parseTypedDocDocument(entry, sourcePath))
		: [parseTypedDocDocument(exported, sourcePath)];
}

function typedDocOutputForDocument(
	document: TypedDocDocument,
	sourcePath: string,
): TypedDocSource {
	if ("doc" in document) {
		const routeId = document.doc.docId;
		return {
			document,
			frontmatter: {
				...frontmatterForDocMeta(document.meta),
				generatedFrom: pathRelativeToSiteRoot(sourcePath),
				htmlRoute: document.doc.htmlRoute,
				routeId,
			},
			generatedPath: generatedPathForTypedDoc(routeId),
			htmlRoute: document.doc.htmlRoute,
			publicPath: publicMarkdownPathForRouteId(routeId),
			routeId,
			sourcePath,
		};
	}

	const slug = canonicalSlugForDocMeta(document.meta, sourcePath);
	const routeId = routeIdForTypedDocSourcePath(sourcePath, slug);

	return {
		document,
		frontmatter: {
			...frontmatterForDocMeta(document.meta),
			generatedFrom: pathRelativeToSiteRoot(sourcePath),
			routeId,
		},
		generatedPath: generatedPathForTypedDoc(routeId),
		htmlRoute: htmlRouteForRouteId(routeId),
		publicPath: publicMarkdownPathForRouteId(routeId),
		routeId,
		sourcePath,
	};
}

export async function loadTypedDocSource(
	sourcePath: string,
): Promise<readonly TypedDocSource[]> {
	const moduleExports = (await import(
		pathToFileURL(sourcePath).href
	)) as Record<string, unknown>;
	const documents = parseTypedDocExport(moduleExports.default, sourcePath);

	return documents.map((document) =>
		typedDocOutputForDocument(document, sourcePath),
	);
}
