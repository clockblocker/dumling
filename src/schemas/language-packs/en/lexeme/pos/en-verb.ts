import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	type EnInflectableLexemeSchemaBundleFor,
	buildEnInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-en-lexeme-schema-bundle";
import { enVerbalInflectionalFeaturesSchema } from "../shared/en-verbal-inflectional-feature-schema";

const enLanguageSchema = z.literal("en");

const enVerbInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADP", "CCONJ", "PROPN"]),
	hasGovPrep: abstractFeatureAtomSchemas.hasGovPrep,
	phrasal: abstractFeatureAtomSchemas.phrasal,
	style: abstractFeatureAtomSchemas.style.extract(["Expr", "Vrnc"]),
} as const;

export const enVerbInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enVerbInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "VERB">
	>;

export const enVerbLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeaturesSchema: enVerbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "VERB">>;

export const enVerbSchemas = buildEnInflectableLexemeSchemaBundle<"VERB">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enVerbLemmaSchema,
	inflectionalFeaturesSchema: enVerbalInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"VERB">;
