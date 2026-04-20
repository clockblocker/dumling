import type {
	ApiResult,
	EntityKind,
	IdDecodeError,
	IdDecodeSuccess,
	LanguageApi,
	Lemma,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../public-types";
import { decodeBase64Url, encodeBase64Url } from "./base64url";
import { inferEntityKind } from "./entity-accessors";
import { idError } from "./id-errors";

type EntityValue<L extends SupportedLanguage> = Lemma<L> | Surface<L> | Selection<L>;
type DecodeResult<L extends SupportedLanguage> = ApiResult<IdDecodeSuccess<L>, IdDecodeError>;

function isEntityKind(value: unknown): value is EntityKind {
	return value === "Lemma" || value === "Surface" || value === "Selection";
}

export function buildIdOperations<L extends SupportedLanguage>(
	language: L,
	parse: LanguageApi<L>["parse"],
): LanguageApi<L>["id"] {
	function decode(id: string): DecodeResult<L> {
		if (!id.startsWith("dumling:v2:")) {
			return {
				success: false,
				error: idError("MalformedId", "Expected a dumling:v2: ID"),
			};
		}

		let payloadText: string;
		try {
			payloadText = decodeBase64Url(id.slice("dumling:v2:".length));
		} catch {
			return {
				success: false,
				error: idError("MalformedId", "ID payload is not valid base64url"),
			};
		}

		let payload: unknown;
		try {
			payload = JSON.parse(payloadText);
		} catch {
			return {
				success: false,
				error: idError("MalformedId", "ID payload is not valid JSON"),
			};
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
			};
		}

		const { v, entityKind, language: payloadLanguage, data } = payload as {
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
			};
		}

		if (payloadLanguage !== language) {
			return {
				success: false,
				error: idError(
					"LanguageMismatch",
					`Expected ID for ${language}, received ${String(payloadLanguage)}`,
				),
			};
		}

		if (!isEntityKind(entityKind)) {
			return {
				success: false,
				error: idError("InvalidPayload", "ID payload entityKind is invalid"),
			};
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
			};
		}

		return {
			success: true,
			data: {
				entityKind,
				data: parseResult.data as EntityValue<L>,
			} as IdDecodeSuccess<L>,
		};
	}

	return {
		encode(value: EntityValue<L>) {
			return `dumling:v2:${encodeBase64Url(
				JSON.stringify({
					v: 2,
					entityKind: inferEntityKind(value),
					language,
					data: value,
				}),
			)}`;
		},
		decode(id: string) {
			return decode(id);
		},
		decodeAs(kind: EntityKind, id: string) {
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
				data: decoded.data.data as never,
			};
		},
	} as unknown as LanguageApi<L>["id"];
}
