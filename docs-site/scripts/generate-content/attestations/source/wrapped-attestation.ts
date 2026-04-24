import type { EntityValue } from "../../../../../src/types/public-types.ts";
import type { AttestationSource } from "../../shared/types";
import { isEntityValue, isRecord } from "../entity/guards";

export function getWrappedAttestation(
	moduleExports: Record<string, unknown>,
	sourcePath: string,
): Omit<AttestationSource, "sourcePath"> | undefined {
	const wrapped = moduleExports.attestation;
	if (wrapped === undefined) {
		return undefined;
	}
	if (!isRecord(wrapped)) {
		throw new Error(
			`${sourcePath} exports attestation, but it is not an object.`,
		);
	}

	const entityEntries = [
		["lemma", wrapped.lemma],
		["surface", wrapped.surface],
		["selection", wrapped.selection],
	].filter(([, value]) => isEntityValue(value));

	if (entityEntries.length !== 1) {
		throw new Error(
			`${sourcePath} attestation must contain exactly one lemma, surface, or selection.`,
		);
	}

	const order =
		typeof wrapped.order === "number" && Number.isFinite(wrapped.order)
			? wrapped.order
			: undefined;
	const sentenceMarkdown =
		typeof wrapped.sentenceMarkdown === "string"
			? wrapped.sentenceMarkdown
			: undefined;
	const title =
		typeof wrapped.title === "string" && wrapped.title.length > 0
			? wrapped.title
			: undefined;
	const lessonsLearned =
		typeof wrapped.lessonsLearned === "string"
			? wrapped.lessonsLearned
			: undefined;

	return {
		entity: entityEntries[0]?.[1] as EntityValue,
		lessonsLearned,
		order,
		sentenceMarkdown,
		title,
	};
}
