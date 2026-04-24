import type { AttestationSource } from "../../shared/types";
import {
	camelCaseIdentifier,
	entityKindFor,
	languageLabelFor,
	lemmaForEntity,
	surfaceForEntity,
} from "../entity/helpers";
import { renderTsValue } from "../entity/render-ts-value";
import { isSelection, isSurface } from "../entity/guards";
import { classificationLinesForEntity } from "./classification-lines";
import { typeExpressionForEntity } from "./type-expression";

export function renderAttestationBody(
	source: AttestationSource,
	csvId: string,
): string {
	const entity = source.entity;
	const kind = entityKindFor(entity);
	const lemma = lemmaForEntity(entity);
	const surface =
		isSelection(entity) || isSurface(entity)
			? surfaceForEntity(entity)
			: undefined;
	const displayName = surface?.normalizedFullSurface ?? lemma.canonicalLemma;
	const variableBase = camelCaseIdentifier(displayName, "attested");
	const entityVariable = `${variableBase}${kind}`;
	const idVariable = `${entityVariable}Id`;
	const importType = typeExpressionForEntity(entity).split("<", 1)[0];
	const title = source.title ?? displayName;
	const selectedText = isSelection(entity)
		? ` for the selected spelling **${entity.spelledSelection}**`
		: "";
	const sentenceBlock =
		source.sentenceMarkdown === undefined
			? ""
			: `\nSentence:\n\n- *${source.sentenceMarkdown}*\n`;
	const idNote = isSelection(entity)
		? "\nSelection IDs use their own canonical CSV row and preserve selection spelling, coverage, and orthographic metadata.\n"
		: "\nIDs are emitted as canonical CSV.\n";

	return `# ${languageLabelFor(entity.language)} attestation: ${title}

This attestation records one learner-facing ${kind.toLowerCase()} classification${selectedText}.
${sentenceBlock}
Classification:

${classificationLinesForEntity(entity).join("\n")}
${idNote}
\`\`\`ts
import type { ${importType} } from "dumling/types";

export const ${entityVariable} = ${renderTsValue(entity)} satisfies ${typeExpressionForEntity(entity)};

export const ${idVariable} =
\t${JSON.stringify(csvId)} as const;
\`\`\`
`;
}
