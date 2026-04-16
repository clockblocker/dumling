import { describe, expect, it } from "bun:test";
import * as linguistics from "../../src";
import {
	type KnownSelection,
	LexicalRelationsSchema,
	type DumlingId,
	type DumlingIdValueFor,
	MorphologicalRelationsSchema,
	RelationTargetDumlingIdsSchema,
	type Relations,
	type Selection,
	dumling,
} from "../../src";
import { englishWalkLemma } from "../helpers";

const {
	idCodec: DumlingIdCodec,
	operation: lingOperation,
	schemaFor: lingSchemaFor,
} = dumling;

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
	? 1
	: 2
	? true
	: false;

type Assert<T extends true> = T;

type _knownSelectionExcludesUnknown = Assert<
	Equal<KnownSelection<"English">["orthographicStatus"], "Standard" | "Typo">
>;

type _selectionDecodeHelperStaysConcrete = Assert<
	Equal<DumlingIdValueFor<"Selection", "English">, KnownSelection<"English">>
>;

type _relationTargetsAreLemmaIds = Assert<
	Equal<Relations.TargetDumlingIds[number], DumlingId<"Lemma">>
>;

type _selectionStillIncludesUnknownOutsideDumlingIdApi = Assert<
	Equal<
		Extract<
			Selection<"English">,
			{ orthographicStatus: "Unknown" }
		>["orthographicStatus"],
		"Unknown"
	>
>;

describe("public API usage", () => {
	it("exposes the curated root API surface", () => {
		expect(typeof linguistics.dumling.idCodec.forLanguage).toBe("function");
		expect(typeof linguistics.dumling.operation.forLanguage).toBe("function");
		expect(
			typeof linguistics.dumling.operation.resolve.unresolvedSurface
				.withLemma,
		).toBe("function");
		expect(typeof linguistics.dumling.operation.unresolve.surface).toBe(
			"function",
		);
		expect(linguistics.dumling).toBe(dumling);
		expect(linguistics.dumling.idCodec).toBe(DumlingIdCodec);
		expect(linguistics.dumling.operation).toBe(lingOperation);
		expect(linguistics.dumling.schemaFor).toBe(lingSchemaFor);
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
		expect("ResolvedSurfaceSchema" in linguistics).toBe(false);
		expect("SurfaceSchema" in linguistics).toBe(false);
		expect("UnresolvedSurfaceSchema" in linguistics).toBe(false);
	});

	it("keeps schemas and relations available from the package root", () => {
		const lemmaId = DumlingIdCodec.English.makeDumlingIdFor(englishWalkLemma);

		expect(
			lingSchemaFor.Selection.English.Standard.Inflection.Lexeme.VERB,
		).toBeDefined();
		expect(
			lingSchemaFor.ResolvedSurface.German.Standard.Lemma.Lexeme.NOUN,
		).toBeDefined();
		expect(
			RelationTargetDumlingIdsSchema.parse([lemmaId] as DumlingId<"Lemma">[]),
		).toEqual([lemmaId] as DumlingId<"Lemma">[]);
		expect(() =>
			RelationTargetDumlingIdsSchema.parse([
				"ling:v1:EN:SURF-RES;walk;Inflection;Lexeme;VERB;tense=Pres,verbForm=Fin;walk;Lexeme;VERB;-;%F0%9F%9A%B6",
			]),
		).toThrow();
		expect(LexicalRelationsSchema.parse({ synonym: [] })).toEqual({
			synonym: [],
		});
		expect(MorphologicalRelationsSchema.parse({ derivedFrom: [] })).toEqual(
			{
				derivedFrom: [],
			},
		);
	});
});
