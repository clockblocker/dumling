import { pathToFileURL } from "node:url";
import type { AttestedSelection } from "../../../../../src/types/public-types.ts";
import { pathRelativeToSiteRoot } from "../../shared/paths";
import {
	canonicalSlugForDocMeta,
	frontmatterForDocMeta,
	parseDocPageMeta,
} from "../metadata";
import {
	generatedPathForTypedDoc,
	publicMarkdownPathForRouteId,
	routeIdForTypedDocSourcePath,
} from "../routes";

export type RuleBlock = {
	body?: string;
	examples: readonly AttestedSelection[];
	heading?: string;
};

export type RuleDocument = {
	body?: string;
	examples: readonly AttestedSelection[];
	meta: {
		description?: string;
		order?: number;
		slug?: string;
		title: string;
	};
	subsections?: readonly RuleBlock[];
};

export type TypedDocSource = {
	document: RuleDocument;
	frontmatter: ReturnType<typeof frontmatterForDocMeta>;
	generatedPath: string;
	publicPath: string;
	routeId: string;
	slug: string;
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
	if (!Array.isArray(value.examples)) {
		throw new Error(
			`${sourcePath} rule blocks must define an examples array.`,
		);
	}
	if (value.heading !== undefined && typeof value.heading !== "string") {
		throw new Error(`${sourcePath} has a non-string rule block heading.`);
	}
	if (value.body !== undefined && typeof value.body !== "string") {
		throw new Error(`${sourcePath} has a non-string rule block body.`);
	}

	return {
		body: value.body,
		examples: value.examples.map((example) =>
			parseRuleExample(example, sourcePath),
		),
		heading: value.heading,
	};
}

function parseRuleDocument(value: unknown, sourcePath: string): RuleDocument {
	if (!isRecord(value)) {
		throw new Error(
			`${sourcePath} must default-export a typed document object.`,
		);
	}
	if (!Array.isArray(value.examples)) {
		throw new Error(`${sourcePath} must export an examples array.`);
	}
	if (value.body !== undefined && typeof value.body !== "string") {
		throw new Error(`${sourcePath} has a non-string document body.`);
	}
	if (value.subsections !== undefined && !Array.isArray(value.subsections)) {
		throw new Error(
			`${sourcePath} must export subsections as an array when present.`,
		);
	}

	return {
		body: value.body,
		examples: value.examples.map((example) =>
			parseRuleExample(example, sourcePath),
		),
		meta: parseDocPageMeta(value.meta, sourcePath),
		subsections: value.subsections?.map((block) =>
			parseRuleBlock(block, sourcePath),
		),
	};
}

export async function loadTypedDocSource(
	sourcePath: string,
): Promise<TypedDocSource> {
	const moduleExports = (await import(
		pathToFileURL(sourcePath).href
	)) as Record<string, unknown>;
	const document = parseRuleDocument(moduleExports.default, sourcePath);
	const meta = parseDocPageMeta(document.meta, sourcePath);
	const slug = canonicalSlugForDocMeta(meta, sourcePath);
	const routeId = routeIdForTypedDocSourcePath(sourcePath, slug);

	return {
		document,
		frontmatter: {
			...frontmatterForDocMeta(meta),
			generatedFrom: pathRelativeToSiteRoot(sourcePath),
		},
		generatedPath: generatedPathForTypedDoc(sourcePath, slug),
		publicPath: publicMarkdownPathForRouteId(routeId),
		routeId,
		slug,
		sourcePath,
	};
}
