export type DeprecatedParsedFeatureValue = string | boolean | readonly string[];
export type DeprecatedParsedFeatureBag = Record<string, DeprecatedParsedFeatureValue>;

const BOOLEAN_FEATURE_KEYS = new Set(["isClosedSet"]);
const YES_LITERAL_FEATURE_KEYS = new Set([
	"abbr",
	"foreign",
	"hyph",
	"isPhrasal",
	"lexicallyReflexive",
	"phrasal",
	"poss",
	"reflex",
]);

const MULTI_VALUE_FEATURE_KEYS = new Set([
	"gender",
	"gender[psor]",
	"number",
	"person",
	"pronType",
]);

import { deprecatedEscapeToken, deprecatedUnescapeToken } from "./tokens";

export function deprecatedCompactFeatureBag(
	bag: Record<string, DeprecatedParsedFeatureValue | undefined>,
): DeprecatedParsedFeatureBag {
	return Object.fromEntries(
		Object.entries(bag).filter(([, value]) => value !== undefined),
	) as DeprecatedParsedFeatureBag;
}

export function deprecatedSerializeFeatureBag(features: DeprecatedParsedFeatureBag): string {
	const entries = Object.entries(features)
		.filter(([, value]) => value !== undefined)
		.sort(([left], [right]) => left.localeCompare(right));

	if (entries.length === 0) {
		return "-";
	}

	return entries
		.map(
			([key, value]) =>
				`${deprecatedEscapeToken(key)}=${serializeFeatureValue(value)}`,
		)
		.join(",");
}

export function deprecatedParseFeatureBag(token: string): DeprecatedParsedFeatureBag {
	if (token === "-") {
		return {};
	}

	return Object.fromEntries(
		token.split(",").map((entry) => {
			const separatorIndex = entry.indexOf("=");

			if (separatorIndex === -1) {
				throw new Error(`Malformed feature entry in Dumling ID: ${entry}`);
			}

			const key = deprecatedUnescapeToken(entry.slice(0, separatorIndex));
			const value = deprecatedUnescapeToken(entry.slice(separatorIndex + 1));

			return [key, parseFeatureValue(key, value)];
		}),
	) as DeprecatedParsedFeatureBag;
}

function serializeFeatureValue(value: DeprecatedParsedFeatureValue): string {
	if (typeof value === "boolean") {
		return deprecatedEscapeToken(value ? "Yes" : "No");
	}

	if (Array.isArray(value)) {
		return `~${[...value]
			.sort()
			.map((part) => deprecatedEscapeToken(part))
			.join("|")}`;
	}

	return deprecatedEscapeToken(value as string);
}

function parseFeatureValue(key: string, value: string): DeprecatedParsedFeatureValue {
	if (BOOLEAN_FEATURE_KEYS.has(key)) {
		if (value === "Yes" || value === "true") {
			return true;
		}

		if (value === "No" || value === "false") {
			return false;
		}

		throw new Error(`Malformed boolean feature value for ${key}: ${value}`);
	}

	if (YES_LITERAL_FEATURE_KEYS.has(key)) {
		if (value === "Yes") {
			return value;
		}

		throw new Error(
			`Malformed yes-literal feature value for ${key}: ${value}`,
		);
	}

	if (MULTI_VALUE_FEATURE_KEYS.has(key) && value.startsWith("~")) {
		return value.slice(1).split("|");
	}

	return value;
}
