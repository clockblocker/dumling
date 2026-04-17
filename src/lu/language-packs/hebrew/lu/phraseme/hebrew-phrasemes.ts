import type {
	LemmaSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { buildHebrewPhrasemeBundle } from "./shared/build-hebrew-phraseme-bundle";

const HebrewAphorismBundle = buildHebrewPhrasemeBundle({
	phrasemeKind: "Aphorism",
});
const HebrewDiscourseFormulaBundle = buildHebrewPhrasemeBundle({
	phrasemeKind: "DiscourseFormula",
});
const HebrewIdiomBundle = buildHebrewPhrasemeBundle({
	phrasemeKind: "Idiom",
});
const HebrewProverbBundle = buildHebrewPhrasemeBundle({
	phrasemeKind: "Proverb",
});

export const HebrewPhrasemeLemmaSchemas = {
	Aphorism: HebrewAphorismBundle.LemmaSchema,
	DiscourseFormula: HebrewDiscourseFormulaBundle.LemmaSchema,
	Idiom: HebrewIdiomBundle.LemmaSchema,
	Proverb: HebrewProverbBundle.LemmaSchema,
} satisfies LemmaSchemaLanguageShape["Phraseme"];

export const HebrewLemmaPhrasemeSurfaceSchemas = {
	Aphorism: HebrewAphorismBundle.LemmaSurfaceSchema,
	DiscourseFormula: HebrewDiscourseFormulaBundle.LemmaSurfaceSchema,
	Idiom: HebrewIdiomBundle.LemmaSurfaceSchema,
	Proverb: HebrewProverbBundle.LemmaSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Phraseme"];
