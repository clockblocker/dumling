import { lingIdApiForLanguage as lingIdApiForLanguageInternal } from "./id/public";
import type { DumlingIdApiFor, DumlingIdLanguage } from "./id/types";

/**
 * @public
 * Creates a fresh language-bound helper object for stable Dumling ID encoding and decoding.
 * Import from `dumling/id` when you need codecs or ID types without pulling in the root convenience namespaces.
 */
export function lingIdApiForLanguage<
	L extends DumlingIdLanguage,
>(
	language: L,
): DumlingIdApiFor<L> {
	return lingIdApiForLanguageInternal(language);
}

export type {
	ConcreteDumlingIdKind,
	DumlingId,
	DumlingIdApiFor,
	DumlingIdDecodeError,
	DumlingIdDecodeErrorCode,
	DumlingIdLanguage,
	DumlingIdLemma,
	DumlingIdSelection,
	DumlingIdSurface,
	DumlingIdValueFor,
} from "./id/types";
