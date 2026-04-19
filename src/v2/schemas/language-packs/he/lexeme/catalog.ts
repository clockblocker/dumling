import { z } from "zod/v3";
import type {
	InflectionalFeaturesFor,
	InherentFeaturesFor,
	Lemma,
} from "../../../../public-types";
import type { HeLexemeLemmaBySubKind } from "../../../../types/language-packs/he/lexeme/he-lexemes";
import { abstractFeatureAtomSchemas } from "../../../abstract/feature-schemas";
import {
	buildOptionalFeatureObjectSchema,
	requireNonEmptyFeatureObject,
	type FeatureSchemaShape,
} from "../../../shared/feature-helpers";
import {
	buildFamilySchemaCatalog,
	defineSchemaCatalog,
	type SchemaCatalogDefinition,
} from "../../../shared/schema-catalog";
import {
	type HeInflectableLexemeSchemaBundleFor,
	type HeUninflectableLexemeSchemaBundleFor,
	buildHeInflectableLexemeSchemaBundle,
	buildHeUninflectableLexemeSchemaBundle,
	buildLemmaSchema,
} from "./shared/build-he-lexeme-schema-bundle";

function exactFeatureValueSet<TSchema extends z.ZodTypeAny>(
	schema: TSchema,
	allowedValueSets: readonly (readonly [z.output<TSchema>, ...z.output<TSchema>[]])[],
) {
	return z.union([
		schema,
		z
			.array(schema)
			.min(1)
			.superRefine((values, ctx) => {
				if (new Set(values).size !== values.length) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Duplicate feature values are not allowed",
					});
					return;
				}

				const normalizedValues = [...values].sort();
				const isAllowed = allowedValueSets.some((allowedValues) => {
					const normalizedAllowedValues = [...allowedValues].sort();
					return (
						normalizedAllowedValues.length === normalizedValues.length &&
						normalizedAllowedValues.every(
							(allowedValue, index) => allowedValue === normalizedValues[index],
						)
					);
				});

				if (!isAllowed) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: "Unsupported feature value combination",
					});
				}
			}),
	]) as z.ZodType<
		z.output<TSchema> | readonly [z.output<TSchema>, ...z.output<TSchema>[]]
	>;
}

function buildFeatureSchema<T>(shape: FeatureSchemaShape): z.ZodType<T> {
	return buildOptionalFeatureObjectSchema(shape) as unknown as z.ZodType<T>;
}

function buildRequiredFeatureSchema<T>(shape: FeatureSchemaShape): z.ZodType<T> {
	return requireNonEmptyFeatureObject(
		buildOptionalFeatureObjectSchema(shape),
	) as unknown as z.ZodType<T>;
}

const heLanguageSchema = z.literal("he");

const heCaseSchema = abstractFeatureAtomSchemas.case.extract(["Acc", "Gen", "Tem"]);
const heDefiniteSchema = abstractFeatureAtomSchemas.definite.extract(["Cons", "Def"]);
const heGenderSchema = abstractFeatureAtomSchemas.gender.extract(["Fem", "Masc"]);
const heMoodSchema = abstractFeatureAtomSchemas.mood.extract(["Imp"]);
const heNumberSchema = abstractFeatureAtomSchemas.number.extract([
	"Dual",
	"Plur",
	"Sing",
]);
const hePersonSchema = abstractFeatureAtomSchemas.person.extract(["1", "2", "3"]);
const hePolaritySchema = abstractFeatureAtomSchemas.polarity.extract(["Neg", "Pos"]);
const hePronTypeSchema = abstractFeatureAtomSchemas.pronType.extract([
	"Art",
	"Dem",
	"Ind",
	"Int",
	"Prs",
]);
const heTenseSchema = abstractFeatureAtomSchemas.tense.extract(["Fut", "Past"]);
const heVerbFormSchema = abstractFeatureAtomSchemas.verbForm.extract([
	"Inf",
	"Part",
]);
const heVerbTypeSchema = abstractFeatureAtomSchemas.verbType.extract([
	"Cop",
	"Mod",
]);
const heVoiceSchema = abstractFeatureAtomSchemas.voice.extract([
	"Act",
	"Mid",
	"Pass",
]);

const heAdjectiveInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "ADJ">
>({
	abbr: abstractFeatureAtomSchemas.abbr,
});
const heAdjectiveInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "ADJ">
>({
	definite: heDefiniteSchema,
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
	number: heNumberSchema.extract(["Plur", "Sing"]),
});
const heAdjectiveLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADJ",
	inherentFeaturesSchema: heAdjectiveInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "ADJ">>;
const heAdjectiveSchemas = buildHeInflectableLexemeSchemaBundle<"ADJ">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heAdjectiveLemmaSchema,
	inflectionalFeaturesSchema: heAdjectiveInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"ADJ">;

const heAdpositionInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "ADP">
>({
	abbr: abstractFeatureAtomSchemas.abbr,
	case: heCaseSchema.extract(["Acc", "Gen"]),
});
const heAdpositionLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADP",
	inherentFeaturesSchema: heAdpositionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "ADP">>;
const heAdpositionSchemas = buildHeUninflectableLexemeSchemaBundle<"ADP">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heAdpositionLemmaSchema,
}) satisfies HeUninflectableLexemeSchemaBundleFor<"ADP">;

const heAdverbInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "ADV">
>({
	prefix: abstractFeatureAtomSchemas.prefix,
});
const heAdverbLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "ADV",
	inherentFeaturesSchema: heAdverbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "ADV">>;
const heAdverbSchemas = buildHeUninflectableLexemeSchemaBundle<"ADV">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heAdverbLemmaSchema,
}) satisfies HeUninflectableLexemeSchemaBundleFor<"ADV">;

const heAuxiliaryInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "AUX">
>({
	verbType: heVerbTypeSchema,
});
const heAuxiliaryInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "AUX">
>({
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
	number: heNumberSchema.extract(["Plur", "Sing"]),
	person: exactFeatureValueSet(hePersonSchema, [["1", "2", "3"]]),
	polarity: hePolaritySchema,
	tense: heTenseSchema,
	verbForm: heVerbFormSchema,
});
const heAuxiliaryLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "AUX",
	inherentFeaturesSchema: heAuxiliaryInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "AUX">>;
const heAuxiliarySchemas = buildHeInflectableLexemeSchemaBundle<"AUX">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heAuxiliaryLemmaSchema,
	inflectionalFeaturesSchema: heAuxiliaryInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"AUX">;

const heCoordinatingConjunctionInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "CCONJ">
>({});
const heCoordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "CCONJ",
	inherentFeaturesSchema: heCoordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "CCONJ">>;
const heCoordinatingConjunctionSchemas =
	buildHeUninflectableLexemeSchemaBundle<"CCONJ">({
		languageSchema: heLanguageSchema,
		lemmaSchema: heCoordinatingConjunctionLemmaSchema,
	}) satisfies HeUninflectableLexemeSchemaBundleFor<"CCONJ">;

const heDeterminerInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "DET">
>({
	pronType: hePronTypeSchema.extract(["Art", "Int"]),
});
const heDeterminerInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "DET">
>({
	definite: heDefiniteSchema,
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
	number: heNumberSchema.extract(["Plur", "Sing"]),
});
const heDeterminerLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "DET",
	inherentFeaturesSchema: heDeterminerInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "DET">>;
const heDeterminerSchemas = buildHeInflectableLexemeSchemaBundle<"DET">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heDeterminerLemmaSchema,
	inflectionalFeaturesSchema: heDeterminerInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"DET">;

const heInterjectionInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "INTJ">
>({});
const heInterjectionLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "INTJ",
	inherentFeaturesSchema: heInterjectionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "INTJ">>;
const heInterjectionSchemas = buildHeUninflectableLexemeSchemaBundle<"INTJ">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heInterjectionLemmaSchema,
}) satisfies HeUninflectableLexemeSchemaBundleFor<"INTJ">;

const heNounInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "NOUN">
>({
	abbr: abstractFeatureAtomSchemas.abbr,
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
});
const heNounInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "NOUN">
>({
	definite: heDefiniteSchema,
	number: exactFeatureValueSet(heNumberSchema.extract(["Dual", "Plur"]), [
		["Dual", "Plur"],
	]),
});
const heNounLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NOUN",
	inherentFeaturesSchema: heNounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "NOUN">>;
