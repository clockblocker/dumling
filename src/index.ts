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

export const lingSchemaFor = {
	Lemma: LemmaSchema,
	ResolvedSurface: ResolvedSurfaceSchema,
	Selection: SelectionSchema,
	Surface: SurfaceSchema,
	UnresolvedSurface: SurfaceSchema,
};

export const lingOperation = {
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
} as const;

export const DumlingIdCodec = {
	English: lingIdApiForLanguage("English"),
	forLanguage: lingIdApiForLanguage,
	German: lingIdApiForLanguage("German"),
	Hebrew: lingIdApiForLanguage("Hebrew"),
} satisfies {
	forLanguage<L extends TargetLanguage>(language: L): DumlingIdApiFor<L>;
} & {
	[L in TargetLanguage]: DumlingIdApiFor<L>;
};

import type { TargetLanguage } from "./lu/universal/enums/core/language";
import type { DumlingEntity } from "./lu/universal/enums/core/ling-entity";

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

export * from "./relations/public";
