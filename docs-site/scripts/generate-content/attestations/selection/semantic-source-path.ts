import { dirname, join } from "node:path";
import type { SelectionAttestationSource } from "../../shared/types";

export function semanticSelectionBasename(sentenceMarkdown: string): string {
	return sentenceMarkdown
		.normalize("NFC")
		.replace(/[^\p{L}\p{M}\p{N}\p{Pc}\p{Zs}\[\]]+/gu, "")
		.replace(/\p{Zs}+/gu, "_")
		.replace(/_+/gu, "_")
		.replace(/^_+|_+$/gu, "");
}

export function selectionSemanticSourcePath(
	source: SelectionAttestationSource,
): string {
	return join(
		dirname(source.sourcePath),
		`${semanticSelectionBasename(source.sentenceMarkdown)}.ts`,
	);
}
