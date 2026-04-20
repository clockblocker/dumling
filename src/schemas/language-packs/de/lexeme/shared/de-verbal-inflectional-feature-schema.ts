import { z } from "zod/v3";
import type { InflectionalFeaturesFor } from "../../../../../public-types";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
import { buildFeatureObjectSchema } from "../../../../shared/feature-helpers";
import {
	deAspectSchema,
	deGenderSchema,
	deMoodSchema,
	deNumberSchema,
	dePersonSchema,
	deTenseSchema,
} from "./de-common-feature-schemas";

const dePassVoiceSchema = abstractFeatureAtomSchemas.voice.extract([
	"Pass",
]);

const deUnderspecifiedVerbalInflectionalFeaturesSchema = buildFeatureObjectSchema({
		number: deNumberSchema.optional(),
		tense: deTenseSchema.optional(),
		verbForm: z.never().optional(),
		voice: dePassVoiceSchema.optional(),
	}).superRefine((value, ctx) => {
		if (
			value.number === undefined &&
			value.tense === undefined &&
			value.voice === undefined
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "inflectionalFeatures must not be empty",
			});
		}
	});

const deFiniteImperativeVerbalInflectionalFeaturesSchema = buildFeatureObjectSchema({
		mood: z.literal("Imp"),
		number: deNumberSchema.optional(),
		person: dePersonSchema.optional(),
		tense: z.never().optional(),
		verbForm: z.literal("Fin"),
		voice: dePassVoiceSchema.optional(),
	});

const deFiniteNonImperativeVerbalInflectionalFeaturesSchema = buildFeatureObjectSchema({
		mood: deMoodSchema.exclude(["Imp"]).optional(),
		number: deNumberSchema.optional(),
		person: dePersonSchema.optional(),
		tense: deTenseSchema.optional(),
		verbForm: z.literal("Fin"),
		voice: dePassVoiceSchema.optional(),
	});

const deInfinitiveVerbalInflectionalFeaturesSchema = buildFeatureObjectSchema({
		mood: z.never().optional(),
		number: deNumberSchema.optional(),
		person: z.never().optional(),
		tense: z.never().optional(),
		verbForm: z.literal("Inf"),
		voice: dePassVoiceSchema.optional(),
	});

const deParticipleVerbalInflectionalFeaturesSchema = buildFeatureObjectSchema({
		aspect: deAspectSchema.optional(),
		gender: deGenderSchema.optional(),
		mood: z.never().optional(),
		number: deNumberSchema.optional(),
		person: z.never().optional(),
		tense: deTenseSchema.optional(),
		verbForm: z.literal("Part"),
		voice: dePassVoiceSchema.optional(),
	});

export const deVerbalInflectionalFeaturesSchema = z.union([
	deUnderspecifiedVerbalInflectionalFeaturesSchema,
	deFiniteImperativeVerbalInflectionalFeaturesSchema,
	deFiniteNonImperativeVerbalInflectionalFeaturesSchema,
	deInfinitiveVerbalInflectionalFeaturesSchema,
	deParticipleVerbalInflectionalFeaturesSchema,
]) as unknown as z.ZodType<InflectionalFeaturesFor<"de", "Lexeme", "VERB">>;
