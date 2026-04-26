import { pathToFileURL } from "node:url";
import type { AttestedSelection } from "../../../../../src/types/public-types.ts";
import {
	canonicalSlugForDocMeta,
	frontmatterForDocMeta,
	parseDocPageMeta,
} from "../metadata";
import { pathRelativeToSiteRoot } from "../../shared/paths";
import {
	generatedPathForTypedDoc,
	publicMarkdownPathForRouteId,
	routeIdForTypedDocSourcePath,
} from "../routes";

export type RuleExample = {
	render?: string;
	selection: AttestedSelection;
};

export type RuleBlock = {
	body?: string;
	examples: readonly RuleExample[];
	heading?: string;
	render?: string;
};

export type RuleDocument = {
	blocks: readonly RuleBlock[];
	meta: {
		description?: string;
		order?: number;
		slug?: string;
		title: string;
	};
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

function parseRuleExample(value: unknown, sourcePath: string): RuleExample {
	if (!isRecord(value)) {
		throw new Error(`${sourcePath} has an invalid rule example.`);
	}
	if (!isAttestedSelection(value.selection)) {
		throw new Error(
			`${sourcePath} rule examples must reference AttestedSelection sources.`,
		);
	}
	if (value.render !== undefined && typeof value.render !== "string") {
		throw new Error(`${sourcePath} has a non-string example renderer name.`);
	}

	return {
		render: value.render,
		selection: value.selection,
	};
}

function parseRuleBlock(value: unknown, sourcePath: string): RuleBlock {
	if (!isRecord(value)) {
		throw new Error(`${sourcePath} has an invalid rule block.`);
	}
	if (!Array.isArray(value.examples)) {
		throw new Error(`${sourcePath} rule blocks must define an examples array.`);
	}
	if (value.heading !== undefined && typeof value.heading !== "string") {
		throw new Error(`${sourcePath} has a non-string rule block heading.`);
	}
	if (value.body !== undefined && typeof value.body !== "string") {
		throw new Error(`${sourcePath} has a non-string rule block body.`);
	}
	if (value.render !== undefined && typeof value.render !== "string") {
		throw new Error(`${sourcePath} has a non-string rule block renderer name.`);
	}

	return {
		body: value.body,
		examples: value.examples.map((example) =>
			parseRuleExample(example, sourcePath),
		),
		heading: value.heading,
		render: value.render,
	};
}

function parseRuleDocument(value: unknown, sourcePath: string): RuleDocument {
	if (!isRecord(value)) {
		throw new Error(`${sourcePath} must default-export a typed document object.`);
	}
	if (!Array.isArray(value.blocks)) {
		throw new Error(`${sourcePath} must export a blocks array.`);
	}

	return {
		blocks: value.blocks.map((block) => parseRuleBlock(block, sourcePath)),
		meta: parseDocPageMeta(value.meta, sourcePath),
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
