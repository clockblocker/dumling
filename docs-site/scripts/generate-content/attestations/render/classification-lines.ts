import type { EntityValue } from "../../../../../src/types/public-types.ts";
import { lemmaForEntity } from "../entity/helpers";
import { isSelection, isSurface } from "../entity/guards";

export function classificationLinesForEntity(entity: EntityValue): string[] {
	const lemma = lemmaForEntity(entity);
	if (isSelection(entity)) {
		return [
			`- \`${entity.selectionCoverage}\` **Selection**`,
			`- \`${lemma.lemmaSubKind}\` **${lemma.lemmaKind}**`,
			`- **Lemma** _"${lemma.canonicalLemma}"_`,
		];
	}
	if (isSurface(entity)) {
		return [
			`- \`${entity.surfaceKind}\` **Surface**`,
			`- \`${lemma.lemmaSubKind}\` **${lemma.lemmaKind}**`,
			`- **Lemma** _"${lemma.canonicalLemma}"_`,
		];
	}
	return [
		`- **Lemma** _"${lemma.canonicalLemma}"_`,
		`- \`${lemma.lemmaSubKind}\` **${lemma.lemmaKind}**`,
	];
}
