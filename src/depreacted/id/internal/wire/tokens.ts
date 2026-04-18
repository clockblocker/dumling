const ESCAPABLE_TOKEN_CHARS = /[%;,=-]/g;
const ESCAPED_DASH = "%2D";

export function deprecatedEscapeToken(value: string): string {
	return value.replace(ESCAPABLE_TOKEN_CHARS, (char) =>
		char === "-" ? ESCAPED_DASH : encodeURIComponent(char),
	);
}

export function deprecatedUnescapeToken(value: string): string {
	return decodeURIComponent(value);
}

export function deprecatedSerializeOptionalToken(value: string | undefined): string {
	return value === undefined ? "-" : deprecatedEscapeToken(value);
}

export function deprecatedParseOptionalToken(token: string): string | undefined {
	return token === "-" ? undefined : deprecatedUnescapeToken(token);
}

export function deprecatedJoinTokens(parts: readonly string[]): string {
	return parts.join(";");
}

export function deprecatedSplitLeadingTokens(
	body: string,
	partCount: number,
	label: string,
): string[] {
	const parts: string[] = [];
	let remainder = body;

	for (let index = 0; index < partCount - 1; index += 1) {
		const separatorIndex = remainder.indexOf(";");

		if (separatorIndex === -1) {
			throw new Error(`Malformed ${label} payload in Dumling ID: ${body}`);
		}

		parts.push(remainder.slice(0, separatorIndex));
		remainder = remainder.slice(separatorIndex + 1);
	}

	parts.push(remainder);

	return parts;
}
