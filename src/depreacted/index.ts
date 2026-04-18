import type { DumlingLanguage, Lemma, Selection, Surface } from "./entities.js";
import { lingIdApiForLanguage } from "./id.js";
import type { DumlingIdApiFor } from "./id.js";
import {
	extractLemmaFromSurface,
	extractSurfaceFromSelection,
	operationForLanguage,
	toSurface,
	toStandardFullSelection,
	toStandardFullSelectionFromLemma,
} from "./operation.js";
import type {
	DumlingOperationApiFor,
	LemmaSurface,
	StandardFullSelection,
	StandardFullSelectionOptions,
} from "./operation.js";

/**
 * @public
 * Root operation namespace for the common convert and extract flows.
 * Import from `dumling` when you want the ergonomic default API; import from `dumling/operation` when you want direct helpers and operation-specific types with clearer tree-shaking.
 */
export type DumlingOperationNamespace = {
	readonly convert: {
		readonly lemma: {
			readonly toSurface: <LemmaValue extends Lemma = Lemma>(
				lemma: LemmaValue,
			) => LemmaSurface<LemmaValue>;
			readonly toStandardFullSelection: <LemmaValue extends Lemma = Lemma>(
				lemma: LemmaValue,
				options?: StandardFullSelectionOptions,
			) => StandardFullSelection<LemmaSurface<LemmaValue>>;
		};
		readonly surface: {
			readonly toStandardFullSelection: <SurfaceValue extends Surface = Surface>(
				surface: SurfaceValue,
				options?: StandardFullSelectionOptions,
			) => StandardFullSelection<SurfaceValue>;
		};
	};
	readonly extract: {
		readonly lemma: {
			readonly fromSurface: <SurfaceValue extends Surface = Surface>(
				surface: SurfaceValue,
			) => SurfaceValue["lemma"];
		};
		readonly surface: {
			readonly fromSelection: <SelectionValue extends Selection = Selection>(
				selection: SelectionValue,
			) => SelectionValue["surface"];
		};
	};
	readonly forLanguage: <L extends DumlingLanguage>(
		language: L,
	) => DumlingOperationApiFor<L>;
};

/**
 * @public
 * Root convert and extract helpers for the most common Dumling workflows.
 * The root keeps the high-frequency helpers, while `dumling/operation` exposes the same primitives directly for operation-focused imports.
 */
export const operation: DumlingOperationNamespace = {
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

/**
 * @public
 * Root stable ID codecs for supported Dumling languages.
 * The root keeps ready-made singletons, while `dumling/id` is where the factory and ID-specific types live when you want a smaller import surface.
 */
export type DumlingIdCodecNamespace = {
	readonly forLanguage: <L extends DumlingLanguage>(
		language: L,
	) => DumlingIdApiFor<L>;
	readonly English: DumlingIdApiFor<"English">;
	readonly German: DumlingIdApiFor<"German">;
	readonly Hebrew: DumlingIdApiFor<"Hebrew">;
};

/**
 * @public
 * Root stable ID codecs for supported Dumling languages.
 * The root keeps ready-made singletons, while `dumling/id` is where the factory and ID-specific types live when you want a smaller import surface.
 */
export const idCodec: DumlingIdCodecNamespace = {
	English: lingIdApiForLanguage("English"),
	forLanguage: lingIdApiForLanguage,
	German: lingIdApiForLanguage("German"),
	Hebrew: lingIdApiForLanguage("Hebrew"),
};

/**
 * @public
 * Convenience namespace that groups the root operation and ID helpers.
 * Use the root when you want the defaults in one place; use subpaths such as `dumling/id`, `dumling/operation`, `dumling/schema`, and `dumling/entities` when you want narrower imports and types.
 */
export type DumlingApi = {
	readonly idCodec: typeof idCodec;
	readonly operation: typeof operation;
};

/**
 * @public
 * Convenience namespace for the root ID and operation APIs.
 */
export const dumling: DumlingApi = {
	idCodec,
	operation,
};
