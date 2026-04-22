import type {
	Lemma,
	OrthographicStatus,
	Selection,
	SupportedLanguage,
	Surface,
} from "../../types/public-types";
import type { ApiResult, LanguageApi, ParseError } from "../api-shape";

type CsvValue = string | number | boolean | null | undefined;

type SelectionOptions<TStatus extends OrthographicStatus = OrthographicStatus> =
	{
		orthographicStatus?: TStatus;
		selectionCoverage?: Selection<SupportedLanguage>["selectionCoverage"];
		spelledSelection?: string;
		spellingRelation?: Selection<SupportedLanguage>["spellingRelation"];
	};

function buildSelectionFromSurface<
	L extends SupportedLanguage,
	TStatus extends OrthographicStatus = "Standard",
>(
	surface: Surface<L>,
	options: SelectionOptions<TStatus> = {},
): Selection<L, TStatus> {
	return {
		language: surface.language,
		orthographicStatus: options.orthographicStatus ?? "Standard",
		selectionCoverage: options.selectionCoverage ?? "Full",
		spelledSelection:
			options.spelledSelection ?? surface.normalizedFullSurface,
		spellingRelation: options.spellingRelation ?? "Canonical",
		surface,
	} as unknown as Selection<L, TStatus>;
}

function stableJson(value: unknown): string {
	if (Array.isArray(value)) {
		return `[${value.map(stableJson).join(",")}]`;
	}

	if (typeof value === "object" && value !== null) {
		return `{${Object.entries(value)
			.sort(([left], [right]) => left.localeCompare(right))
			.map(
				([key, entry]) => `${JSON.stringify(key)}:${stableJson(entry)}`,
			)
			.join(",")}}`;
	}

	return JSON.stringify(value);
}