const heNounSchemas = buildHeInflectableLexemeSchemaBundle<"NOUN">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heNounLemmaSchema,
	inflectionalFeaturesSchema: heNounInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"NOUN">;

const heNumeralInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "NUM">
>({});
const heNumeralInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "NUM">
>({
	definite: heDefiniteSchema,
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
	number: exactFeatureValueSet(heNumberSchema.extract(["Dual", "Plur"]), [
		["Dual", "Plur"],
	]),
});
const heNumeralLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "NUM",
	inherentFeaturesSchema: heNumeralInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "NUM">>;
const heNumeralSchemas = buildHeInflectableLexemeSchemaBundle<"NUM">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heNumeralLemmaSchema,
	inflectionalFeaturesSchema: heNumeralInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"NUM">;

const hePronounInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "PRON">
>({
	definite: heDefiniteSchema.extract(["Def"]),
	pronType: hePronTypeSchema.extract(["Dem", "Ind", "Int", "Prs"]),
	reflex: abstractFeatureAtomSchemas.reflex,
});
const hePronounInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "PRON">
>({
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
	number: heNumberSchema.extract(["Plur", "Sing"]),
	person: hePersonSchema,
});
const hePronounLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PRON",
	inherentFeaturesSchema: hePronounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "PRON">>;
const hePronounSchemas = buildHeInflectableLexemeSchemaBundle<"PRON">({
	languageSchema: heLanguageSchema,
	lemmaSchema: hePronounLemmaSchema,
	inflectionalFeaturesSchema: hePronounInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"PRON">;

const heProperNounInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "PROPN">
>({
	abbr: abstractFeatureAtomSchemas.abbr,
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
});
const heProperNounInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "PROPN">
>({
	number: heNumberSchema.extract(["Plur", "Sing"]),
});
const heProperNounLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PROPN",
	inherentFeaturesSchema: heProperNounInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "PROPN">>;
const heProperNounSchemas = buildHeInflectableLexemeSchemaBundle<"PROPN">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heProperNounLemmaSchema,
	inflectionalFeaturesSchema: heProperNounInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"PROPN">;

const hePunctuationInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "PUNCT">
>({});
const hePunctuationLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "PUNCT",
	inherentFeaturesSchema: hePunctuationInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "PUNCT">>;
const hePunctuationSchemas = buildHeUninflectableLexemeSchemaBundle<"PUNCT">({
	languageSchema: heLanguageSchema,
	lemmaSchema: hePunctuationLemmaSchema,
}) satisfies HeUninflectableLexemeSchemaBundleFor<"PUNCT">;

const heSubordinatingConjunctionInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "SCONJ">
>({
	case: heCaseSchema.extract(["Tem"]),
});
const heSubordinatingConjunctionLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SCONJ",
	inherentFeaturesSchema: heSubordinatingConjunctionInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "SCONJ">>;
const heSubordinatingConjunctionSchemas =
	buildHeUninflectableLexemeSchemaBundle<"SCONJ">({
		languageSchema: heLanguageSchema,
		lemmaSchema: heSubordinatingConjunctionLemmaSchema,
	}) satisfies HeUninflectableLexemeSchemaBundleFor<"SCONJ">;

const heSymbolInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "SYM">
>({});
const heSymbolLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "SYM",
	inherentFeaturesSchema: heSymbolInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "SYM">>;
const heSymbolSchemas = buildHeUninflectableLexemeSchemaBundle<"SYM">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heSymbolLemmaSchema,
}) satisfies HeUninflectableLexemeSchemaBundleFor<"SYM">;

const heVerbInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "VERB">
>({
	hebBinyan: abstractFeatureAtomSchemas.hebBinyan,
	hebExistential: abstractFeatureAtomSchemas.hebExistential,
});
const heVerbInflectionalFeaturesSchema = buildRequiredFeatureSchema<
	InflectionalFeaturesFor<"he", "Lexeme", "VERB">
