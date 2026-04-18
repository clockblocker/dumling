import z from "zod/v3";
import { UniversalFeature } from "../../../../../universal/enums/feature";
import { buildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { deriveKnownSelectionSchemaProps } from "../../../../../universal/factories/deriveKnownSelectionSchemas";
import { defineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import type {
	LemmaSchemaFor,
	SurfaceSchemaFor,
} from "../../../../../universal/helpers/schema-targets";
import { featureSchema } from "../../../../../universal/helpers/schema-targets";
import { MeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";
import { GermanVerbalInflectionalFeaturesSchema } from "../shared/german-verbal-inflection-features";

const GermanVerbInflectionalFeaturesSchema =
	GermanVerbalInflectionalFeaturesSchema;

const GermanVerbInherentFeaturesSchema = featureSchema({
	hasGovPrep: UniversalFeature.HasGovPrep,
	hasSepPrefix: UniversalFeature.HasSepPrefix,
	lexicallyReflexive: UniversalFeature.LexicallyReflexive,
	verbType: UniversalFeature.VerbType.extract(["Mod"]),
});

const GermanVerbLemmaIdentityShape = {
	lemmaKind: z.literal("Lexeme"),
	pos: z.literal("VERB"),
} satisfies z.ZodRawShape;

const GermanVerbLemma = defineLemmaSchemaDescriptor({
	language: "German",
	schema: z
		.object({
			canonicalLemma: z.string(),
			inherentFeatures: GermanVerbInherentFeaturesSchema,
			language: z.literal("German"),
			lemmaKind: z.literal("Lexeme"),
			meaningInEmojis: MeaningInEmojisSchema,
			pos: z.literal("VERB"),
		})
		.strict(),
});

const GermanVerbLemmaSchema =
	GermanVerbLemma.schema satisfies LemmaSchemaFor<"Lexeme">;

const GermanVerbInflectionSurfaceSchema = buildSurfaceSchema({
	lemma: GermanVerbLemma,
	lemmaIdentityShape: GermanVerbLemmaIdentityShape,
	surfaceShape: {
		inflectionalFeatures: GermanVerbInflectionalFeaturesSchema,
		surfaceKind: z.literal("Inflection"),
	},
}).schema satisfies SurfaceSchemaFor<"Inflection", "Lexeme", "VERB">;

const GermanVerbLemmaSurfaceSchema = buildSurfaceSchema({
	lemma: GermanVerbLemma,
	lemmaIdentityShape: GermanVerbLemmaIdentityShape,
	surfaceShape: {
		surfaceKind: z.literal("Lemma"),
	},
}).schema satisfies SurfaceSchemaFor<"Lemma", "Lexeme", "VERB">;
const GermanVerbSelectionSchemas = deriveKnownSelectionSchemaProps({
	language: "German",
	surfaceSchemas: {
		InflectionSurfaceSchema: GermanVerbInflectionSurfaceSchema,
		LemmaSurfaceSchema: GermanVerbLemmaSurfaceSchema,
	},
});
const GermanVerbInflectionSelectionSchema =
	GermanVerbSelectionSchemas.InflectionSelectionSchema;
const GermanVerbLemmaSelectionSchema =
	GermanVerbSelectionSchemas.LemmaSelectionSchema;
const GermanVerbTypoInflectionSelectionSchema =
	GermanVerbSelectionSchemas.TypoInflectionSelectionSchema;
const GermanVerbTypoLemmaSelectionSchema =
	GermanVerbSelectionSchemas.TypoLemmaSelectionSchema;

export const GermanVerbSchemas = {
	InflectionSelectionSchema: GermanVerbInflectionSelectionSchema,
	InflectionSurfaceSchema: GermanVerbInflectionSurfaceSchema,
	LemmaSchema: GermanVerbLemmaSchema,
	LemmaSelectionSchema: GermanVerbLemmaSelectionSchema,
	LemmaSurfaceSchema: GermanVerbLemmaSurfaceSchema,
	TypoInflectionSelectionSchema: GermanVerbTypoInflectionSelectionSchema,
	TypoLemmaSelectionSchema: GermanVerbTypoLemmaSelectionSchema,
};
