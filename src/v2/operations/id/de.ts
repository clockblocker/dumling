import type {
	ApiResult,
	EntityKind,
	IdDecodeError,
	IdDecodeSuccess,
	Lemma,
	Selection,
	Surface,
} from "../../public-types";
import { decodeBase64Url, encodeBase64Url } from "../shared/base64url";
import { inferEntityKind } from "../shared/entity-accessors";
import { idError } from "../shared/id-errors";

type DeEntity = Lemma<"de"> | Surface<"de"> | Selection<"de">;
type DeDecodeSuccess = IdDecodeSuccess<"de">;
type DeDecodeResult = ApiResult<DeDecodeSuccess, IdDecodeError>;
type DeDecodeAsResult<K extends EntityKind> = ApiResult<
	Extract<
		DeEntity,
		K extends "Lemma"
			? { canonicalLemma: string }
			: K extends "Surface"
				? { surfaceKind: string }
				: { surface: unknown }
	>,
	IdDecodeError
>;

function isEntityKind(value: unknown): value is EntityKind {
	return value === "Lemma" || value === "Surface" || value === "Selection";
}

export function buildDeIdOperations(parse: ReturnType<typeof import("../parse/de").buildDeParseOperations>) {
	function decode(id: string): DeDecodeResult {
		if (!id.startsWith("dumling:v2:")) {
			return {
				success: false,
				error: idError("MalformedId", "Expected a dumling:v2: ID"),
			} as const;
		}

		let payloadText: string;
		try {
			payloadText = decodeBase64Url(id.slice("dumling:v2:".length));
		} catch {
			return {
				success: false,
				error: idError("MalformedId", "ID payload is not valid base64url"),
			} as const;
		}

		let payload: unknown;
		try {
			payload = JSON.parse(payloadText);
		} catch {
			return {
				success: false,
				error: idError("MalformedId", "ID payload is not valid JSON"),
			} as const;
		}

		if (
			typeof payload !== "object" ||
			payload === null ||
			!("v" in payload) ||
			!("entityKind" in payload) ||
			!("language" in payload) ||
			!("data" in payload)
		) {
			return {
				success: false,
				error: idError("InvalidPayload", "ID payload shape is invalid"),
			} as const;
		}

		const { v, entityKind, language, data } = payload as {
			data: unknown;
			entityKind: unknown;
			language: unknown;
			v: unknown;
		};

		if (v !== 2) {
			return {
				success: false,
				error: idError(
					"UnsupportedIdVersion",
					`Unsupported Dumling ID version: ${String(v)}`,
				),
			} as const;
		}

		if (language !== "de") {
			return {
				success: false,
				error: idError(
					"LanguageMismatch",
					`Expected ID for de, received ${String(language)}`,
				),
			} as const;
		}

		if (!isEntityKind(entityKind)) {
			return {
				success: false,
				error: idError("InvalidPayload", "ID payload entityKind is invalid"),
			} as const;
		}

		const parseResult =
			entityKind === "Lemma"
				? parse.lemma(data)
				: entityKind === "Surface"
					? parse.surface(data)
					: parse.selection(data);

		if (!parseResult.success) {
			return {
				success: false,
				error: idError("InvalidPayload", parseResult.error.message),
			} as const;
		}

		return {
			success: true,
			data: {
				entityKind,
				data: parseResult.data as DeEntity,
			},
		} as const;
	}

	const operations = {
		encode(value: DeEntity) {
			return `dumling:v2:${encodeBase64Url(
				JSON.stringify({
					v: 2,
					entityKind: inferEntityKind(value),
					language: "de",
					data: value,
				}),
			)}`;
		},
		decode(id: string): DeDecodeResult {
			return decode(id);
		},
		decodeAs<K extends EntityKind>(kind: K, id: string): DeDecodeAsResult<K> {
			const decoded = decode(id);

			if (!decoded.success) {
				return decoded;
			}

			if (decoded.data.entityKind !== kind) {
				return {
					success: false,
					error: idError(
						"EntityMismatch",
						`Expected ${kind}, received ${decoded.data.entityKind}`,
					),
				};
			}

			return {
				success: true,
				data: decoded.data.data as Extract<
					DeEntity,
					K extends "Lemma"
						? { canonicalLemma: string }
						: K extends "Surface"
							? { surfaceKind: string }
							: { surface: unknown }
				>,
			};
		},
	};

	return operations;
}
