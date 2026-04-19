import { z } from "zod/v3";
import type {
	DeParticleInherentFeatures,
	DeParticleLemma,
} from "../../../../../types/language-packs/de/lexeme/pos/de-particle";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeUninflectableLexemeSchemaBundleFor,
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
}) satisfies z.ZodType<DeParticleLemma>;

export const deParticleSchemas = buildDeUninflectableLexemeSchemaBundle<"PART">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deParticleLemmaSchema,
}) satisfies DeUninflectableLexemeSchemaBundleFor<"PART">;
