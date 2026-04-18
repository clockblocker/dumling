import z from "zod/v3";
import { DeprecatedUniversalFeature } from "../../../../../universal/enums/feature";
import { deprecatedBuildSurfaceSchema } from "../../../../../universal/factories/buildSurfaceSchema";
import { deprecatedDeriveKnownSelectionSchemaProps } from "../../../../../universal/factories/deriveKnownSelectionSchemas";
import { deprecatedDefineLemmaSchemaDescriptor } from "../../../../../universal/factories/lemma-schema-descriptor";
import type {
	DeprecatedLemmaSchemaFor,
	DeprecatedSurfaceSchemaFor,
} from "../../../../../universal/helpers/schema-targets";
import { deprecatedFeatureSchema } from "../../../../../universal/helpers/schema-targets";
import { DeprecatedMeaningInEmojisSchema } from "../../../../../universal/meaning-in-emojis";
import { DeprecatedGermanFeature } from "../shared/german-common-enums";

const GermanNounInflectionalFeaturesSchema = deprecatedFeatureSchema({
	case: DeprecatedGermanFeature.Case,
	number: DeprecatedGermanFeature.Number,
});

const GermanNounInherentFeaturesSchema = deprecatedFeatureSchema({
	gender: DeprecatedGermanFeature.Gender,
	hyph: DeprecatedUniversalFeature.Hyph,
});

const GermanNounLemmaIdentityShape = {
	lemmaKind: z.literal("Lexeme"),
	pos: z.literal("NOUN"),
} satisfies z.ZodRawShape;

const GermanNounLemma = deprecatedDefineLemmaSchemaDescriptor({
	language: "German",
	schema: z
		.object({
			canonicalLemma: z.string(),
			inherentFeatures: GermanNounInherentFeaturesSchema,
			language: z.literal("German"),
			lemmaKind: z.literal("Lexeme"),
			meaningInEmojis: DeprecatedMeaningInEmojisSchema,
			pos: z.literal("NOUN"),
		})
		.strict(),
});

const GermanNounLemmaSchema = GermanNounLemma.schema satisfies DeprecatedLemmaSchemaFor<
	"Lexeme",
	"NOUN"
>;

const GermanNounInflectionSurfaceSchema = deprecatedBuildSurfaceSchema({
	lemma: GermanNounLemma,
	lemmaIdentityShape: GermanNounLemmaIdentityShape,
	surfaceShape: {
		inflectionalFeatures: GermanNounInflectionalFeaturesSchema,
		surfaceKind: z.literal("Inflection"),
	},
}).schema satisfies DeprecatedSurfaceSchemaFor<"Inflection", "Lexeme", "NOUN">;

const GermanNounLemmaSurfaceSchema = deprecatedBuildSurfaceSchema({
	lemma: GermanNounLemma,
	lemmaIdentityShape: GermanNounLemmaIdentityShape,
	surfaceShape: {
		surfaceKind: z.literal("Lemma"),
	},
}).schema satisfies DeprecatedSurfaceSchemaFor<"Lemma", "Lexeme", "NOUN">;

const GermanNounSelectionSchemas = deprecatedDeriveKnownSelectionSchemaProps({
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

export const DeprecatedGermanNounSchemas = {
	InflectionSelectionSchema: GermanNounInflectionSelectionSchema,
	InflectionSurfaceSchema: GermanNounInflectionSurfaceSchema,
	LemmaSchema: GermanNounLemmaSchema,
	LemmaSelectionSchema: GermanNounLemmaSelectionSchema,
	LemmaSurfaceSchema: GermanNounLemmaSurfaceSchema,
	TypoInflectionSelectionSchema: GermanNounTypoInflectionSelectionSchema,
	TypoLemmaSelectionSchema: GermanNounTypoLemmaSelectionSchema,
};
