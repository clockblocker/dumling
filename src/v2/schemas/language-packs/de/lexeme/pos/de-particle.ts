import { z } from "zod/v3";
import type { Lemma, Selection, Surface } from "../../../../../public-types";
import type { DeParticleInherentFeatures } from "../../../../../types/language-packs/de/lexeme/pos/de-particle";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	buildDeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import { dePolaritySchema } from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const deParticleInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	partType: abstractFeatureAtomSchemas.partType.extract(["Inf"]),
	polarity: dePolaritySchema,
} as const;

export const deParticleInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	deParticleInherentFeatureShape,
) satisfies z.ZodType<DeParticleInherentFeatures>;

export const deParticleLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PART",
	inherentFeaturesSchema: deParticleInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "PART">>;

export const deParticleSchemas = buildDeUninflectableLexemeSchemaBundle({
	languageSchema: deLanguageSchema,
	lemmaSchema: deParticleLemmaSchema,
}) as {
	lemma: () => z.ZodType<Lemma<"de", "Lexeme", "PART">>;
	lemmaSchema: z.ZodType<Lemma<"de", "Lexeme", "PART">>;
	lemmaSurfaceSchema: z.ZodType<Surface<"de", "Lemma", "Lexeme", "PART">>;
	selection: {
		standard: {
			lemma: () => z.ZodType<Selection<"de", "Standard", "Lemma", "Lexeme", "PART">>;
		};
		typo: {
			lemma: () => z.ZodType<Selection<"de", "Typo", "Lemma", "Lexeme", "PART">>;
		};
	};
	surface: {
		lemma: () => z.ZodType<Surface<"de", "Lemma", "Lexeme", "PART">>;
	};
};
