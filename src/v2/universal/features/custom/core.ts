import { z } from "zod/v3";

import { DeprecatedDiscourseFormulaRoleSchema as CustomDiscourseFormulaRole } from "../../../../depreacted/lu/universal/enums/feature/custom/discourse-formula-role";
import { DeprecatedGovernedCase as CustomGovernedCase } from "../../../../depreacted/lu/universal/enums/feature/custom/governed-case";
import { DeprecatedHasGovPrep as CustomGovernedPreposition } from "../../../../depreacted/lu/universal/enums/feature/custom/governed-preposition";
import { DeprecatedLexicallyReflexive as CustomLexicallyReflexive } from "../../../../depreacted/lu/universal/enums/feature/custom/lexically-reflexive";
import { DeprecatedPhrasal as CustomPhrasal } from "../../../../depreacted/lu/universal/enums/feature/custom/phrasal";
import { DeprecatedHasSepPrefix as CustomSeparable } from "../../../../depreacted/lu/universal/enums/feature/custom/separable";

const universalCustomFeatureNameValues = [
	"discourseFormulaRole",
	"governedCase",
	"governedPreposition",
	"lexicallyReflexive",
	"phrasal",
	"separable",
] as const;

export const UniversalCustomFeatureName = z.enum(
	universalCustomFeatureNameValues,
);
export type UniversalCustomFeatureName = z.infer<
	typeof UniversalCustomFeatureName
>;

export const UniversalCustomFeatureSchemaByName = {
	discourseFormulaRole: CustomDiscourseFormulaRole,
	governedCase: CustomGovernedCase,
	governedPreposition: CustomGovernedPreposition,
	lexicallyReflexive: CustomLexicallyReflexive,
	phrasal: CustomPhrasal,
	separable: CustomSeparable,
} as const;

export type UniversalCustomFeatureValue<
	F extends UniversalCustomFeatureName = UniversalCustomFeatureName,
> = z.infer<(typeof UniversalCustomFeatureSchemaByName)[F]>;

export type UniversalCustomFeatures = Partial<{
	discourseFormulaRole: UniversalCustomFeatureValue<"discourseFormulaRole">;
	governedCase: UniversalCustomFeatureValue<"governedCase">;
	governedPreposition: UniversalCustomFeatureValue<"governedPreposition">;
	lexicallyReflexive: UniversalCustomFeatureValue<"lexicallyReflexive">;
	phrasal: UniversalCustomFeatureValue<"phrasal">;
	separable: UniversalCustomFeatureValue<"separable">;
}>;
