import type { DeprecatedDumlingIdDecodeError, DeprecatedDumlingIdDecodeErrorCode } from "../types";

export function deprecatedLingIdDecodeError(
	code: DeprecatedDumlingIdDecodeErrorCode,
	input: string,
	message: string,
	cause?: unknown,
): DeprecatedDumlingIdDecodeError {
	return {
		code,
		...(cause === undefined ? {} : { cause }),
		input,
		message,
	};
}
