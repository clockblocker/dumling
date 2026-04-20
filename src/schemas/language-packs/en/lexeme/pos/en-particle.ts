import { z } from "zod/v3";
import type {
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
} from "../../../../shared/feature-helpers";
import {
	type EnUninflectableLexemeSchemaBundleFor,
	buildEnUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";
import {
	enPolaritySchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enParticleInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["CCONJ"]),
	polarity: enPolaritySchema.extract(["Neg"]),
} as const;

export const enParticleInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enParticleInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "PART">
	>;

export const enParticleLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PART",
	inherentFeaturesSchema: enParticleInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "PART">>;

export const enParticleSchemas = buildEnUninflectableLexemeSchemaBundle<"PART">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enParticleLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"PART">;
