import { z } from "zod/v3";
import type { InherentFeaturesFor, Lemma } from "../../../../../types/public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildOptionalFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	type DeInflectableLexemeSchemaBundleFor,
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import { deVerbalInflectionalFeaturesSchema } from "../shared/de-verbal-inflectional-feature-schema";

const deLanguageSchema = z.literal("de");

export const deVerbInherentFeaturesSchema = buildOptionalFeatureObjectSchema({
	hasGovPrep: abstractFeatureAtomSchemas.hasGovPrep,
	hasSepPrefix: abstractFeatureAtomSchemas.hasSepPrefix,
	lexicallyReflexive: abstractFeatureAtomSchemas.lexicallyReflexive,
	verbType: z.literal("Mod"),
}) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "VERB">>;

export const deVerbLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeaturesSchema: deVerbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "VERB">>;

export const deVerbSchemas = buildDeInflectableLexemeSchemaBundle<"VERB">({
	languageSchema: deLanguageSchema,
	lemmaSchema: deVerbLemmaSchema,
	inflectionalFeaturesSchema: deVerbalInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"VERB">;
