import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
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
import {
	enDegreeSchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enAdjectiveInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADP", "ADV", "SCONJ"]),
	numForm: abstractFeatureAtomSchemas.numForm.extract(["Combi", "Word"]),
	numType: abstractFeatureAtomSchemas.numType.extract(["Frac", "Ord"]),
	style: abstractFeatureAtomSchemas.style.extract(["Expr"]),
} as const;

export const enAdjectiveInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enAdjectiveInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "ADJ">
	>;

const enAdjectiveInflectionalFeatureShape = {
	degree: enDegreeSchema,
} as const;

export const enAdjectiveInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enAdjectiveInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "ADJ">
	>;

export const enAdjectiveLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADJ",
	inherentFeaturesSchema: enAdjectiveInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "ADJ">>;

export const enAdjectiveSchemas = buildEnInflectableLexemeSchemaBundle<"ADJ">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enAdjectiveLemmaSchema,
	inflectionalFeaturesSchema: enAdjectiveInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"ADJ">;
