import type {
	DeprecatedLemmaSchemaLanguageShape,
	DeprecatedSurfaceSchemaLanguageShape,
} from "../../../../registry-shapes";
import { deprecatedBuildEnglishPhrasemeBundle } from "./shared/build-english-phraseme-bundle";

const EnglishAphorismBundle = deprecatedBuildEnglishPhrasemeBundle({
	phrasemeKind: "Aphorism",
});
const EnglishDiscourseFormulaBundle = deprecatedBuildEnglishPhrasemeBundle({
	phrasemeKind: "DiscourseFormula",
});
const EnglishIdiomBundle = deprecatedBuildEnglishPhrasemeBundle({
	phrasemeKind: "Idiom",
});
const EnglishProverbBundle = deprecatedBuildEnglishPhrasemeBundle({
	phrasemeKind: "Proverb",
});

export const DeprecatedEnglishPhrasemeLemmaSchemas = {
	Aphorism: EnglishAphorismBundle.LemmaSchema,
	DiscourseFormula: EnglishDiscourseFormulaBundle.LemmaSchema,
	Idiom: EnglishIdiomBundle.LemmaSchema,
	Proverb: EnglishProverbBundle.LemmaSchema,
} satisfies DeprecatedLemmaSchemaLanguageShape["Phraseme"];

export const DeprecatedEnglishLemmaPhrasemeSurfaceSchemas = {
	Aphorism: EnglishAphorismBundle.LemmaSurfaceSchema,
	DiscourseFormula: EnglishDiscourseFormulaBundle.LemmaSurfaceSchema,
	Idiom: EnglishIdiomBundle.LemmaSurfaceSchema,
	Proverb: EnglishProverbBundle.LemmaSurfaceSchema,
} satisfies DeprecatedSurfaceSchemaLanguageShape["Lemma"]["Phraseme"];
