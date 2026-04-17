import { lingIdApiForLanguage } from "./id/public";
import type { DumlingIdApiFor } from "./id/types";
import {
	LemmaSchema,
	ResolvedSurfaceSchema,
	SelectionSchema,
	SurfaceSchema,
} from "./lu/public-entities";
import {
	extractLemmaFromSurface,
	extractSurfaceFromSelection,
	operationForLanguage,
	resolveUnresolvedSurfaceWithLemma,
	toResolvedLemmaSurface,
	toStandardFullSelection,
	toStandardFullSelectionFromLemma,
	unresolveSurface,
} from "./lu/public-operations";
import type { TargetLanguage } from "./lu/universal/enums/core/language";

type SchemaForApi = {
	readonly Lemma: typeof LemmaSchema;
	readonly ResolvedSurface: typeof ResolvedSurfaceSchema;
	readonly Selection: typeof SelectionSchema;
	readonly Surface: typeof SurfaceSchema;
	readonly UnresolvedSurface: typeof SurfaceSchema;
};

const schemaFor: SchemaForApi = {
	Lemma: LemmaSchema,
	ResolvedSurface: ResolvedSurfaceSchema,
	Selection: SelectionSchema,
	Surface: SurfaceSchema,
	UnresolvedSurface: SurfaceSchema,
};

type OperationApi = {
	readonly convert: {
		readonly lemma: {
			readonly toResolvedLemmaSurface: typeof toResolvedLemmaSurface;
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
	readonly resolve: {
		readonly unresolvedSurface: {
			readonly withLemma: typeof resolveUnresolvedSurfaceWithLemma;
		};
	};
	readonly unresolve: {
		readonly surface: typeof unresolveSurface;
	};
};

const operation: OperationApi = {
	convert: {
		lemma: {
			toResolvedLemmaSurface,
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
	resolve: {
		unresolvedSurface: {
			withLemma: resolveUnresolvedSurfaceWithLemma,
		},
	},
	unresolve: {
		surface: unresolveSurface,
	},
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
	ResolvedSurface,
	Selection,
	Surface,
	UnresolvedSurface,
} from "./lu/public-entities";
