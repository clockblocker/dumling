import { existsSync, renameSync } from "node:fs";
import { dirname, join } from "node:path";
import { canonicalSlugForDocMeta } from "../metadata";
import { canonicalTypedDocEntrypointPath } from "../routes";
import { listTypedDocEntrypoints } from "./list-typed-doc-entrypoints";
import { loadTypedDocSource } from "./load-typed-doc-source";

function temporaryTypedDocPath(sourcePath: string, index: number): string {
	const directory = dirname(sourcePath);
	const fileName = `${index}.typed-doc-normalize.tmp`;
	const temporaryPath = join(directory, fileName);

	if (existsSync(temporaryPath)) {
		throw new Error(
			`Cannot normalize typed docs because temporary path ${temporaryPath} already exists.`,
		);
	}

	return temporaryPath;
}

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

	const moves = [...canonicalPaths.entries()]
		.map(([canonicalPath, sourcePath]) => ({
			canonicalPath,
			sourcePath,
		}))
		.filter(
			({ canonicalPath, sourcePath }) => canonicalPath !== sourcePath,
		);

	const temporaryMoves = moves.map(({ sourcePath }, index) => ({
		sourcePath,
		temporaryPath: temporaryTypedDocPath(sourcePath, index),
	}));

	for (const move of temporaryMoves) {
		renameSync(move.sourcePath, move.temporaryPath);
	}

	for (const move of temporaryMoves) {
		const canonicalPath = moves.find(
			(candidate) => candidate.sourcePath === move.sourcePath,
		)?.canonicalPath;
		if (canonicalPath === undefined) {
			throw new Error(
				`Missing canonical path for normalized typed doc ${move.sourcePath}.`,
			);
		}
		renameSync(move.temporaryPath, canonicalPath);
	}
}
