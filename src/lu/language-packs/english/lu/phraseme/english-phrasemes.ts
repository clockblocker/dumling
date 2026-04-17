import type {
	LemmaSchemaLanguageShape,
	SurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { buildEnglishPhrasemeBundle } from "./shared/build-english-phraseme-bundle";

const EnglishAphorismBundle = buildEnglishPhrasemeBundle({
	phrasemeKind: "Aphorism",
});
const EnglishDiscourseFormulaBundle = buildEnglishPhrasemeBundle({
	phrasemeKind: "DiscourseFormula",
});
const EnglishIdiomBundle = buildEnglishPhrasemeBundle({
	phrasemeKind: "Idiom",
});
const EnglishProverbBundle = buildEnglishPhrasemeBundle({
	phrasemeKind: "Proverb",
});

export const EnglishPhrasemeLemmaSchemas = {
	Aphorism: EnglishAphorismBundle.LemmaSchema,
	DiscourseFormula: EnglishDiscourseFormulaBundle.LemmaSchema,
	Idiom: EnglishIdiomBundle.LemmaSchema,
	Proverb: EnglishProverbBundle.LemmaSchema,
} satisfies LemmaSchemaLanguageShape["Phraseme"];

export const EnglishLemmaPhrasemeSurfaceSchemas = {
	Aphorism: EnglishAphorismBundle.LemmaSurfaceSchema,
	DiscourseFormula: EnglishDiscourseFormulaBundle.LemmaSurfaceSchema,
	Idiom: EnglishIdiomBundle.LemmaSurfaceSchema,
	Proverb: EnglishProverbBundle.LemmaSurfaceSchema,
} satisfies SurfaceSchemaLanguageShape["Lemma"]["Phraseme"];
