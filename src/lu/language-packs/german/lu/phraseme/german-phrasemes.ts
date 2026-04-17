import type {
	LemmaSchemaLanguageShape,
	SelectionSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { buildGermanPhrasemeBundle } from "./shared/build-german-phraseme-bundle";

const GermanAphorismBundle = buildGermanPhrasemeBundle({
	phrasemeKind: "Aphorism",
});
const GermanDiscourseFormulaBundle = buildGermanPhrasemeBundle({
	phrasemeKind: "DiscourseFormula",
});
const GermanIdiomBundle = buildGermanPhrasemeBundle({
	phrasemeKind: "Idiom",
});
const GermanProverbBundle = buildGermanPhrasemeBundle({
	phrasemeKind: "Proverb",
});

export const GermanPhrasemeLemmaSchemas = {
	Aphorism: GermanAphorismBundle.LemmaSchema,
	DiscourseFormula: GermanDiscourseFormulaBundle.LemmaSchema,
	Idiom: GermanIdiomBundle.LemmaSchema,
	Proverb: GermanProverbBundle.LemmaSchema,
} satisfies LemmaSchemaLanguageShape["Phraseme"];

export const GermanStandardLemmaPhrasemeSelectionSchemas = {
	Aphorism: GermanAphorismBundle.StandardLemmaSelectionSchema,
	DiscourseFormula: GermanDiscourseFormulaBundle.StandardLemmaSelectionSchema,
	Idiom: GermanIdiomBundle.StandardLemmaSelectionSchema,
	Proverb: GermanProverbBundle.StandardLemmaSelectionSchema,
} satisfies SelectionSchemaLanguageShape["Standard"]["Lemma"]["Phraseme"];

export const GermanLemmaPhrasemeSurfaceSchemas = {
	Aphorism: GermanAphorismBundle.LemmaSurfaceSchema,
	DiscourseFormula: GermanDiscourseFormulaBundle.LemmaSurfaceSchema,
	Idiom: GermanIdiomBundle.LemmaSurfaceSchema,
	Proverb: GermanProverbBundle.LemmaSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Phraseme"];

export const GermanTypoLemmaPhrasemeSelectionSchemas = {
	Aphorism: GermanAphorismBundle.TypoLemmaSelectionSchema,
	DiscourseFormula: GermanDiscourseFormulaBundle.TypoLemmaSelectionSchema,
	Idiom: GermanIdiomBundle.TypoLemmaSelectionSchema,
	Proverb: GermanProverbBundle.TypoLemmaSelectionSchema,
} satisfies SelectionSchemaLanguageShape["Typo"]["Lemma"]["Phraseme"];
