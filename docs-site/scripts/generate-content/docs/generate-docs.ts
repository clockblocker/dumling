import { mkdirSync } from "node:fs";
import { discoverHandWrittenDocs, copyHandWrittenDocs } from "./handwritten/copy-hand-written-docs";
import { typedDocsGenerationConfig } from "./typed/config";
import { discoverTypedDocs, writeTypedDocs } from "./typed/generate-typed-docs";
import { removeGeneratedDocOutputs, writeNavFiles } from "./write-nav";
import { generatedDocsDir, publicDir } from "../shared/paths";
import type { DocsOutput } from "./types";
import type { SourcePage } from "../shared/types";

function assertUniqueRouteIds(outputs: DocsOutput[]): void {
	const routeIds = new Map<string, string>();

	for (const output of outputs) {
		const existing = routeIds.get(output.routeId);
		if (existing !== undefined) {
			throw new Error(
				`Docs route collision: ${existing} and ${output.sourcePath} both resolve to /${output.routeId}/.`,
			);
		}
		routeIds.set(output.routeId, output.sourcePath);
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
