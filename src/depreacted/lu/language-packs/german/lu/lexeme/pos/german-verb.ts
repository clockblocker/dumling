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
import { DeprecatedGermanVerbalInflectionalFeaturesSchema } from "../shared/german-verbal-inflection-features";

const GermanVerbInflectionalFeaturesSchema =
	DeprecatedGermanVerbalInflectionalFeaturesSchema;

const GermanVerbInherentFeaturesSchema = deprecatedFeatureSchema({
	hasGovPrep: DeprecatedUniversalFeature.HasGovPrep,
	hasSepPrefix: DeprecatedUniversalFeature.HasSepPrefix,
	lexicallyReflexive: DeprecatedUniversalFeature.LexicallyReflexive,
	verbType: DeprecatedUniversalFeature.VerbType.extract(["Mod"]),
});

const GermanVerbLemmaIdentityShape = {
	lemmaKind: z.literal("Lexeme"),
	pos: z.literal("VERB"),
} satisfies z.ZodRawShape;

const GermanVerbLemma = deprecatedDefineLemmaSchemaDescriptor({
	language: "German",
	schema: z
		.object({
			canonicalLemma: z.string(),
			inherentFeatures: GermanVerbInherentFeaturesSchema,
			language: z.literal("German"),
			lemmaKind: z.literal("Lexeme"),
			meaningInEmojis: DeprecatedMeaningInEmojisSchema,
			pos: z.literal("VERB"),
		})
		.strict(),
});

const GermanVerbLemmaSchema =
	GermanVerbLemma.schema satisfies DeprecatedLemmaSchemaFor<"Lexeme">;

const GermanVerbInflectionSurfaceSchema = deprecatedBuildSurfaceSchema({
	lemma: GermanVerbLemma,
	lemmaIdentityShape: GermanVerbLemmaIdentityShape,
	surfaceShape: {
		inflectionalFeatures: GermanVerbInflectionalFeaturesSchema,
		surfaceKind: z.literal("Inflection"),
	},
}).schema satisfies DeprecatedSurfaceSchemaFor<"Inflection", "Lexeme", "VERB">;

const GermanVerbLemmaSurfaceSchema = deprecatedBuildSurfaceSchema({
	lemma: GermanVerbLemma,
	lemmaIdentityShape: GermanVerbLemmaIdentityShape,
	surfaceShape: {
		surfaceKind: z.literal("Lemma"),
	},
}).schema satisfies DeprecatedSurfaceSchemaFor<"Lemma", "Lexeme", "VERB">;
const GermanVerbSelectionSchemas = deprecatedDeriveKnownSelectionSchemaProps({
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

export const DeprecatedGermanVerbSchemas = {
	InflectionSelectionSchema: GermanVerbInflectionSelectionSchema,
	InflectionSurfaceSchema: GermanVerbInflectionSurfaceSchema,
	LemmaSchema: GermanVerbLemmaSchema,
	LemmaSelectionSchema: GermanVerbLemmaSelectionSchema,
	LemmaSurfaceSchema: GermanVerbLemmaSurfaceSchema,
	TypoInflectionSelectionSchema: GermanVerbTypoInflectionSelectionSchema,
	TypoLemmaSelectionSchema: GermanVerbTypoLemmaSelectionSchema,
};
