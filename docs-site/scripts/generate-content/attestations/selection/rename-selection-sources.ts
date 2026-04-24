import { existsSync, renameSync } from "node:fs";
import { listTypeScriptFiles } from "../../shared/fs";
import { sourceAttestationsDir } from "../../shared/paths";
import { loadAttestationSource } from "../source/load-attestation-source";
import { selectionSemanticSourcePath } from "./semantic-source-path";
import { expectedEntityKindForPath } from "../validate/expected-entity-kind-for-path";
import { validateSelectionAttestation } from "../validate/validate-selection-attestation";

export async function renameSelectionSources(): Promise<string[]> {
	const selectionFiles = listTypeScriptFiles(sourceAttestationsDir).filter(
		(sourcePath) => expectedEntityKindForPath(sourcePath) === "Selection",
	);
	const renamePlan = new Map<string, string>();
	const claimedTargets = new Map<string, string>();

	for (const sourcePath of selectionFiles) {
		const source = await loadAttestationSource(sourcePath);
		validateSelectionAttestation(source);
		const targetPath = selectionSemanticSourcePath(source);
		const priorSource = claimedTargets.get(targetPath);
		if (priorSource !== undefined && priorSource !== sourcePath) {
			throw new Error(
				`Selection filename collision: ${priorSource} and ${sourcePath} both normalize to ${targetPath}.`,
			);
		}
		claimedTargets.set(targetPath, sourcePath);
		if (targetPath !== sourcePath) {
			renamePlan.set(sourcePath, targetPath);
		}
	}

	for (const [sourcePath, targetPath] of renamePlan) {
		if (existsSync(targetPath) && !renamePlan.has(targetPath)) {
			throw new Error(
				`Cannot rename ${sourcePath} to ${targetPath}: target already exists.`,
			);
		}
	}

	for (const [sourcePath, targetPath] of renamePlan) {
		renameSync(sourcePath, targetPath);
	}

	return listTypeScriptFiles(sourceAttestationsDir);
}
