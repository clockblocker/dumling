import z from "zod/v3";

type SurfaceSchemaLeaf = z.ZodTypeAny;

type SurfaceSchemaByLemmaKind = Record<
	string,
	Record<string, SurfaceSchemaLeaf>
>;

type SurfaceSchemaBySurfaceKind = Record<string, SurfaceSchemaByLemmaKind>;

type SurfaceSchemaLanguageLike = Record<string, SurfaceSchemaBySurfaceKind>;

type ResolvedLemmaFor<T> = Extract<T, { lemmaKind: unknown }>;

type ResolvedSurfaceValueFor<T> = T extends { lemma: infer SurfaceLemma }
	? [ResolvedLemmaFor<SurfaceLemma>] extends [never]
		? never
		: Omit<T, "lemma"> & {
				lemma: ResolvedLemmaFor<SurfaceLemma>;
			}
	: never;

type ResolvedSurfaceSchemaFor<T extends SurfaceSchemaLeaf> = z.ZodType<
	ResolvedSurfaceValueFor<z.infer<T>>,
	z.ZodTypeDef,
	z.input<T>
>;

type ResolvedSurfaceSchemaLanguageFor<T extends SurfaceSchemaLanguageLike> = {
	[OS in keyof T]: {
		[SK in keyof T[OS]]: {
			[LK in keyof T[OS][SK]]: {
				[D in keyof T[OS][SK][LK]]: ResolvedSurfaceSchemaFor<
					T[OS][SK][LK][D]
				>;
			};
		};
	};
};

export function buildResolvedSurfaceSchemaForLanguage<
	const T extends SurfaceSchemaLanguageLike,
>(surfaceSchema: T): ResolvedSurfaceSchemaLanguageFor<T> {
	return Object.fromEntries(
		Object.entries(surfaceSchema).map(
			([orthographicStatus, surfaceKinds]) => [
				orthographicStatus,
				Object.fromEntries(
					Object.entries(surfaceKinds).map(
						([surfaceKind, lemmaKinds]) => [
							surfaceKind,
							Object.fromEntries(
								Object.entries(lemmaKinds).map(
									([lemmaKind, discriminators]) => [
										lemmaKind,
										Object.fromEntries(
											Object.entries(discriminators).map(
												([discriminator, schema]) => [
													discriminator,
													buildResolvedSurfaceSchema(
														schema,
													),
												],
											),
										),
									],
								),
							),
						],
					),
				),
			],
		),
	) as ResolvedSurfaceSchemaLanguageFor<T>;
}

function buildResolvedSurfaceSchema<T extends SurfaceSchemaLeaf>(
	schema: T,
): ResolvedSurfaceSchemaFor<T> {
	return schema.superRefine((value, ctx) => {
		if (!hasResolvedSurfaceLemma(value)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Resolved surfaces require a full lemma",
				path: ["lemma"],
			});
		}
	}) as unknown as ResolvedSurfaceSchemaFor<T>;
}

function hasResolvedSurfaceLemma(value: unknown): boolean {
	return (
		typeof value === "object" &&
		value !== null &&
		"lemma" in value &&
		typeof (value as { lemma: unknown }).lemma === "object" &&
		(value as { lemma: object | null }).lemma !== null &&
		"lemmaKind" in ((value as { lemma: object }).lemma as object)
	);
}
