import { z } from "zod/v3";
import type { DeVerbalInflectionalFeatures } from "../../../../../types/language-packs/de/lexeme/shared/de-verbal-inflection-features";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";
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

const deUnderspecifiedVerbalInflectionalFeaturesSchema = z
	.object({
		number: deNumberSchema.optional(),
		tense: deTenseSchema.optional(),
		verbForm: z.never().optional(),
		voice: dePassVoiceSchema.optional(),
	})
	.strip()
	.superRefine((value, ctx) => {
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

const deFiniteImperativeVerbalInflectionalFeaturesSchema = z
	.object({
		mood: z.literal("Imp"),
		number: deNumberSchema.optional(),
		person: dePersonSchema.optional(),
		tense: z.never().optional(),
		verbForm: z.literal("Fin"),
		voice: dePassVoiceSchema.optional(),
	})
	.strip();

const deFiniteNonImperativeVerbalInflectionalFeaturesSchema = z
	.object({
		mood: deMoodSchema.exclude(["Imp"]).optional(),
		number: deNumberSchema.optional(),
		person: dePersonSchema.optional(),
		tense: deTenseSchema.optional(),
		verbForm: z.literal("Fin"),
		voice: dePassVoiceSchema.optional(),
	})
	.strip();

const deInfinitiveVerbalInflectionalFeaturesSchema = z
	.object({
		mood: z.never().optional(),
		number: deNumberSchema.optional(),
		person: z.never().optional(),
		tense: z.never().optional(),
		verbForm: z.literal("Inf"),
		voice: dePassVoiceSchema.optional(),
	})
	.strip();

const deParticipleVerbalInflectionalFeaturesSchema = z
	.object({
		aspect: deAspectSchema.optional(),
		gender: deGenderSchema.optional(),
		mood: z.never().optional(),
		number: deNumberSchema.optional(),
		person: z.never().optional(),
		tense: deTenseSchema.optional(),
		verbForm: z.literal("Part"),
		voice: dePassVoiceSchema.optional(),
	})
	.strip();

export const deVerbalInflectionalFeaturesSchema = z.union([
	deUnderspecifiedVerbalInflectionalFeaturesSchema,
	deFiniteImperativeVerbalInflectionalFeaturesSchema,
	deFiniteNonImperativeVerbalInflectionalFeaturesSchema,
	deInfinitiveVerbalInflectionalFeaturesSchema,
	deParticipleVerbalInflectionalFeaturesSchema,
]) as unknown as z.ZodType<DeVerbalInflectionalFeatures>;
