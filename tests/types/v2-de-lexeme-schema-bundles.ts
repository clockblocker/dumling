import { z } from "zod/v3";
import {
	deAdjectiveLemmaSchema,
	deAdjectiveSchemas,
} from "../../src/schemas/language-packs/de/lexeme/pos/de-adjective";
import { deAdpositionInherentFeaturesSchema } from "../../src/schemas/language-packs/de/lexeme/pos/de-adposition";
import {
	deAdpositionLemmaSchema,
	deAdpositionSchemas,
} from "../../src/schemas/language-packs/de/lexeme/pos/de-adposition";
import {
	buildDeInflectableLexemeSchemaBundle,
} from "../../src/schemas/language-packs/de/lexeme/shared/build-de-lexeme-schema-bundle";
import type {
	DeInflectableLexemeSchemaBundleFor,
	DeUninflectableLexemeSchemaBundleFor,
} from "../../src/schemas/language-packs/de/lexeme/shared/build-de-lexeme-schema-bundle";
import type { DeAdjectiveLemma } from "../../src/types/language-packs/de/lexeme/pos/de-adjective";

deAdjectiveLemmaSchema satisfies z.ZodType<DeAdjectiveLemma>;
deAdjectiveSchemas satisfies DeInflectableLexemeSchemaBundleFor<"ADJ">;
deAdpositionSchemas satisfies DeUninflectableLexemeSchemaBundleFor<"ADP">;

// @ts-expect-error ADP is not an inflectable lexeme subkind
buildDeInflectableLexemeSchemaBundle<"ADP">({
	languageSchema: z.literal("de"),
	lemmaSchema: deAdpositionLemmaSchema,
	inflectionalFeaturesSchema: deAdpositionInherentFeaturesSchema,
});

// @ts-expect-error PUNCT is not an inflectable lexeme subkind
buildDeInflectableLexemeSchemaBundle<"PUNCT">({
	languageSchema: z.literal("de"),
	lemmaSchema: deAdpositionLemmaSchema,
	inflectionalFeaturesSchema: deAdpositionInherentFeaturesSchema,
});

// @ts-expect-error uninflectable bundles do not expose inflection surfaces
deAdpositionSchemas.surface.inflection;

buildDeInflectableLexemeSchemaBundle<"ADJ">({
	languageSchema: z.literal("de"),
	lemmaSchema: deAdjectiveLemmaSchema,
	// @ts-expect-error adjective inflection features must not use adposition inherent features
	inflectionalFeaturesSchema: deAdpositionInherentFeaturesSchema,
});
