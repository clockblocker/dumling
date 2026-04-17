import { describe, expect, it } from "bun:test";
import * as linguistics from "../../src";
import { dumling, idCodec, operation } from "../../src";
import type { ObservedSelection, Selection } from "../../src/entities";
import type { DumlingIdValueFor } from "../../src/id";
import { schemaFor } from "../../src/schema";

const { idCodec: DumlingIdCodec, operation: lingOperation } = dumling;

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
	? 1
	: 2
	? true
	: false;

type Assert<T extends true> = T;

export type _selectionOnlyContainsHydratedStatuses = Assert<
	Equal<Selection<"English">["orthographicStatus"], "Standard" | "Typo">
>;

export type _selectionDecodeHelperStaysConcrete = Assert<
	Equal<DumlingIdValueFor<"Selection", "English">, Selection<"English">>
>;

export type _observedSelectionCarriesUnknownDiscriminant = Assert<
	Equal<ObservedSelection<"English">["orthographicStatus"], "Unknown">
>;

describe("public API usage", () => {
	it("exposes the curated root API surface", () => {
		expect(linguistics.idCodec).toBe(idCodec);
		expect(linguistics.operation).toBe(operation);
		expect(typeof linguistics.dumling.idCodec.forLanguage).toBe("function");
		expect(typeof linguistics.dumling.operation.forLanguage).toBe("function");
		expect(typeof linguistics.dumling.operation.convert.lemma.toSurface).toBe("function");
		expect(linguistics.dumling).toBe(dumling);
		expect(linguistics.dumling.idCodec).toBe(DumlingIdCodec);
		expect(linguistics.dumling.operation).toBe(lingOperation);
		expect(linguistics.dumling.idCodec.English).toBeDefined();
		expect(linguistics.dumling.idCodec.German).toBeDefined();
		expect(linguistics.dumling.idCodec.Hebrew).toBeDefined();
		expect("buildToDumlingConverters" in linguistics).toBe(false);
		expect("DumlingIdCodec" in linguistics).toBe(false);
		expect("lingOperation" in linguistics).toBe(false);
		expect("lingSchemaFor" in linguistics).toBe(false);
		expect("DumlingId" in linguistics).toBe(false);
		expect("ParsedShallowSurfaceDto" in linguistics).toBe(false);
		expect("parseDumlingId" in linguistics).toBe(false);
		expect("parseShallowSurfaceDumlingId" in linguistics).toBe(false);
		expect("DumlingConverters" in linguistics).toBe(false);
		expect("SelectionSchema" in linguistics).toBe(false);
		expect("LemmaSchema" in linguistics).toBe(false);
		expect("SurfaceSchema" in linguistics).toBe(false);
		expect("schemaFor" in linguistics).toBe(false);
		expect("Lemma" in linguistics).toBe(false);
		expect("Selection" in linguistics).toBe(false);
	});

	it("keeps schemas available from the schema entrypoint", () => {
		expect(
			schemaFor.Selection.English.Standard.Inflection.Lexeme.VERB,
		).toBeDefined();
		expect(schemaFor.Surface.German.Lemma.Lexeme.NOUN).toBeDefined();
		expect(schemaFor.ObservedSelection.English).toBeDefined();
	});
});
