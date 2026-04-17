import z from "zod/v3";
import type { Prettify } from "../../../types/helpers";
import type { LemmaSchemaDescriptor } from "./lemma-schema-descriptor";

const lemmaSubKindKeys = ["morphemeKind", "phrasemeKind", "pos"] as const;

type LemmaSubKindKey = (typeof lemmaSubKindKeys)[number];

type InferShape<Shape extends z.ZodRawShape> = {
	[K in keyof Shape]: z.infer<Shape[K]>;
};

type SurfaceLemmaIdentityShape = z.ZodRawShape & {
	lemmaKind: z.ZodTypeAny;
};

type SurfaceValueFor<
	LanguageLiteral extends string,
	Lemma,
	Surface,
> = Prettify<
	Surface & {
		language: LanguageLiteral;
		normalizedFullSurface: string;
		lemma: Lemma;
	}
>;

type SurfaceSchemaFor<
	LanguageLiteral extends string,
	LemmaSchema extends z.ZodTypeAny,
	SurfaceShape extends z.ZodRawShape,
> = z.ZodType<
	SurfaceValueFor<
		LanguageLiteral,
		z.infer<LemmaSchema>,
		InferShape<SurfaceShape>
	>
>;

type SurfaceSchemaDescriptorFor<
	LemmaDescriptor extends LemmaSchemaDescriptor<z.ZodTypeAny>,
	SurfaceShape extends z.ZodRawShape,
> = {
	language: LemmaDescriptor["language"];
	schema: SurfaceSchemaFor<
		LemmaDescriptor["language"],
		LemmaDescriptor["schema"],
		SurfaceShape
	>;
};

export function buildSurfaceSchema<
	LemmaDescriptor extends LemmaSchemaDescriptor<z.ZodTypeAny>,
	LemmaIdentityShape extends SurfaceLemmaIdentityShape,
	SurfaceShape extends z.ZodRawShape,
>({
	lemma,
	lemmaIdentityShape,
	surfaceShape,
}: {
	lemma: LemmaDescriptor;
	lemmaIdentityShape: LemmaIdentityShape;
	surfaceShape: SurfaceShape;
}): SurfaceSchemaDescriptorFor<
	LemmaDescriptor,
	SurfaceShape
> {
	const { language, schema: lemmaSchema } = lemma;
	const lemmaSubKindKey = getLemmaSubKindKey(lemmaIdentityShape);

	const schema = z
		.object(surfaceShape)
		.extend({
			language: z.literal(language),
			normalizedFullSurface: z.string(),
			lemma: lemmaSchema,
		})
		.strict()
		.superRefine((surface, ctx) => {
			const typedSurface = surface as {
				language: string;
				lemma: Record<string, unknown>;
			};

			if (typedSurface.lemma.language !== typedSurface.language) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"surface lemma language must match surface language",
					path: ["lemma", "language"],
				});
			}

			if (
				typedSurface.lemma.lemmaKind !==
				getLiteralValue(lemmaIdentityShape.lemmaKind)
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "surface lemmaKind must match surface kind schema",
					path: ["lemma", "lemmaKind"],
				});
			}

			if (
				typedSurface.lemma[lemmaSubKindKey] !==
				getLiteralValue(lemmaIdentityShape[lemmaSubKindKey] as z.ZodTypeAny)
			) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "surface lemma subkind must match surface kind schema",
					path: ["lemma", lemmaSubKindKey],
				});
			}
			}) as SurfaceSchemaFor<
				LemmaDescriptor["language"],
				LemmaDescriptor["schema"],
				SurfaceShape
			>;

	return {
		language,
		schema,
	};
}

function getLemmaSubKindKey(
	lemmaIdentityShape: SurfaceLemmaIdentityShape,
): LemmaSubKindKey {
	const matchingKeys = lemmaSubKindKeys.filter(
		(key) => key in lemmaIdentityShape,
	);

	if (matchingKeys.length !== 1) {
		throw new Error(
			"lemmaIdentityShape must include exactly one of pos, morphemeKind, or phrasemeKind",
		);
	}

	const [matchingKey] = matchingKeys;

	if (matchingKey === undefined) {
		throw new Error(
			"lemmaIdentityShape must resolve to a lemma subkind key",
		);
	}

	return matchingKey;
}

function getLiteralValue(schema: z.ZodTypeAny): unknown {
	return (schema as z.ZodLiteral<unknown>)._def.value;
}
