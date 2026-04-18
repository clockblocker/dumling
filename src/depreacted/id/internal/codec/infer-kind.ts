import type { DeprecatedConcreteDumlingIdKind } from "../../types";
import { deprecatedIsPlainObject } from "../guards";

export function deprecatedInferConcreteDumlingIdKind(value: unknown): DeprecatedConcreteDumlingIdKind {
	if (!deprecatedIsPlainObject(value)) {
		throw new Error("Dumling ID encoding expects an object entity value");
	}

	if ("orthographicStatus" in value) {
		if (value.orthographicStatus === "Unknown") {
			throw new Error("Unknown selections cannot be encoded as Dumling IDs");
		}

		return "Selection";
	}

	if (
		"lemmaKind" in value &&
		typeof value.lemmaKind === "string" &&
		!("surface" in value) &&
		!("lemma" in value)
	) {
		return "Lemma";
	}

	if (
		"surfaceKind" in value &&
		typeof value.surfaceKind === "string" &&
		"lemma" in value
	) {
		return "Surface";
	}

	throw new Error("Value is not a supported Dumling ID entity");
}
