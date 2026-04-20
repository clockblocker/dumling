import { z } from "zod/v3";
import type {
	InherentFeaturesFor,
	Lemma,
} from "../../../../../public-types";
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

const enInterjectionInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	foreign: abstractFeatureAtomSchemas.foreign,
	polarity: enPolaritySchema,
	style: abstractFeatureAtomSchemas.style.extract(["Expr"]),
} as const;

export const enInterjectionInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enInterjectionInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "INTJ">
	>;

export const enInterjectionLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "INTJ",
	inherentFeaturesSchema: enInterjectionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "INTJ">>;

export const enInterjectionSchemas = buildEnUninflectableLexemeSchemaBundle<"INTJ">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enInterjectionLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"INTJ">;