function csvField(value: CsvValue): string {
	const text = value == null ? "" : String(value);

	if (!/[",\r\n]/u.test(text)) {
		return text;
	}

	return `"${text.replaceAll('"', '""')}"`;
}

function csvRow(fields: CsvValue[]): string {
	return fields.map(csvField).join(",");
}

function formatError<L extends SupportedLanguage>(
	language: L,
	message: string,
): ApiResult<never, ParseError> {
	return {
		success: false,
		error: {
			code: "InvalidInput",
			language,
			message,
		},
	};
}

function parseCsvRow<L extends SupportedLanguage>(
	language: L,
	input: string,
): ApiResult<string[], ParseError> {
	const fields: string[] = [];
	let field = "";
	let inQuotes = false;

	for (let index = 0; index < input.length; index += 1) {
		const character = input[index];

		if (inQuotes) {
			if (character === '"') {
				if (input[index + 1] === '"') {
					field += '"';
					index += 1;
				} else {
					inQuotes = false;
				}
			} else {
				field += character;
			}
			continue;
		}

		if (character === ",") {
			fields.push(field);
			field = "";
			continue;
		}

		if (character === '"') {
			if (field.length > 0) {
				return formatError(
					language,
					"CSV quotes must start at the beginning of a field",
				);
			}
			inQuotes = true;
			continue;
		}

		field += character;
	}

	if (inQuotes) {
		return formatError(language, "CSV row contains an unterminated quote");
	}

	fields.push(field);
	return {
		success: true,
		data: fields,
	};
}

function parseFeatureJson(
	language: SupportedLanguage,
	input: string,
	fieldName: string,
): ApiResult<unknown, ParseError> {
	try {
		return {
			success: true,
			data: JSON.parse(input),
		};
	} catch {
		return formatError(language, `${fieldName} is not valid JSON`);
	}
}

function lemmaToCsvFields<L extends SupportedLanguage>(lemma: Lemma<L>) {
	return [
		"Lemma",
		lemma.canonicalLemma,
		lemma.lemmaKind,
		lemma.lemmaSubKind,
		stableJson(lemma.inherentFeatures),
		lemma.meaningInEmojis,
	];
}

function surfaceToCsvFields<L extends SupportedLanguage>(surface: Surface<L>) {
	const surfaceFields: CsvValue[] = [
		"Surface",
		surface.surfaceKind,
		surface.normalizedFullSurface,
	];

	if ("inflectionalFeatures" in surface) {
		surfaceFields.push(stableJson(surface.inflectionalFeatures));
	}

	return [...surfaceFields, ...lemmaToCsvFields(surface.lemma)];
}

function formatValueToCsv<L extends SupportedLanguage>(
	value: Lemma<L> | Surface<L>,
) {
	if ("surfaceKind" in value) {
		return csvRow(surfaceToCsvFields(value));
	}

	return csvRow(lemmaToCsvFields(value));
}

function parseLemmaCsvFields<L extends SupportedLanguage>(
	language: L,
	fields: string[],
	parse: LanguageApi<L>["parse"],
): ApiResult<Lemma<L>, ParseError> {
	if (fields.length !== 6 || fields[0] !== "Lemma") {
		return formatError(language, "CSV row is not a Lemma row");
	}

	const [
		,
		canonicalLemma,
		lemmaKind,
		lemmaSubKind,
		inherentFeaturesField,
		meaningInEmojis,
	] = fields as [string, string, string, string, string, string];

	const inherentFeatures = parseFeatureJson(
		language,
		inherentFeaturesField,
		"inherentFeatures",
	);
	if (!inherentFeatures.success) {
		return inherentFeatures;
	}

	return parse.lemma({
		language,
		canonicalLemma,
		lemmaKind,
		lemmaSubKind,
		inherentFeatures: inherentFeatures.data,
		meaningInEmojis,
	});
}

function parseFormattedValue<L extends SupportedLanguage>(
	language: L,
	value: unknown,
	parse: LanguageApi<L>["parse"],
): ApiResult<Lemma<L> | Surface<L>, ParseError> {
	if (typeof value !== "object" || value === null) {
		return formatError(language, "Formatted value must be an object");
	}

	if ("surfaceKind" in value) {
		return parse.surface(value);
	}

	if ("canonicalLemma" in value) {
		return parse.lemma(value);
	}

	return formatError(language, "Formatted value must be a Lemma or Surface");
}

function parseCsvFormat<L extends SupportedLanguage>(
	language: L,
	parse: LanguageApi<L>["parse"],
	input: string,
): ApiResult<Lemma<L> | Surface<L>, ParseError> {
	const parsedRow = parseCsvRow(language, input);
	if (!parsedRow.success) {
		return formatError(language, parsedRow.error.message);
	}

	const fields = parsedRow.data;
	if (fields[0] === "Lemma") {
		return parseLemmaCsvFields(language, fields, parse);
	}

	if (fields[0] !== "Surface") {
		return formatError(
			language,
			"CSV row must start with Lemma or Surface",
		);
	}

	if (fields[1] === "Citation") {
		if (fields.length !== 9) {
			return formatError(
				language,
				"Citation surface CSV rows must contain 9 fields",
			);
		}

		const parsedLemma = parseLemmaCsvFields(
			language,
			fields.slice(3),
			parse,
		);
		if (!parsedLemma.success) {
			return parsedLemma;
		}

		return parse.surface({
			language,
			surfaceKind: fields[1],
			normalizedFullSurface: fields[2],
			lemma: parsedLemma.data,
		});
	}

	if (fields[1] === "Inflection") {
		if (fields.length !== 10) {
			return formatError(
				language,
				"Inflection surface CSV rows must contain 10 fields",
			);
		}

		const inflectionalFeaturesField = fields[3] ?? "";
		const inflectionalFeatures = parseFeatureJson(
			language,
			inflectionalFeaturesField,
			"inflectionalFeatures",
		);
		if (!inflectionalFeatures.success) {
			return inflectionalFeatures;
		}

		const parsedLemma = parseLemmaCsvFields(
			language,
			fields.slice(4),
			parse,
		);
		if (!parsedLemma.success) {
			return parsedLemma;
		}

		return parse.surface({
			language,
			surfaceKind: fields[1],
			normalizedFullSurface: fields[2],
			inflectionalFeatures: inflectionalFeatures.data,
			lemma: parsedLemma.data,
		});
	}

	return formatError(language, "CSV surfaceKind is invalid");
}

function encodeBase64(value: string): string {
	return Buffer.from(value, "utf8").toString("base64");
}

function decodeBase64(value: string): string {
	if (
		!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(
			value,
		)
	) {
		throw new Error("Invalid base64 payload");
	}

	return Buffer.from(value, "base64").toString("utf8");
}

export function buildConvertOperations<L extends SupportedLanguage>(
	language: L,
	parse: LanguageApi<L>["parse"],
): LanguageApi<L>["convert"] {
	return {
		lemma: {
			toSurface(lemma: Lemma<L>) {
				return {
					language: lemma.language,
					normalizedFullSurface: lemma.canonicalLemma,
					surfaceKind: "Citation",
					lemma,
				} as unknown as ReturnType<
					LanguageApi<L>["convert"]["lemma"]["toSurface"]
				>;
			},
			toSelection(lemma: Lemma<L>, options = {}) {
				return buildSelectionFromSurface(
					{
						language: lemma.language,
						normalizedFullSurface: lemma.canonicalLemma,
						surfaceKind: "Citation",
						lemma,
					} as unknown as Surface<L>,
					options,
				);
			},
		},
		surface: {
			toSelection(surface: Surface<L>, options = {}) {
				return buildSelectionFromSurface(surface, options);
			},
		},
		format: {
			toJson(value: Lemma<L> | Surface<L>) {
				return stableJson(value);
			},
			fromJson(input: string) {
				let parsed: unknown;
				try {
					parsed = JSON.parse(input);
				} catch {
					return formatError(language, "Input is not valid JSON");
				}

				return parseFormattedValue(language, parsed, parse);
			},
			toCsv(value: Lemma<L> | Surface<L>) {
				return formatValueToCsv(value);
			},
			fromCsv(input: string) {
				return parseCsvFormat(language, parse, input);
			},
			toBase64(value: Lemma<L> | Surface<L>) {
				return encodeBase64(formatValueToCsv(value));
			},
			fromBase64(input: string) {
				let csv: string;
				try {
					csv = decodeBase64(input);
				} catch {
					return formatError(language, "Input is not valid base64");
				}

				return parseCsvFormat(language, parse, csv);
			},
			csvToBase64(input: string) {
				return encodeBase64(input);
			},
			base64ToCsv(input: string) {
				return decodeBase64(input);
			},
		},
	} as unknown as LanguageApi<L>["convert"];
}