>({
	definite: heDefiniteSchema,
	gender: exactFeatureValueSet(heGenderSchema, [["Fem", "Masc"]]),
	mood: heMoodSchema,
	number: heNumberSchema.extract(["Plur", "Sing"]),
	person: exactFeatureValueSet(hePersonSchema, [["1", "2", "3"]]),
	polarity: hePolaritySchema,
	tense: heTenseSchema,
	verbForm: heVerbFormSchema,
	voice: heVoiceSchema,
});
const heVerbLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "VERB",
	inherentFeaturesSchema: heVerbInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "VERB">>;
const heVerbSchemas = buildHeInflectableLexemeSchemaBundle<"VERB">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heVerbLemmaSchema,
	inflectionalFeaturesSchema: heVerbInflectionalFeaturesSchema,
}) satisfies HeInflectableLexemeSchemaBundleFor<"VERB">;

const heOtherInherentFeaturesSchema = buildFeatureSchema<
	InherentFeaturesFor<"he", "Lexeme", "X">
>({});
const heOtherLemmaSchema = buildLemmaSchema({
	languageSchema: heLanguageSchema,
	lemmaKind: "Lexeme",
	lemmaSubKind: "X",
	inherentFeaturesSchema: heOtherInherentFeaturesSchema,
}) satisfies z.ZodType<Lemma<"he", "Lexeme", "X">>;
const heOtherSchemas = buildHeUninflectableLexemeSchemaBundle<"X">({
	languageSchema: heLanguageSchema,
	lemmaSchema: heOtherLemmaSchema,
}) satisfies HeUninflectableLexemeSchemaBundleFor<"X">;

export const heLexemeSchemaCatalog = defineSchemaCatalog({
	adj: {
		key: "adj",
		lemmaSubKind: "ADJ",
		hasInflection: true,
		bundle: heAdjectiveSchemas,
	},
	adp: {
		key: "adp",
		lemmaSubKind: "ADP",
		hasInflection: false,
		bundle: heAdpositionSchemas,
	},
	adv: {
		key: "adv",
		lemmaSubKind: "ADV",
		hasInflection: false,
		bundle: heAdverbSchemas,
	},
	aux: {
		key: "aux",
		lemmaSubKind: "AUX",
		hasInflection: true,
		bundle: heAuxiliarySchemas,
	},
	cconj: {
		key: "cconj",
		lemmaSubKind: "CCONJ",
		hasInflection: false,
		bundle: heCoordinatingConjunctionSchemas,
	},
	det: {
		key: "det",
		lemmaSubKind: "DET",
		hasInflection: true,
		bundle: heDeterminerSchemas,
	},
	intj: {
		key: "intj",
		lemmaSubKind: "INTJ",
		hasInflection: false,
		bundle: heInterjectionSchemas,
	},
	noun: {
		key: "noun",
		lemmaSubKind: "NOUN",
		hasInflection: true,
		bundle: heNounSchemas,
	},
	num: {
		key: "num",
		lemmaSubKind: "NUM",
		hasInflection: true,
		bundle: heNumeralSchemas,
	},
	pron: {
		key: "pron",
		lemmaSubKind: "PRON",
		hasInflection: true,
		bundle: hePronounSchemas,
	},
	propn: {
		key: "propn",
		lemmaSubKind: "PROPN",
		hasInflection: true,
		bundle: heProperNounSchemas,
	},
	punct: {
		key: "punct",
		lemmaSubKind: "PUNCT",
		hasInflection: false,
		bundle: hePunctuationSchemas,
	},
	sconj: {
		key: "sconj",
		lemmaSubKind: "SCONJ",
		hasInflection: false,
		bundle: heSubordinatingConjunctionSchemas,
	},
	sym: {
		key: "sym",
		lemmaSubKind: "SYM",
		hasInflection: false,
		bundle: heSymbolSchemas,
	},
	verb: {
		key: "verb",
		lemmaSubKind: "VERB",
		hasInflection: true,
		bundle: heVerbSchemas,
	},
	x: {
		key: "x",
		lemmaSubKind: "X",
		hasInflection: false,
		bundle: heOtherSchemas,
	},
} satisfies SchemaCatalogDefinition<keyof HeLexemeLemmaBySubKind>);

export const heLexemeCatalog = buildFamilySchemaCatalog(heLexemeSchemaCatalog);
