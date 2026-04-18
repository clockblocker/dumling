import { deprecatedDecodeDumlingId, deprecatedDecodeDumlingIdAs } from "./internal/codec/decode";
import { deprecatedEncodeDumlingId } from "./internal/codec/encode";
import type { DeprecatedDumlingIdApiFor, DeprecatedDumlingIdLanguage } from "./types";

export type {
	DeprecatedConcreteDumlingIdKind,
	DeprecatedDumlingId,
	DeprecatedDumlingIdDecodeError,
	DeprecatedDumlingIdDecodeErrorCode,
	DeprecatedDumlingIdValueFor,
} from "./types";

/**
 * Creates language-scoped encoders and decoders for stable Dumling IDs.
 */
export function deprecatedLingIdApiForLanguage<
	L extends DeprecatedDumlingIdLanguage,
>(
	language: L,
): DeprecatedDumlingIdApiFor<L> {
	return {
		makeDumlingIdFor: ((value) =>
			deprecatedEncodeDumlingId(language, value as never)) as DeprecatedDumlingIdApiFor<L>["makeDumlingIdFor"],
		tryToDecode: (id: string) => deprecatedDecodeDumlingId(language, id),
		tryToDecodeAs: ((kind, id: string) =>
			deprecatedDecodeDumlingIdAs(
				language,
				kind,
				id,
			)) as DeprecatedDumlingIdApiFor<L>["tryToDecodeAs"],
	};
}
