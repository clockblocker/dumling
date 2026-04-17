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
import { GermanFeature } from "../shared/german-common-enums";

const GermanNounInflectionalFeaturesSchema = featureSchema({
	case: GermanFeature.Case,
	number: GermanFeature.Number,
});

const GermanNounInherentFeaturesSchema = featureSchema({
	gender: GermanFeature.Gender,
	hyph: UniversalFeature.Hyph,
});

const GermanNounLemmaIdentityShape = {
	lemmaKind: z.literal("Lexeme"),
	pos: z.literal("NOUN"),
} satisfies z.ZodRawShape;

const GermanNounLemma = defineLemmaSchemaDescriptor({
	language: "German",
	schema: z
		.object({
			canonicalLemma: z.string(),
			inherentFeatures: GermanNounInherentFeaturesSchema,
			language: z.literal("German"),
			lemmaKind: z.literal("Lexeme"),
			meaningInEmojis: MeaningInEmojisSchema,
			pos: z.literal("NOUN"),
		})
		.strict(),
});

const GermanNounLemmaSchema = GermanNounLemma.schema satisfies LemmaSchemaFor<
	"Lexeme",
	"NOUN"
>;

const GermanNounInflectionSurfaceSchema = buildSurfaceSchema({
	lemma: GermanNounLemma,
	lemmaIdentityShape: GermanNounLemmaIdentityShape,
	surfaceShape: {
		inflectionalFeatures: GermanNounInflectionalFeaturesSchema,
		surfaceKind: z.literal("Inflection"),
	},
}).schema satisfies SurfaceSchemaFor<"Inflection", "Lexeme", "NOUN">;

const GermanNounLemmaSurfaceSchema = buildSurfaceSchema({
	lemma: GermanNounLemma,
	lemmaIdentityShape: GermanNounLemmaIdentityShape,
	surfaceShape: {
		surfaceKind: z.literal("Lemma"),
	},
}).schema satisfies SurfaceSchemaFor<"Lemma", "Lexeme", "NOUN">;

const GermanNounSelectionSchemas = deriveKnownSelectionSchemaProps({
	language: "German",
	surfaceSchemas: {
		InflectionSurfaceSchema: GermanNounInflectionSurfaceSchema,
		LemmaSurfaceSchema: GermanNounLemmaSurfaceSchema,
	},
});
const GermanNounInflectionSelectionSchema =
	GermanNounSelectionSchemas.InflectionSelectionSchema;
const GermanNounLemmaSelectionSchema =
	GermanNounSelectionSchemas.LemmaSelectionSchema;
const GermanNounTypoInflectionSelectionSchema =
	GermanNounSelectionSchemas.TypoInflectionSelectionSchema;
const GermanNounTypoLemmaSelectionSchema =
	GermanNounSelectionSchemas.TypoLemmaSelectionSchema;

export const GermanNounSchemas = {
	InflectionSelectionSchema: GermanNounInflectionSelectionSchema,
	InflectionSurfaceSchema: GermanNounInflectionSurfaceSchema,
	LemmaSchema: GermanNounLemmaSchema,
	LemmaSelectionSchema: GermanNounLemmaSelectionSchema,
	LemmaSurfaceSchema: GermanNounLemmaSurfaceSchema,
	TypoInflectionSelectionSchema: GermanNounTypoInflectionSelectionSchema,
	TypoLemmaSelectionSchema: GermanNounTypoLemmaSelectionSchema,
};
