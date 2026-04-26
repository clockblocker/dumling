import { renameSync } from "node:fs";
import { canonicalSlugForDocMeta } from "../metadata";
import { canonicalTypedDocEntrypointPath } from "../routes";
import { listTypedDocEntrypoints } from "./list-typed-doc-entrypoints";
import { loadTypedDocSource } from "./load-typed-doc-source";

export async function normalizeTypedDocSources(): Promise<void> {
	const entrypoints = listTypedDocEntrypoints();
	const sources = await Promise.all(
		entrypoints.map((sourcePath) => loadTypedDocSource(sourcePath)),
	);
	const canonicalPaths = new Map<string, string>();

	for (const source of sources) {
		const slug = canonicalSlugForDocMeta(
			source.document.meta,
			source.sourcePath,
		);
		const canonicalPath = canonicalTypedDocEntrypointPath(
			source.sourcePath,
			slug,
		);
		const existing = canonicalPaths.get(canonicalPath);
		if (existing !== undefined) {
			throw new Error(
				`Typed doc filename collision: ${existing} and ${source.sourcePath} both normalize to ${canonicalPath}.`,
			);
		}
		canonicalPaths.set(canonicalPath, source.sourcePath);
	}

	for (const [canonicalPath, sourcePath] of canonicalPaths) {
		if (canonicalPath === sourcePath) {
			continue;
		}
		renameSync(sourcePath, canonicalPath);
	}
}
