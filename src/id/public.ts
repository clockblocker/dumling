import type { TargetLanguage } from "../lu/universal/enums/core/language";
import { decodeDumlingId, decodeDumlingIdAs } from "./internal/codec/decode";
import { encodeDumlingId } from "./internal/codec/encode";
import type { DumlingIdApiFor } from "./types";

export type {
	ConcreteDumlingIdKind,
	DumlingId,
	DumlingIdDecodeError,
	DumlingIdDecodeErrorCode,
	DumlingIdValueFor,
} from "./types";

export function lingIdApiForLanguage<L extends TargetLanguage>(
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
