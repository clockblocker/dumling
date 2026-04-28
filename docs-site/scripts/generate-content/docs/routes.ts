import { dirname, join, relative } from "node:path";
import {
	generatedDocsDir,
	handWrittenDocsDir,
	publicDir,
	sourceTypedDocsDir,
} from "../shared/paths";

function normalizePathSegments(path: string): string {
	return path.replaceAll("\\", "/");
}

export function normalizeRouteId(routeId: string): string {
	const normalized = normalizePathSegments(routeId)
		.replace(/^\/+/u, "")
		.replace(/\/+$/u, "");
	if (normalized === "" || normalized === "index") {
		return "index";
	}
	return normalized.endsWith("/index")
		? normalized.slice(0, -"/index".length)
		: normalized;
}

export function htmlRouteForRouteId(routeId: string): string {
	return routeId === "index" ? "/" : `/${routeId}/`;
}

export function routeIdForHandWrittenSourcePath(sourcePath: string): string {
	return normalizeRouteId(
		relative(handWrittenDocsDir, sourcePath).replace(/\.md$/u, ""),
	);
}

export function routeIdForTypedDocSourcePath(
	sourcePath: string,
	slug: string,
): string {
	const relativeDir = normalizePathSegments(
		relative(sourceTypedDocsDir, dirname(sourcePath)),
	);
	return normalizeRouteId(
		relativeDir === "" ? slug : `${relativeDir}/${slug}`,
	);
}

export function generatedRouteIdForPath(sourcePath: string): string {
	return normalizeRouteId(
		relative(generatedDocsDir, sourcePath).replace(/\.md$/u, ""),
	);
}

export function generatedPathForHandWrittenDoc(sourcePath: string): string {
	return join(generatedDocsDir, relative(handWrittenDocsDir, sourcePath));
}

export function generatedPathForTypedDoc(routeId: string): string {
	return routeId === "index"
		? join(generatedDocsDir, "index.md")
		: join(generatedDocsDir, `${routeId}.md`);
}

export function publicMarkdownPathForRouteId(routeId: string): string {
	return routeId === "index"
		? join(publicDir, "index.md")
		: join(publicDir, `${routeId}.md`);
}
