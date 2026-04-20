import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../../types/public-types";
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
	enCaseSchema,
	enGenderSchema,
	enPersonSchema,
} from "../shared/en-common-feature-schemas";

const enLanguageSchema = z.literal("en");

const enPronounInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["ADV", "PRON"]),
	person: enPersonSchema,
	poss: abstractFeatureAtomSchemas.poss,
	pronType: featureValueSet(abstractFeatureAtomSchemas.pronType.extract(["Dem", "Emp", "Ind", "Int", "Neg", "Prs", "Rcp", "Rel", "Tot"])),
	style: abstractFeatureAtomSchemas.style.extract(["Arch", "Coll", "Expr", "Slng", "Vrnc"]),
} as const;

export const enPronounInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enPronounInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "PRON">
	>;

const enPronounInflectionalFeatureShape = {
	case: enCaseSchema,
	gender: enGenderSchema,
	number: abstractFeatureAtomSchemas.number.extract(["Plur", "Sing"]),
	reflex: abstractFeatureAtomSchemas.reflex,
} as const;

export const enPronounInflectionalFeaturesSchema =
	requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(
			enPronounInflectionalFeatureShape,
		),
	) satisfies z.ZodType<
		InflectionalFeaturesFor<"en", "Lexeme", "PRON">
	>;

export const enPronounLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PRON",
	inherentFeaturesSchema: enPronounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "PRON">>;

export const enPronounSchemas = buildEnInflectableLexemeSchemaBundle<"PRON">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enPronounLemmaSchema,
	inflectionalFeaturesSchema: enPronounInflectionalFeaturesSchema,
}) satisfies EnInflectableLexemeSchemaBundleFor<"PRON">;
