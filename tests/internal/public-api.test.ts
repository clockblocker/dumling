import { describe, expect, it } from "bun:test";
import * as linguistics from "../../src";
import {
	type DumlingIdValueFor,
	type ObservedSelection,
	type Selection,
	type SupportedLang,
	type UniversalLemmaKind,
	type UniversalLemmaSubKind,
	dumling,
} from "../../src";
import type { TargetLanguage } from "../../src/lu/universal/enums/core/language";
import type { LemmaKind } from "../../src/lu/universal/enums/core/selection";
import type { MorphemeKind } from "../../src/lu/universal/enums/kind/morpheme-kind";
import type { PhrasemeKind } from "../../src/lu/universal/enums/kind/phraseme-kind";
import type { Pos } from "../../src/lu/universal/enums/kind/pos";

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

type _selectionOnlyContainsHydratedStatuses = Assert<
	Equal<Selection<"English">["orthographicStatus"], "Standard" | "Typo">
>;

type _selectionDecodeHelperStaysConcrete = Assert<
	Equal<DumlingIdValueFor<"Selection", "English">, Selection<"English">>
>;

type _observedSelectionCarriesUnknownDiscriminant = Assert<
	Equal<ObservedSelection<"English">["orthographicStatus"], "Unknown">
>;

type _supportedLangAliasMatchesTargetLanguage = Assert<
	Equal<SupportedLang, TargetLanguage>
>;

type _universalLemmaKindAliasMatchesInternalKind = Assert<
	Equal<UniversalLemmaKind, LemmaKind>
>;

type _universalLemmaSubKindIsFlattenedUniversalUnion = Assert<
	Equal<UniversalLemmaSubKind, Pos | MorphemeKind | PhrasemeKind>
>;

describe("public API usage", () => {
	it("exposes the curated root API surface", () => {
		expect(typeof linguistics.dumling.idCodec.forLanguage).toBe("function");
		expect(typeof linguistics.dumling.operation.forLanguage).toBe("function");
		expect(typeof linguistics.dumling.operation.convert.lemma.toSurface).toBe("function");
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
		expect("SurfaceSchema" in linguistics).toBe(false);
	});

	it("keeps schemas available from the package root", () => {
		expect(
			lingSchemaFor.Selection.English.Standard.Inflection.Lexeme.VERB,
		).toBeDefined();
		expect(lingSchemaFor.Surface.German.Lemma.Lexeme.NOUN).toBeDefined();
		expect(lingSchemaFor.ObservedSelection.English).toBeDefined();
	});
});
