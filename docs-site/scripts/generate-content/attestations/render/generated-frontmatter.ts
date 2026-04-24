import type { AttestationSource, Frontmatter } from "../../shared/types";
import { lemmaForEntity, surfaceForEntity } from "../entity/helpers";
import { isSelection, isSurface } from "../entity/guards";
import { semanticSelectionBasename } from "../selection/semantic-source-path";

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
	const generatedTitle =
		isSelection(entity) && source.sentenceMarkdown !== undefined
			? semanticSelectionBasename(source.sentenceMarkdown)
			: displayName;

	return {
		order: source.order ?? 1000,
		routeId,
		title: generatedTitle,
	};
}
