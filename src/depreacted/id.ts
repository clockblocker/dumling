import { deprecatedLingIdApiForLanguage as lingIdApiForLanguageInternal } from "./id/public";
import type { DeprecatedDumlingIdApiFor, DeprecatedDumlingIdLanguage } from "./id/types";

/**
 * @public
 * Creates a fresh language-bound helper object for stable Dumling ID encoding and decoding.
 * Import from `dumling/id` when you need codecs or ID types without pulling in the root convenience namespaces.
 */
export function deprecatedLingIdApiForLanguage<
	L extends DeprecatedDumlingIdLanguage,
>(
	language: L,
): DeprecatedDumlingIdApiFor<L> {
	return lingIdApiForLanguageInternal(language);
}

export type {
	DeprecatedConcreteDumlingIdKind,
	DeprecatedDumlingId,
	DeprecatedDumlingIdApiFor,
	DeprecatedDumlingIdDecodeError,
	DeprecatedDumlingIdDecodeErrorCode,
	DeprecatedDumlingIdLanguage,
	DeprecatedDumlingIdLemma,
	DeprecatedDumlingIdSelection,
	DeprecatedDumlingIdSurface,
	DeprecatedDumlingIdValueFor,
} from "./id/types";
