import type { ConcreteDumlingIdKind } from "../../types";
import { hasResolvedSurfaceTarget, isPlainObject } from "../guards";

export function inferConcreteDumlingIdKind(value: unknown): ConcreteDumlingIdKind {
	if (!isPlainObject(value)) {
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
		!("target" in value)
	) {
		return "Lemma";
	}

	if (
		"surfaceKind" in value &&
		typeof value.surfaceKind === "string" &&
		"target" in value
	) {
		return hasResolvedSurfaceTarget(value.target)
			? "ResolvedSurface"
			: "UnresolvedSurface";
	}

	throw new Error("Value is not a supported Dumling ID entity");
}
