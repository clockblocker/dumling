import { mkdirSync } from "node:fs";
import { generatedDocsDir, publicDir } from "../shared/paths";
import type { SourcePage } from "../shared/types";
import {
	copyHandWrittenDocs,
	discoverHandWrittenDocs,
} from "./handwritten/copy-hand-written-docs";
import { typedDocsGenerationConfig } from "./typed/config";
import { discoverTypedDocs, writeTypedDocs } from "./typed/generate-typed-docs";
import type { DocsOutput } from "./types";
import { removeGeneratedDocOutputs, writeNavFiles } from "./write-nav";

function assertUniqueRouteIds(outputs: DocsOutput[]): void {
	const routeIds = new Map<string, string>();
	const htmlRoutes = new Map<string, string>();

	for (const output of outputs) {
		const existing = routeIds.get(output.routeId);
		if (existing !== undefined) {
			throw new Error(
				`Docs routeId collision: ${existing} and ${output.sourcePath} both resolve to ${output.routeId}.`,
			);
		}
		routeIds.set(output.routeId, output.sourcePath);

		const existingHtmlRoute = htmlRoutes.get(output.htmlRoute);
		if (existingHtmlRoute !== undefined) {
			throw new Error(
				`Docs htmlRoute collision: ${existingHtmlRoute} and ${output.sourcePath} both resolve to ${output.htmlRoute}.`,
			);
		}
		htmlRoutes.set(output.htmlRoute, output.sourcePath);
	}
}

export async function generateDocs(): Promise<SourcePage[]> {
	mkdirSync(generatedDocsDir, { recursive: true });
	mkdirSync(publicDir, { recursive: true });
	removeGeneratedDocOutputs();
	const [typedDocs, handWrittenDocs] = await Promise.all([
		discoverTypedDocs(typedDocsGenerationConfig),
		Promise.resolve(discoverHandWrittenDocs()),
	]);
	const outputs = [...typedDocs, ...handWrittenDocs];
	assertUniqueRouteIds(outputs);
	const pages = [
		...writeTypedDocs(typedDocs),
		...copyHandWrittenDocs(handWrittenDocs),
	];
	writeNavFiles();
	return pages;
}
