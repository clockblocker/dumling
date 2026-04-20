import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	featureValueSet,
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

const enAdverbInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADP", "ADV", "CCONJ", "SCONJ"]),
	numForm: abstractFeatureAtomSchemas.numForm.extract(["Word"]),
	numType: abstractFeatureAtomSchemas.numType.extract(["Frac", "Mult", "Ord"]),
	pronType: featureValueSet(abstractFeatureAtomSchemas.pronType.extract(["Dem", "Ind", "Int", "Neg", "Rel", "Tot"])),
	style: abstractFeatureAtomSchemas.style.extract(["Expr", "Slng"]),
} as const;

export const enAdverbInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enAdverbInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "ADV">
	>;

const enAdverbInflectionalFeatureShape = {
	degree: enDegreeSchema,
} as const;

export const enAdverbInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enAdverbInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "ADV">
	>;

export const enAdverbLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADV",
	inherentFeaturesSchema: enAdverbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "ADV">>;

export const enAdverbSchemas = buildEnInflectableLexemeSchemaBundle<"ADV">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enAdverbLemmaSchema,
	inflectionalFeaturesSchema: enAdverbInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"ADV">;
