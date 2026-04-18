import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { deprecatedBuildGermanPhrasemeBundle } from "./shared/build-german-phraseme-bundle";

const GermanAphorismBundle = deprecatedBuildGermanPhrasemeBundle({
	phrasemeKind: "Aphorism",
});
const GermanDiscourseFormulaBundle = deprecatedBuildGermanPhrasemeBundle({
	phrasemeKind: "DiscourseFormula",
});
const GermanIdiomBundle = deprecatedBuildGermanPhrasemeBundle({
	phrasemeKind: "Idiom",
});
const GermanProverbBundle = deprecatedBuildGermanPhrasemeBundle({
	phrasemeKind: "Proverb",
});

export const DeprecatedGermanPhrasemeLemmaSchemas = {
	Aphorism: GermanAphorismBundle.LemmaSchema,
	DiscourseFormula: GermanDiscourseFormulaBundle.LemmaSchema,
	Idiom: GermanIdiomBundle.LemmaSchema,
	Proverb: GermanProverbBundle.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Phraseme"];

export const DeprecatedGermanLemmaPhrasemeSurfaceSchemas = {
	Aphorism: GermanAphorismBundle.LemmaSurfaceSchema,
	DiscourseFormula: GermanDiscourseFormulaBundle.LemmaSurfaceSchema,
	Idiom: GermanIdiomBundle.LemmaSurfaceSchema,
	Proverb: GermanProverbBundle.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Phraseme"];
