import {
	defineSchemaCatalog,
	type SchemaCatalogBundle,
	type SchemaCatalogDefinition,
} from "../../src/v2/schemas/shared/schema-catalog";
import type { DePhrasemeLemmaBySubKind } from "../../src/v2/types/language-packs/de/phraseme/de-phrasemes";

declare const bundle: SchemaCatalogBundle;
type PhrasemeCatalog = SchemaCatalogDefinition<keyof DePhrasemeLemmaBySubKind>;

const validCatalog = defineSchemaCatalog({
	aphorism: {
		key: "aphorism",
		lemmaSubKind: "Aphorism",
		hasInflection: false,
		bundle,
	},
	discourseformula: {
		key: "discourseformula",
		lemmaSubKind: "DiscourseFormula",
		hasInflection: false,
		bundle,
	},
	idiom: {
		key: "idiom",
		lemmaSubKind: "Idiom",
		hasInflection: false,
		bundle,
	},
	proverb: {
		key: "proverb",
		lemmaSubKind: "Proverb",
		hasInflection: false,
		bundle,
	},
} satisfies PhrasemeCatalog);

void validCatalog;

// @ts-expect-error missing required entry
const missingEntryCatalog: PhrasemeCatalog = {
	aphorism: {
		key: "aphorism",
		lemmaSubKind: "Aphorism",
		hasInflection: false,
		bundle,
	},
	discourseformula: {
		key: "discourseformula",
		lemmaSubKind: "DiscourseFormula",
		hasInflection: false,
		bundle,
	},
	idiom: {
		key: "idiom",
		lemmaSubKind: "Idiom",
		hasInflection: false,
		bundle,
	},
};

void missingEntryCatalog;

const unknownEntryCatalog: PhrasemeCatalog = {
	aphorism: {
		key: "aphorism",
		lemmaSubKind: "Aphorism",
		hasInflection: false,
		bundle,
	},
	discourseformula: {
		key: "discourseformula",
		lemmaSubKind: "DiscourseFormula",
		hasInflection: false,
		bundle,
	},
	idiom: {
		key: "idiom",
		lemmaSubKind: "Idiom",
		hasInflection: false,
		bundle,
	},
	proverb: {
		key: "proverb",
		lemmaSubKind: "Proverb",
		hasInflection: false,
		bundle,
	},
	// @ts-expect-error unknown entry key
	saying: {
		key: "saying",
		lemmaSubKind: "Proverb",
		hasInflection: false,
		bundle,
	},
};

void unknownEntryCatalog;
