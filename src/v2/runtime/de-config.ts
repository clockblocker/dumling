import { z } from "zod/v3";
import { LemmaKind, LexemeSubKind, MorphemeSubKind, PhrasemeSubKind } from "../types/core/enums";
import {
	featureValueSet,
	type FeatureSchemaMap,
	deAspectSchema,
	deCaseSchema,
	deDefiniteSchema,
	deDegreeSchema,
	deGenderSchema,
	deMoodSchema,
	deNumberSchema,
	dePersonSchema,
	dePolaritySchema,
	dePoliteSchema,
	deTenseSchema,
	deVerbFormSchema,
} from "./feature-schemas";
import {
	Abbr,
	AdpType,
	ConjType,
	DiscourseFormulaRole,
	ExtPos,
	Foreign,
	GovernedCase,
	HasGovPrep,
	HasSepPrefix,
	Hyph,
	LexicallyReflexive,
	NumType,
	PartType,
	Poss,
	PronType,
	PunctType,
	Reflex,
	Variant,
	VerbType,
	Voice,
} from "./schema-support";

export type DeLeafDefinition = {
	lemmaKind: z.infer<typeof LemmaKind>;
	lemmaSubKind: string;
	inherentFeatures: FeatureSchemaMap;
	inflectionalFeatures?: FeatureSchemaMap;
};

const deVerbalInflectionalFeatures = {
	aspect: featureValueSet(deAspectSchema).optional(),
	gender: featureValueSet(deGenderSchema).optional(),
	mood: featureValueSet(deMoodSchema).optional(),
	number: featureValueSet(deNumberSchema).optional(),
	person: featureValueSet(dePersonSchema).optional(),
	tense: featureValueSet(deTenseSchema).optional(),
	verbForm: featureValueSet(deVerbFormSchema).optional(),
	voice: featureValueSet(Voice.extract(["Pass"])).optional(),
};

