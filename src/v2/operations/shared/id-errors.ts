import type { IdDecodeError, IdDecodeErrorCode } from "../../public-types";

export function idError(code: IdDecodeErrorCode, message: string): IdDecodeError {
	return { code, message };
}
