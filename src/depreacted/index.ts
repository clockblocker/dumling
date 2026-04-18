import type { DeprecatedDumlingLanguage, DeprecatedLemma, DeprecatedSelection, DeprecatedSurface } from "./entities.js";
import { deprecatedLingIdApiForLanguage } from "./id.js";
import type { DeprecatedDumlingIdApiFor } from "./id.js";
import {
	deprecatedExtractLemmaFromSurface,
	deprecatedExtractSurfaceFromSelection,
	deprecatedOperationForLanguage,
	deprecatedToSurface,
	deprecatedToStandardFullSelection,
	deprecatedToStandardFullSelectionFromLemma,
} from "./operation.js";
import type {
	DeprecatedDumlingOperationApiFor,
	DeprecatedLemmaSurface,
	DeprecatedStandardFullSelection,
	DeprecatedStandardFullSelectionOptions,
} from "./operation.js";

/**
 * @public
 * Root operation namespace for the common convert and extract flows.
 * Import from `dumling` when you want the ergonomic default API; import from `dumling/operation` when you want direct helpers and operation-specific types with clearer tree-shaking.
 */
export type DeprecatedDumlingOperationNamespace = {
	readonly convert: {
		readonly lemma: {
			readonly toSurface: <LemmaValue extends DeprecatedLemma = DeprecatedLemma>(
				lemma: LemmaValue,
			) => DeprecatedLemmaSurface<LemmaValue>;
			readonly toStandardFullSelection: <LemmaValue extends DeprecatedLemma = DeprecatedLemma>(
				lemma: LemmaValue,
				options?: DeprecatedStandardFullSelectionOptions,
			) => DeprecatedStandardFullSelection<DeprecatedLemmaSurface<LemmaValue>>;
		};
		readonly surface: {
			readonly toStandardFullSelection: <SurfaceValue extends DeprecatedSurface = DeprecatedSurface>(
				surface: SurfaceValue,
				options?: DeprecatedStandardFullSelectionOptions,
			) => DeprecatedStandardFullSelection<SurfaceValue>;
		};
	};
	readonly extract: {
		readonly lemma: {
			readonly fromSurface: <SurfaceValue extends DeprecatedSurface = DeprecatedSurface>(
				surface: SurfaceValue,
			) => SurfaceValue["lemma"];
		};
		readonly surface: {
			readonly fromSelection: <SelectionValue extends DeprecatedSelection = DeprecatedSelection>(
				selection: SelectionValue,
			) => SelectionValue["surface"];
		};
	};
	readonly forLanguage: <L extends DeprecatedDumlingLanguage>(
		language: L,
	) => DeprecatedDumlingOperationApiFor<L>;
};

/**
 * @public
 * Root convert and extract helpers for the most common Dumling workflows.
 * The root keeps the high-frequency helpers, while `dumling/operation` exposes the same primitives directly for operation-focused imports.
 */
export const deprecatedOperation: DeprecatedDumlingOperationNamespace = {
	convert: {
		lemma: {
			toSurface: deprecatedToSurface,
			toStandardFullSelection: deprecatedToStandardFullSelectionFromLemma,
		},
		surface: {
			toStandardFullSelection: deprecatedToStandardFullSelection,
		},
	},
	extract: {
		lemma: {
			fromSurface: deprecatedExtractLemmaFromSurface,
		},
		surface: {
			fromSelection: deprecatedExtractSurfaceFromSelection,
		},
	},
	forLanguage: deprecatedOperationForLanguage,
};

/**
 * @public
 * Root stable ID codecs for supported Dumling languages.
 * The root keeps ready-made singletons, while `dumling/id` is where the factory and ID-specific types live when you want a smaller import surface.
 */
export type DeprecatedDumlingIdCodecNamespace = {
	readonly forLanguage: <L extends DeprecatedDumlingLanguage>(
		language: L,
	) => DeprecatedDumlingIdApiFor<L>;
	readonly English: DeprecatedDumlingIdApiFor<"English">;
	readonly German: DeprecatedDumlingIdApiFor<"German">;
	readonly Hebrew: DeprecatedDumlingIdApiFor<"Hebrew">;
};

/**
 * @public
 * Root stable ID codecs for supported Dumling languages.
 * The root keeps ready-made singletons, while `dumling/id` is where the factory and ID-specific types live when you want a smaller import surface.
 */
export const deprecatedIdCodec: DeprecatedDumlingIdCodecNamespace = {
	English: deprecatedLingIdApiForLanguage("English"),
	forLanguage: deprecatedLingIdApiForLanguage,
	German: deprecatedLingIdApiForLanguage("German"),
	Hebrew: deprecatedLingIdApiForLanguage("Hebrew"),
};

/**
 * @public
 * Convenience namespace that groups the root operation and ID helpers.
 * Use the root when you want the defaults in one place; use subpaths such as `dumling/id`, `dumling/operation`, `dumling/schema`, and `dumling/entities` when you want narrower imports and types.
 */
export type DeprecatedDumlingApi = {
	readonly idCodec: typeof deprecatedIdCodec;
	readonly operation: typeof deprecatedOperation;
};

/**
 * @public
 * Convenience namespace for the root ID and operation APIs.
 */
export const deprecatedDumling: DeprecatedDumlingApi = {
	idCodec: deprecatedIdCodec,
	operation: deprecatedOperation,
};
