import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { deprecatedBuildHebrewPhrasemeBundle } from "./shared/build-hebrew-phraseme-bundle";

const HebrewAphorismBundle = deprecatedBuildHebrewPhrasemeBundle({
	phrasemeKind: "Aphorism",
});
const HebrewDiscourseFormulaBundle = deprecatedBuildHebrewPhrasemeBundle({
	phrasemeKind: "DiscourseFormula",
});
const HebrewIdiomBundle = deprecatedBuildHebrewPhrasemeBundle({
	phrasemeKind: "Idiom",
});
const HebrewProverbBundle = deprecatedBuildHebrewPhrasemeBundle({
	phrasemeKind: "Proverb",
});

export const DeprecatedHebrewPhrasemeLemmaSchemas = {
	Aphorism: HebrewAphorismBundle.LemmaSchema,
	DiscourseFormula: HebrewDiscourseFormulaBundle.LemmaSchema,
	Idiom: HebrewIdiomBundle.LemmaSchema,
	Proverb: HebrewProverbBundle.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Phraseme"];

export const DeprecatedHebrewLemmaPhrasemeSurfaceSchemas = {
	Aphorism: HebrewAphorismBundle.LemmaSurfaceSchema,
	DiscourseFormula: HebrewDiscourseFormulaBundle.LemmaSurfaceSchema,
	Idiom: HebrewIdiomBundle.LemmaSurfaceSchema,
	Proverb: HebrewProverbBundle.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Phraseme"];
