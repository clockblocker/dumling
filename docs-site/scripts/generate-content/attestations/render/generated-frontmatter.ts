import type { AttestationSource, Frontmatter } from "../../shared/types";
import { languageLabelFor, lemmaForEntity, surfaceForEntity } from "../entity/helpers";
import { isSelection, isSurface } from "../entity/guards";

export function generatedFrontmatterForAttestation(
	source: AttestationSource,
	routeId: string,
): Frontmatter {
	const entity = source.entity;
	const lemma = lemmaForEntity(entity);
	const surface =
		isSelection(entity) || isSurface(entity)
			? surfaceForEntity(entity)
			: undefined;
	const displayName =
		source.title ?? surface?.normalizedFullSurface ?? lemma.canonicalLemma;

	return {
		description: `Valid dumling object and CSV ID for ${displayName}.`,
		order: source.order ?? 1000,
		routeId,
		title: `${languageLabelFor(entity.language)} attestation - ${displayName}`,
	};
}
