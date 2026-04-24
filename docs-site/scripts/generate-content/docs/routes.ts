import { join, relative } from "node:path";
import {
	generatedDocsDir,
	publicDir,
	sourceDocsDir,
} from "../shared/paths";

export function routeIdForSourcePath(sourcePath: string): string {
	const routeId = relative(sourceDocsDir, sourcePath).replace(/\.md$/, "");
	return routeId.endsWith("/index")
		? routeId.slice(0, -"/index".length)
		: routeId;
}

export function generatedRouteIdForPath(sourcePath: string): string {
	return relative(generatedDocsDir, sourcePath).replace(/\.md$/, "");
}

export function publicMarkdownPathForRouteId(routeId: string): string {
	return routeId === "index"
		? join(publicDir, "index.md")
		: join(publicDir, `${routeId}.md`);
}
