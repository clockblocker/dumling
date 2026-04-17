import { lingIdApiForLanguage } from "./id/public";
import type { DumlingIdApiFor } from "./id/types";
import { LemmaSchema, SelectionSchema, SurfaceSchema } from "./lu/public-entities";
import {
	extractLemmaFromSurface,
	extractSurfaceFromSelection,
	operationForLanguage,
	toSurface,
	toStandardFullSelection,
	toStandardFullSelectionFromLemma,
} from "./lu/public-operations";
import type { LemmaKind } from "./lu/universal/enums/core/selection";
import type { TargetLanguage } from "./lu/universal/enums/core/language";
import type { LemmaDiscriminatorFor } from "./lu/universal/lemma-discriminator";

type SchemaForApi = {
	readonly Lemma: typeof LemmaSchema;
	readonly Selection: typeof SelectionSchema;
	readonly Surface: typeof SurfaceSchema;
};

const schemaFor: SchemaForApi = {
	Lemma: LemmaSchema,
	Selection: SelectionSchema,
	Surface: SurfaceSchema,
};

type OperationApi = {
	readonly convert: {
		readonly lemma: {
			readonly toSurface: typeof toSurface;
			readonly toStandardFullSelection: typeof toStandardFullSelectionFromLemma;
		};
		readonly surface: {
			readonly toStandardFullSelection: typeof toStandardFullSelection;
		};
	};
	readonly extract: {
		readonly lemma: {
			readonly fromSurface: typeof extractLemmaFromSurface;
		};
		readonly surface: {
			readonly fromSelection: typeof extractSurfaceFromSelection;
		};
	};
	readonly forLanguage: typeof operationForLanguage;
};

const operation: OperationApi = {
	convert: {
		lemma: {
			toSurface,
			toStandardFullSelection: toStandardFullSelectionFromLemma,
		},
		surface: {
			toStandardFullSelection,
		},
	},
	extract: {
		lemma: {
			fromSurface: extractLemmaFromSurface,
		},
		surface: {
			fromSelection: extractSurfaceFromSelection,
		},
	},
	forLanguage: operationForLanguage,
};

const idCodec = {
	English: lingIdApiForLanguage("English"),
	forLanguage: lingIdApiForLanguage,
	German: lingIdApiForLanguage("German"),
	Hebrew: lingIdApiForLanguage("Hebrew"),
} satisfies {
	forLanguage<L extends TargetLanguage>(language: L): DumlingIdApiFor<L>;
} & {
	[L in TargetLanguage]: DumlingIdApiFor<L>;
};

export type DumlingApi = {
	readonly idCodec: typeof idCodec;
	readonly operation: typeof operation;
	readonly schemaFor: typeof schemaFor;
};

export const dumling: DumlingApi = {
	idCodec,
	operation,
	schemaFor,
};

export type SupportedLang = TargetLanguage;
export type UniversalLemmaKind = LemmaKind;
export type UniversalLemmaSubKind =
	LemmaDiscriminatorFor<UniversalLemmaKind>;

export type {
	ConcreteDumlingIdKind,
	KnownSelection,
	DumlingId,
	DumlingIdDecodeError,
	DumlingIdDecodeErrorCode,
	DumlingIdValueFor,
} from "./id/public";

export type {
	Lemma,
	Selection,
	Surface,
} from "./lu/public-entities";
