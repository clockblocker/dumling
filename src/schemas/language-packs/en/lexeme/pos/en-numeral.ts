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

const enLanguageSchema = z.literal("en");

const enNumeralInherentFeatureShape = {
	abbr: abstractFeatureAtomSchemas.abbr,
	extPos: abstractFeatureAtomSchemas.extPos.extract(["PROPN"]),
	numForm: abstractFeatureAtomSchemas.numForm.extract(["Digit", "Roman", "Word"]),
	numType: abstractFeatureAtomSchemas.numType.extract(["Card", "Frac"]),
} as const;

export const enNumeralInherentFeaturesSchema =
	buildOptionalFeatureObjectSchema(
		enNumeralInherentFeatureShape,
	) satisfies z.ZodType<
		InherentFeaturesFor<"en", "Lexeme", "NUM">
	>;

export const enNumeralLemmaSchema = buildLemmaSchema({
	languageSchema: enLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NUM",
	inherentFeaturesSchema: enNumeralInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"en", "Lexeme", "NUM">>;

export const enNumeralSchemas = buildEnUninflectableLexemeSchemaBundle<"NUM">({
	languageSchema: enLanguageSchema,
	lemmaSchema: enNumeralLemmaSchema,
}) satisfies EnUninflectableLexemeSchemaBundleFor<"NUM">;
