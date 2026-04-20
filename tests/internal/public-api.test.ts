import { describe, expect, it } from "bun:test";
import * as runtimeEntry from "../../src";
import { dumling } from "../../src";
import { schema } from "../../src/schema";

describe("public API usage", () => {
	it("exposes the curated root runtime surface", () => {
		expect(runtimeEntry.dumling).toBe(dumling);
		expect(Object.keys(runtimeEntry).sort()).toEqual(["dumling"]);
		expect("schema" in runtimeEntry).toBe(false);
		expect("Language" in runtimeEntry).toBe(false);
	});

	it("keeps schemas available from the dedicated schema entrypoint", () => {
		expect(typeof schema.de.selection.standard.inflection.lexeme.verb().parse).toBe(
			"function",
		);
		expect(typeof schema.de.selection.standard.lemma.lexeme.noun().parse).toBe(
			"function",
		);
		expect(typeof schema.he.lemma.lexeme.verb().parse).toBe("function");
		expect(typeof schema.abstract.lemma.lexeme.verb().parse).toBe("function");
	});
});
