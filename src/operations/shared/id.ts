import type {
	DumlingBase64Url,
	DumlingCsv,
	Lemma,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../types/public-types";
import type {
	ApiResult,
	IdDecodeError,
	IdDecodeSuccess,
	LanguageApi,
} from "../api-shape";
import { decodeBase64Url, encodeBase64Url } from "./id-codec/base64url";
import {
	assertEntityIdFeatureConstraints,
	decodeReadableCsv,
	entityToReadableCsv,
} from "./id-codec/readable-csv";
import {
	readableCsvToTinyCsv,
	tinyCsvToReadableCsv,
} from "./id-codec/tiny-csv";
import { idError } from "./id-errors";

type DecodeResult<L extends SupportedLanguage> = ApiResult<
	IdDecodeSuccess<L>,
	IdDecodeError
>;

type IdAddressableEntity<L extends SupportedLanguage> = Lemma<L> | Surface<L>;

function entityForId<L extends SupportedLanguage>(
	value: Lemma<L> | Surface<L> | Selection<L>,
): IdAddressableEntity<L> {
	if ("surface" in value) {
		return value.surface as Surface<L>;
	}

	return value;
}

function assertParseSuccess<T>(
	result: ApiResult<T, { message: string }>,
	context: string,
): T {
	if (!result.success) {
		throw new Error(`${context}: ${result.error.message}`);
	}

	return result.data;
}

function canonicalizeEntity<L extends SupportedLanguage>(
	parse: LanguageApi<L>["parse"],
	value: Lemma<L> | Surface<L> | Selection<L>,
): IdAddressableEntity<L> {
	assertEntityIdFeatureConstraints(value);

	const idEntity = entityForId(value);
	const parsed =
		"surfaceKind" in idEntity
			? assertParseSuccess(
					parse.surface(idEntity),
					"Invalid Surface ID input",
				)
			: assertParseSuccess(
					parse.lemma(idEntity),
					"Invalid Lemma ID input",
				);

	assertEntityIdFeatureConstraints(parsed);
	return parsed as IdAddressableEntity<L>;
}

function decodeReadableAsSuccess<L extends SupportedLanguage>(
	language: L,
	parse: LanguageApi<L>["parse"],
	input: string,
	format: IdDecodeSuccess<L>["format"],
): DecodeResult<L> {
	const decoded = decodeReadableCsv(language, parse, input);
	if (!decoded.success) {
		return decoded;
	}

	if (decoded.data.kind === "Lemma") {
		return {
			success: true,
			data: {
				format,
				language,
				kind: "Lemma",
				lemma: decoded.data.lemma,
			},
		};
	}

	return {
		success: true,
		data: {
			format,
			language,
			kind: "Surface",
			surface: decoded.data.surface,
		},
	};
}

function shouldTreatAsReadableCsv(input: string) {
	return input.startsWith("Lemma") || input.startsWith("Surface");
}

function hasReadableCsvLeadingWhitespace(input: string) {
	return /^[\s\uFEFF]+(?:Lemma|Surface)/u.test(input);
}

function decodeAny<L extends SupportedLanguage>(
	language: L,
	parse: LanguageApi<L>["parse"],
	input: string,
): DecodeResult<L> {
	if (hasReadableCsvLeadingWhitespace(input)) {
		return {
			success: false,
			error: idError(
				"MalformedId",
				"Readable CSV IDs must not have leading whitespace or BOM",
			),
		};
	}

	if (shouldTreatAsReadableCsv(input)) {
		return decodeReadableAsSuccess(language, parse, input, "csv");
	}

	let tinyCsv: string;
	try {
		tinyCsv = decodeBase64Url(input);
	} catch {
		return {
			success: false,
			error: idError("MalformedId", "ID is not valid base64url"),
		};
	}

	const readableCsv = tinyCsvToReadableCsv(tinyCsv);
	if (!readableCsv.success) {
		return readableCsv;
	}

	return decodeReadableAsSuccess(
		language,
		parse,
		readableCsv.data,
		"base64url",
	);
}

function entityFromDecodeSuccess<L extends SupportedLanguage>(
	success: IdDecodeSuccess<L>,
): IdAddressableEntity<L> {
	return success.kind === "Lemma" ? success.lemma : success.surface;
}

export function buildIdOperations<L extends SupportedLanguage>(
	language: L,
	parse: LanguageApi<L>["parse"],
): LanguageApi<L>["id"] {
	function encodeCanonicalCsv(
		value: Lemma<L> | Surface<L> | Selection<L>,
	): DumlingCsv<L> {
		const canonical = canonicalizeEntity(parse, value);
		return entityToReadableCsv(canonical) as DumlingCsv<L>;
	}

	return {
		encode: {
			asCsv(value) {
				return encodeCanonicalCsv(value);
			},
			asBase64Url(value) {
				const csv =
					typeof value === "string"
						? (() => {
								const decoded = decodeReadableAsSuccess(
									language,
									parse,
									value,
									"csv",
								);
								if (!decoded.success) {
									throw new Error(decoded.error.message);
								}
								return entityToReadableCsv(
									entityFromDecodeSuccess(decoded.data),
								);
							})()
						: encodeCanonicalCsv(value);

				return encodeBase64Url(
					readableCsvToTinyCsv(csv),
				) as DumlingBase64Url<L>;
			},
		},
		decode: {
			any(input) {
				return decodeAny(language, parse, input);
			},
			asLemma(input) {
				const decoded = decodeAny(language, parse, input);
				if (!decoded.success) {
					return decoded;
				}

				if (decoded.data.kind !== "Lemma") {
					return {
						success: false,
						error: idError(
							"EntityMismatch",
							`Expected Lemma, received ${decoded.data.kind}`,
						),
					};
				}

				return decoded as ApiResult<
					Extract<IdDecodeSuccess<L>, { kind: "Lemma" }>,
					IdDecodeError
				>;
			},
			asSurface(input) {
				const decoded = decodeAny(language, parse, input);
				if (!decoded.success) {
					return decoded;
				}

				if (decoded.data.kind !== "Surface") {
					return {
						success: false,
						error: idError(
							"EntityMismatch",
							`Expected Surface, received ${decoded.data.kind}`,
						),
					};
				}

				return decoded as ApiResult<
					Extract<IdDecodeSuccess<L>, { kind: "Surface" }>,
					IdDecodeError
				>;
			},
		},
	};
}
