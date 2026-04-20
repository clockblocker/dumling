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
	type DeInflectableLexemeSchemaBundleFor,
	buildDeInflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "../shared/build-de-lexeme-schema-bundle";
import {
	deCaseSchema,
	deGenderSchema,
	deNumberSchema,
	dePersonSchema,
	dePoliteSchema,
} from "../shared/de-common-feature-schemas";

const deLanguageSchema = z.literal("de");

const dePronounInherentFeatureShape = {
	extPos: abstractFeatureAtomSchemas.extPos.extract(["DET"]),
	foreign: abstractFeatureAtomSchemas.foreign,
	person: dePersonSchema,
	polite: dePoliteSchema,
	poss: abstractFeatureAtomSchemas.poss,
	pronType: abstractFeatureAtomSchemas.pronType.extract([
		"Dem",
		"Ind",
		"Int",
		"Neg",
		"Prs",
		"Rcp",
		"Rel",
		"Tot",
	]),
} as const;

export const dePronounInherentFeaturesSchema = buildOptionalFeatureObjectSchema(
	dePronounInherentFeatureShape,
) satisfies z.ZodType<InherentFeaturesFor<"de", "Lexeme", "PRON">>;

export const dePronounInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		case: deCaseSchema,
		gender: deGenderSchema,
		number: deNumberSchema,
		reflex: abstractFeatureAtomSchemas.reflex,
	}),
) satisfies z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "PRON">>;

export const dePronounLemmaSchema = buildLemmaSchema({
	languageSchema: deLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PRON",
	inherentFeaturesSchema: dePronounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"de", "Lexeme", "PRON">>;

export const dePronounSchemas = buildDeInflectableLexemeSchemaBundle<"PRON">({
	languageSchema: deLanguageSchema,
	lemmaSchema: dePronounLemmaSchema,
	inflectionalFeaturesSchema: dePronounInflectionalFeaturesSchema,
}) satisfies DeInflectableLexemeSchemaBundleFor<"PRON">;
