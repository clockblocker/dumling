import { decodeDumlingId, decodeDumlingIdAs } from "./internal/codec/decode";
import { encodeDumlingId } from "./internal/codec/encode";
import type { DumlingIdApiFor, DumlingIdLanguage } from "./types";

export type {
	ConcreteDumlingIdKind,
	DumlingId,
	DumlingIdDecodeError,
	DumlingIdDecodeErrorCode,
	DumlingIdValueFor,
} from "./types";

/**
 * Creates language-scoped encoders and decoders for stable Dumling IDs.
 */
export function lingIdApiForLanguage<
	L extends DumlingIdLanguage,
>(
	language: L,
): DumlingIdApiFor<L> {
	return {
		makeDumlingIdFor: ((value) =>
			encodeDumlingId(language, value as never)) as DumlingIdApiFor<L>["makeDumlingIdFor"],
		tryToDecode: (id: string) => decodeDumlingId(language, id),
		tryToDecodeAs: ((kind, id: string) =>
			decodeDumlingIdAs(
				language,
				kind,
				id,
			)) as DumlingIdApiFor<L>["tryToDecodeAs"],
	};
}
