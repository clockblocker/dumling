import type { DumlingIdDecodeError, DumlingIdDecodeErrorCode } from "../types";

export function lingIdDecodeError(
	code: DumlingIdDecodeErrorCode,
	input: string,
	message: string,
	cause?: unknown,
): DumlingIdDecodeError {
	return {
		code,
		...(cause === undefined ? {} : { cause }),
		input,
		message,
	};
}
