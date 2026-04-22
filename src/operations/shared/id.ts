import type {
	DumlingId,
	DumlingIdInspection,
	EntityKind,
	EntityValue,
	SupportedLanguage,
} from "../../types/public-types";
import type {
	ApiResult,
	IdDecodeError,
	IdDecodeSuccess,
	LanguageApi,
} from "../api-shape";
import { decodeBase64Url, encodeBase64Url } from "./base64url";
import { inferEntityKind } from "./entity-accessors";
import { idError } from "./id-errors";
import { isSupportedLanguage } from "./language-inventory";

type DecodeResult<L extends SupportedLanguage> = ApiResult<
	IdDecodeSuccess<L>,
	IdDecodeError
>;
const ID_PREFIX = "dumling:";

function isEntityKind(value: unknown): value is EntityKind {
	return value === "Lemma" || value === "Surface" || value === "Selection";
}

export function inspectId(id: string): DumlingIdInspection | undefined {
	if (!id.startsWith(ID_PREFIX)) {
		return undefined;
	}

	let payload: unknown;
	try {
		payload = JSON.parse(decodeBase64Url(id.slice(ID_PREFIX.length)));
	} catch {
		return undefined;
	}

	if (typeof payload !== "object" || payload === null) {
		return undefined;
	}

	const { entityKind, language } = payload as {
		entityKind?: unknown;
		language?: unknown;
	};

	if (!isEntityKind(entityKind) || !isSupportedLanguage(language)) {
		return undefined;
	}

	return {
		kind: entityKind,
		language,
	};
}

export function buildIdOperations<L extends SupportedLanguage>(
	language: L,
	parse: LanguageApi<L>["parse"],
): LanguageApi<L>["id"] {
	function decode(id: string): DecodeResult<L> {
		if (!id.startsWith(ID_PREFIX)) {
			return {
				success: false,
				error: idError("MalformedId", `Expected a ${ID_PREFIX} ID`),
			};
		}

		let payloadText: string;
		try {
			payloadText = decodeBase64Url(id.slice(ID_PREFIX.length));
		} catch {
			return {
				success: false,
				error: idError(
					"MalformedId",
					"ID payload is not valid base64url",
				),
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
			!("entityKind" in payload) ||
			!("language" in payload) ||
			!("data" in payload)
		) {
			return {
				success: false,
				error: idError("InvalidPayload", "ID payload shape is invalid"),
			};
		}

		const {
			entityKind,
			language: payloadLanguage,
			data,
		} = payload as {
			data: unknown;
			entityKind: unknown;
			language: unknown;
		};

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
				error: idError(
					"InvalidPayload",
					"ID payload entityKind is invalid",
				),
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
		encode(value: EntityValue<L>): DumlingId<EntityKind, L> {
			return `${ID_PREFIX}${encodeBase64Url(
				JSON.stringify({
					entityKind: inferEntityKind(value),
					language,
					data: value,
				}),
			)}` as DumlingId<EntityKind, L>;
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
