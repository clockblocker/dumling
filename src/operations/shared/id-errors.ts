import type { IdDecodeError, IdDecodeErrorCode } from "../../types/public-types";

export function idError(code: IdDecodeErrorCode, message: string): IdDecodeError {
	return { code, message };
}