export const deLeafDefinitions = {
	Lexeme: {
		ADJ: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADJ",
			inherentFeatures: {
				abbr: Abbr,
				foreign: Foreign,
				numType: NumType.extract(["Card", "Ord"]),
				variant: Variant,
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				degree: deDegreeSchema,
				gender: deGenderSchema,
				number: deNumberSchema,
			},
		},
		ADP: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADP",
			inherentFeatures: {
				abbr: Abbr,
				adpType: AdpType.extract(["Circ", "Post", "Prep"]),
				extPos: ExtPos.extract(["ADV", "SCONJ"]),
				foreign: Foreign,
				governedCase: GovernedCase,
				partType: PartType.extract(["Vbp"]),
			},
		},
		ADV: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "ADV",
			inherentFeatures: {
				foreign: Foreign,
				numType: NumType.extract(["Card", "Mult"]),
				pronType: PronType.extract(["Dem", "Ind", "Int", "Neg", "Rel"]),
			},
			inflectionalFeatures: {
				degree: deDegreeSchema,
			},
		},
		AUX: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "AUX",
			inherentFeatures: {
				verbType: VerbType.extract(["Mod"]),
			},
			inflectionalFeatures: deVerbalInflectionalFeatures,
		},
		CCONJ: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "CCONJ",
			inherentFeatures: {
				conjType: ConjType.extract(["Comp"]),
			},
		},
		DET: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "DET",
			inherentFeatures: {
				definite: deDefiniteSchema,
				extPos: ExtPos.extract(["ADV", "DET"]),
				foreign: Foreign,
				numType: NumType.extract(["Card", "Ord"]),
				person: dePersonSchema,
				polite: dePoliteSchema,
				poss: Poss,
				pronType: PronType.extract([
					"Art",
					"Dem",
					"Emp",
					"Exc",
					"Ind",
					"Int",
					"Neg",
					"Prs",
					"Rel",
					"Tot",
				]),
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				degree: deDegreeSchema,
				gender: featureValueSet(deGenderSchema),
				"gender[psor]": featureValueSet(deGenderSchema),
				number: deNumberSchema,
				"number[psor]": deNumberSchema,
			},
		},
		INTJ: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "INTJ",
			inherentFeatures: {
				partType: PartType.extract(["Res"]),
			},
		},
		NOUN: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "NOUN",
			inherentFeatures: {
				gender: deGenderSchema,
				hyph: Hyph,
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				number: deNumberSchema,
			},
		},
		NUM: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "NUM",
			inherentFeatures: {
				abbr: Abbr,
				foreign: Foreign,
				numType: NumType.extract(["Card", "Frac", "Mult", "Range"]),
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				gender: deGenderSchema,
				number: deNumberSchema,
			},
		},
		PART: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "PART",
			inherentFeatures: {
				abbr: Abbr,
				foreign: Foreign,
				partType: PartType.extract(["Inf"]),
				polarity: dePolaritySchema,
			},
		},
		PRON: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "PRON",
			inherentFeatures: {
				extPos: ExtPos.extract(["DET"]),
				foreign: Foreign,
				person: dePersonSchema,
				polite: dePoliteSchema,
				poss: Poss,
				pronType: PronType.extract([
					"Dem",
					"Ind",
					"Int",
					"Neg",
					"Prs",
					"Rcp",
					"Rel",
					"Tot",
				]),
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				gender: deGenderSchema,
				number: deNumberSchema,
				reflex: Reflex,
			},
		},
		PROPN: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "PROPN",
			inherentFeatures: {
				abbr: Abbr,
				foreign: Foreign,
				gender: deGenderSchema,
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				number: deNumberSchema,
			},
		},
		PUNCT: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "PUNCT",
			inherentFeatures: {
				punctType: PunctType,
			},
		},
		SCONJ: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "SCONJ",
			inherentFeatures: {
				conjType: ConjType.extract(["Comp"]),
			},
		},
		SYM: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "SYM",
			inherentFeatures: {
				foreign: Foreign,
				numType: NumType.extract(["Card", "Range"]),
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				gender: deGenderSchema,
				number: deNumberSchema,
			},
		},
		VERB: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "VERB",
			inherentFeatures: {
				hasGovPrep: HasGovPrep,
				hasSepPrefix: HasSepPrefix,
				lexicallyReflexive: LexicallyReflexive,
				verbType: VerbType.extract(["Mod"]),
			},
			inflectionalFeatures: deVerbalInflectionalFeatures,
		},
		X: {
			lemmaKind: "Lexeme",
			lemmaSubKind: "X",
			inherentFeatures: {
				abbr: Abbr,
				foreign: Foreign,
				hyph: Hyph,
				numType: NumType.extract(["Card", "Mult", "Range"]),
			},
			inflectionalFeatures: {
				case: deCaseSchema,
				gender: deGenderSchema,
				mood: deMoodSchema,
				number: deNumberSchema,
				verbForm: deVerbFormSchema,
			},
		},
	},
	Morpheme: {
		Circumfix: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Circumfix",
			inherentFeatures: {},
		},
		Clitic: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Clitic",
			inherentFeatures: {},
		},
		Duplifix: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Duplifix",
			inherentFeatures: {},
		},
		Infix: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Infix",
			inherentFeatures: {},
		},
		Interfix: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Interfix",
			inherentFeatures: {},
		},
		Prefix: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Prefix",
			inherentFeatures: {
				hasSepPrefix: HasSepPrefix,
			},
		},
		Root: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Root",
			inherentFeatures: {},
		},
		Suffix: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Suffix",
			inherentFeatures: {},
		},
		Suffixoid: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Suffixoid",
			inherentFeatures: {},
		},
		ToneMarking: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "ToneMarking",
			inherentFeatures: {},
		},
		Transfix: {
			lemmaKind: "Morpheme",
			lemmaSubKind: "Transfix",
			inherentFeatures: {},
		},
	},
	Phraseme: {
		Aphorism: {
			lemmaKind: "Phraseme",
			lemmaSubKind: "Aphorism",
			inherentFeatures: {},
		},
		DiscourseFormula: {
			lemmaKind: "Phraseme",
			lemmaSubKind: "DiscourseFormula",
			inherentFeatures: {
				discourseFormulaRole: DiscourseFormulaRole,
			},
		},
		Idiom: {
			lemmaKind: "Phraseme",
			lemmaSubKind: "Idiom",
			inherentFeatures: {},
		},
		Proverb: {
			lemmaKind: "Phraseme",
			lemmaSubKind: "Proverb",
			inherentFeatures: {},
		},
	},
} satisfies Record<string, Record<string, DeLeafDefinition>>;

export const abstractLeafDefinitions = {
	Lexeme: Object.fromEntries(
		LexemeSubKind.options.map((lemmaSubKind) => [
			lemmaSubKind,
			{
				lemmaKind: "Lexeme",
				lemmaSubKind,
				inherentFeatures: {},
				inflectionalFeatures: {},
			},
		]),
	),
	Morpheme: Object.fromEntries(
		MorphemeSubKind.options.map((lemmaSubKind) => [
			lemmaSubKind,
			{
				lemmaKind: "Morpheme",
				lemmaSubKind,
				inherentFeatures: {},
			},
		]),
	),
	Phraseme: Object.fromEntries(
		PhrasemeSubKind.options.map((lemmaSubKind) => [
			lemmaSubKind,
			{
				lemmaKind: "Phraseme",
				lemmaSubKind,
				inherentFeatures: {},
			},
		]),
	),
} satisfies Record<string, Record<string, DeLeafDefinition>>;

