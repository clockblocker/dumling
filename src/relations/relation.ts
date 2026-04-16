import { z } from "zod/v3";
import { decodeDumlingId } from "../id/internal/codec/decode";
import { parseHeader } from "../id/internal/wire/header";
import type { DumlingId } from "../id/public";
import type { Prettify } from "../types/helpers";
import type { LexicalRelation } from "./lexical";
import type { MorphologicalRelation } from "./morphological";

const LemmaDumlingIdSchema = z.string().superRefine((value, ctx) => {
	try {
		const header = parseHeader(value);

		if (header.kind !== "Lemma") {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Expected lemma Dumling ID, received ${header.kind}`,
			});
			return;
		}

		const decoded = decodeDumlingId(header.language, value);

		if (decoded.isErr()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: decoded.error.message,
			});
		}
	} catch (error) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message:
				error instanceof Error
					? error.message
					: "Malformed relation Dumling ID",
		});
	}
}) as unknown as z.ZodType<DumlingId<"Lemma">>;

export const RelationTargetDumlingIdsSchema = z.array(
	LemmaDumlingIdSchema,
) as unknown as z.ZodType<RelationTargetDumlingIds>;

export type RelationTargetDumlingIds = DumlingId<"Lemma">[];

export type LexicalRelations = Prettify<
	Partial<Record<LexicalRelation, RelationTargetDumlingIds>>
>;

export type MorphologicalRelations = Prettify<
	Partial<Record<MorphologicalRelation, RelationTargetDumlingIds>>
>;

const lexicalRelationsShape = {
	antonym: RelationTargetDumlingIdsSchema.optional(),
	holonym: RelationTargetDumlingIdsSchema.optional(),
	hypernym: RelationTargetDumlingIdsSchema.optional(),
	hyponym: RelationTargetDumlingIdsSchema.optional(),
	meronym: RelationTargetDumlingIdsSchema.optional(),
	nearSynonym: RelationTargetDumlingIdsSchema.optional(),
	synonym: RelationTargetDumlingIdsSchema.optional(),
} satisfies Record<
	LexicalRelation,
	z.ZodOptional<typeof RelationTargetDumlingIdsSchema>
>;

const morphologicalRelationsShape = {
	consistsOf: RelationTargetDumlingIdsSchema.optional(),
	derivedFrom: RelationTargetDumlingIdsSchema.optional(),
	sourceFor: RelationTargetDumlingIdsSchema.optional(),
	usedIn: RelationTargetDumlingIdsSchema.optional(),
} satisfies Record<
	MorphologicalRelation,
	z.ZodOptional<typeof RelationTargetDumlingIdsSchema>
>;

export const LexicalRelationsSchema = z
	.object(lexicalRelationsShape)
	.strict() as unknown as z.ZodType<LexicalRelations>;

export const MorphologicalRelationsSchema = z
	.object(morphologicalRelationsShape)
	.strict() as unknown as z.ZodType<MorphologicalRelations>;
