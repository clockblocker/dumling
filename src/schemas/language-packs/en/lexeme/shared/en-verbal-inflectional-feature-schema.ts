import { z } from "zod/v3";
import type { InflectionalFeaturesFor } from "../../../../../public-types";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
} from "../../../../shared/feature-helpers";
import {
	enMoodSchema,
	enPersonSchema,
	enTenseSchema,
	enVerbFormSchema,
	enVoiceSchema,
} from "./en-common-feature-schemas";
import { abstractFeatureAtomSchemas } from "../../../../abstract/feature-schemas";

export const enVerbalInflectionalFeaturesSchema = requireNonEmptyFeatureObject(
	buildOptionalFeatureObjectSchema({
		mood: enMoodSchema,
		number: abstractFeatureAtomSchemas.number.extract(["Plur", "Sing"]),
		person: enPersonSchema,
		tense: enTenseSchema,
		verbForm: enVerbFormSchema,
		voice: enVoiceSchema,
	}),
) satisfies z.ZodType<InflectionalFeaturesFor<"en", "Lexeme", "VERB">>;
