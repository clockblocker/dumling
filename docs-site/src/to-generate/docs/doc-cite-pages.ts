import {
	ConstructionKind,
	MorphemeKind,
	Pos,
	PhrasemeKind,
	SurfaceKind,
} from "../../../../src/types/core/enums.ts";
import { deSubtree } from "../../../../src/schemas/concrete-language/features/de/de-subtree.ts";
import type {
	DocCitePageDocument,
	DocCitePageFamily,
} from "./document-shapes.ts";

const selectionFeatureKeys = [
	"coverage",
	"orthography",
	"spelling",
] as const;

const surfaceFeatureKeys = ["historical-status"] as const;

const grammaticalFeatureKeys = [
	"abbr",
	"adpType",
	"aspect",
	"case",
	"conjType",
	"definite",
	"degree",
	"discourseFormulaRole",
	"extPos",
	"foreign",
	"gender",
	"gender[psor]",
	"governedCase",
	"hasGovPrep",
	"hasSepPrefix",
	"hyph",
	"lexicallyReflexive",
	"mood",
	"number",
	"number[psor]",
	"numType",
	"partType",
	"person",
	"polarity",
	"polite",
	"poss",
	"pronType",
	"punctType",
	"reflex",
	"tense",
	"variant",
	"verbForm",
	"verbType",
	"voice",
] as const;

const entityKinds = ["Lemma", "Surface", "Selection"] as const;
const lemmaKinds = ["Lexeme", "Morpheme", "Phraseme", "Construction"] as const;
const posValues = Pos.options;
const morphemeKinds = [
	"Circumfix",
	"Clitic",
	"Duplifix",
	"Infix",
	"Interfix",
	"Prefix",
	"Root",
	"Suffix",
	"Suffixoid",
	"ToneMarking",
	"Transfix",
] as const satisfies readonly (typeof MorphemeKind.options)[number][];
const phrasemeKinds = [
	"DiscourseFormula",
	"Aphorism",
	"Proverb",
	"Idiom",
] as const satisfies readonly (typeof PhrasemeKind.options)[number][];
const constructionKinds = ConstructionKind.options;

type Scope = "de" | "u";
type LemmaKindName = (typeof lemmaKinds)[number];
type SubkindRef = {
	lemmaKind: LemmaKindName;
	subkind: string;
};
type FeatureUsage = SubkindRef & {
	role: "inherent" | "inflectional";
};

type Zodish = {
	_def?: {
		innerType?: unknown;
		schema?: unknown;
	};
	shape?: Record<string, unknown>;
};

const orderBaseByFamily: Record<DocCitePageFamily, number> = {
	scope: 100,
	entity: 1000,
	surface: 2000,
	kind: 3000,
	pos: 4000,
	morpheme: 5000,
	phraseme: 6000,
	construction: 7000,
	feature: 8000,
	"feature-selection": 8100,
	"feature-surface": 8200,
};

const entityDescriptions: Record<(typeof entityKinds)[number], string> = {
	Lemma:
		"das kanonische Lexikonobjekt mit Lemma-Subkind, Bedeutung und inhärenten Merkmalen",
	Surface:
		"die normalisierte Oberflächenform eines Lemmas, als Citation oder Inflection",
	Selection:
		"die im Beleg markierte Spanne, die auf eine Surface auflöst und optionale Selection-Features tragen kann",
};

const surfaceKindDescriptions: Record<(typeof SurfaceKind.options)[number], string> = {
	Citation:
		"die zitierfähige, normalisierte Surface eines Lemmas ohne inflectionalFeatures",
	Inflection:
		"eine konkrete flektierte Surface mit inflectionalFeatures für das aufgelöste Lemma",
};

const lemmaKindDescriptions: Record<LemmaKindName, string> = {
	Lexeme:
		"offene und geschlossene Wortarten, deren öffentliche Unterseiten im POS-Baum liegen",
	Morpheme:
		"gebundene und freie Morphemtypen mit eigenen Unterseiten unter /morpheme",
	Phraseme:
		"mehrwortige oder formelhafte Lexeme mit Unterseiten unter /phraseme",
	Construction:
		"konstruktionsartige Lemma-Typen mit Unterseiten unter /construction",
};

const selectionFeatureDescriptions: Record<(typeof selectionFeatureKeys)[number], string> = {
	coverage:
		"`coverage` markiert, dass nur ein Teil der aufgelösten Surface im Satz ausgewählt wurde.",
	orthography:
		"`orthography` markiert, dass die ausgewählte Schreibweise orthographisch fehlerhaft ist.",
	spelling:
		"`spelling` markiert, dass die Auswahl eine zugelassene nichtkanonische Schreibvariante der aufgelösten Surface ist.",
};

const surfaceFeatureDescriptions: Record<(typeof surfaceFeatureKeys)[number], string> = {
	"historical-status":
		"`historical-status` markiert, dass die normalisierte Surface historisch oder archaisch gekennzeichnet ist.",
};

function scopeOffset(scope: Scope): number {
	return scope === "de" ? 0 : 10000;
}

function bulletList(lines: readonly string[]): string {
	return lines.map((line) => `- ${line}`).join("\n");
}

function docIdFor(scope: Scope, ...parts: readonly string[]): string {
	return [scope, ...parts].join("/");
}

function htmlRouteFor(scope: Scope, ...parts: readonly string[]): `/${string}.html` {
	return `/${[scope, ...parts].join("/")}.html`;
}

function htmlLink(label: string, href: string): string {
	return `[${label}](${href})`;
}

function publicFeatureName(featureKey: string): string {
	const bracketIndex = featureKey.indexOf("[");
	if (bracketIndex === -1) {
		return `${featureKey[0]?.toUpperCase() ?? ""}${featureKey.slice(1)}`;
	}

	const base = featureKey.slice(0, bracketIndex);
	return `${base[0]?.toUpperCase() ?? ""}${base.slice(1)}${featureKey.slice(bracketIndex)}`;
}

function publicFeatureRouteSegment(featureKey: string): string {
	return publicFeatureName(featureKey).replace(/\[([^\]]+)\]/gu, "-$1");
}

function unwrapZodObject(schema: unknown): Zodish | undefined {
	if (schema === null || typeof schema !== "object") {
		return undefined;
	}

	const candidate = schema as Zodish;
	if (candidate.shape !== undefined) {
		return candidate;
	}

	return (
		unwrapZodObject(candidate._def?.schema) ??
		unwrapZodObject(candidate._def?.innerType)
	);
}

function featureKeysFromSchema(schema: unknown): string[] {
	return Object.keys(unwrapZodObject(schema)?.shape ?? {});
}

function featureUsageMap(): Map<string, FeatureUsage[]> {
	const usages = new Map<string, FeatureUsage[]>();

	const addUsage = (featureKey: string, usage: FeatureUsage) => {
		const current = usages.get(featureKey) ?? [];
		current.push(usage);
		usages.set(featureKey, current);
	};

	for (const [lemmaKind, group] of Object.entries(
		deSubtree.Lemma,
	) as unknown as [LemmaKindName, Record<string, Zodish>][]) {
		for (const [subkind, schema] of Object.entries(group)) {
			for (const featureKey of featureKeysFromSchema(
				schema.shape?.inherentFeatures,
			)) {
				addUsage(featureKey, {
					lemmaKind,
					role: "inherent",
					subkind,
				});
			}
		}
	}

	const inflectionLexemes = deSubtree.Surface.Inflection
		.Lexeme as unknown as Record<string, Zodish>;
	for (const [subkind, schema] of Object.entries(inflectionLexemes)) {
		for (const featureKey of featureKeysFromSchema(
			schema.shape?.inflectionalFeatures,
		)) {
			addUsage(featureKey, {
				lemmaKind: "Lexeme",
				role: "inflectional",
				subkind,
			});
		}
	}

	return usages;
}

const featureUsages = featureUsageMap();

function dedupeFeatureUsages(usages: readonly FeatureUsage[]): FeatureUsage[] {
	const seen = new Set<string>();
	return usages.filter((usage) => {
		const key = `${usage.lemmaKind}:${usage.subkind}:${usage.role}`;
		if (seen.has(key)) {
			return false;
		}
		seen.add(key);
		return true;
	});
}

function leafRouteForSubkind(scope: Scope, lemmaKind: LemmaKindName, subkind: string): string {
	if (lemmaKind === "Lexeme") {
		return htmlRouteFor(scope, "pos", subkind);
	}
	if (lemmaKind === "Morpheme") {
		return htmlRouteFor(scope, "morpheme", subkind);
	}
	if (lemmaKind === "Phraseme") {
		return htmlRouteFor(scope, "phraseme", subkind);
	}
	return htmlRouteFor(scope, "construction", subkind);
}

function familyOverviewRouteForLemmaKind(scope: Scope, lemmaKind: LemmaKindName): string {
	if (lemmaKind === "Lexeme") {
		return htmlRouteFor(scope, "pos");
	}
	if (lemmaKind === "Morpheme") {
		return htmlRouteFor(scope, "morpheme");
	}
	if (lemmaKind === "Phraseme") {
		return htmlRouteFor(scope, "phraseme");
	}
	return htmlRouteFor(scope, "construction");
}

function featureRouteFor(scope: Scope, featureKey: string): string {
	return htmlRouteFor(scope, "feature", publicFeatureRouteSegment(featureKey));
}

function describeUsage(scope: Scope, usage: FeatureUsage): string {
	const route = leafRouteForSubkind(scope, usage.lemmaKind, usage.subkind);
	const roleLabel =
		usage.role === "inherent" ? "inhärent" : "flektionsgetragen";
	return `${htmlLink(
		`${usage.lemmaKind} / ${usage.subkind}`,
		route,
	)} verwendet das Merkmal ${roleLabel}.`;
}

function relatedFeatureLinks(scope: Scope, lemmaKind: LemmaKindName, subkind: string): string[] {
	return grammaticalFeatureKeys
		.filter((featureKey) =>
			dedupeFeatureUsages(featureUsages.get(featureKey) ?? []).some(
				(usage) =>
					usage.lemmaKind === lemmaKind && usage.subkind === subkind,
			),
		)
		.map((featureKey) =>
			htmlLink(publicFeatureName(featureKey), featureRouteFor(scope, featureKey)),
		);
}

function makePage(options: {
	body: string;
	description: string;
	docId: string;
	family: DocCitePageFamily;
	htmlRoute: `/${string}.html`;
	order: number;
	scope: Scope;
	subject: string;
	subsections?: DocCitePageDocument["subsections"];
	title: string;
}): DocCitePageDocument {
	return {
		body: options.body,
		doc: {
			docId: options.docId,
			family: options.family,
			htmlRoute: options.htmlRoute,
			scope: options.scope,
			subject: options.subject,
		},
		examples: [],
		meta: {
			description: options.description,
			order: options.order,
			title: options.title,
		},
		subsections: options.subsections,
	};
}

function buildOverviewPage(options: {
	children: readonly { href: string; label: string; summary: string }[];
	description: string;
	family: DocCitePageFamily;
	lead: string;
	order: number;
	pathParts: readonly string[];
	scope: Scope;
	subject: string;
	title: string;
	why: string;
}): DocCitePageDocument {
	return makePage({
		body: `${options.lead}

${options.why}

Unterseiten:
${bulletList(
		options.children.map(
			(child) => `${htmlLink(child.label, child.href)}: ${child.summary}`,
		),
	)}`,
		description: options.description,
		docId: docIdFor(options.scope, ...options.pathParts),
		family: options.family,
		htmlRoute: htmlRouteFor(options.scope, ...options.pathParts),
		order: scopeOffset(options.scope) + options.order,
		scope: options.scope,
		subject: options.subject,
		title: options.title,
	});
}

function buildEntityPages(scope: Scope): DocCitePageDocument[] {
	const overview = buildOverviewPage({
		children: entityKinds.map((entityKind) => ({
			href: htmlRouteFor(scope, "entity", entityKind),
			label: entityKind,
			summary: entityDescriptions[entityKind],
		})),
		description: "Überblick über die öffentlichen Entity-Kategorien von doc-cite.",
		family: "entity",
		lead:
			"Diese Übersicht erklärt, welche Art von öffentlichem Objekt doc-cite gerade beschreibt: das Lemma selbst, eine normalisierte Surface oder eine konkrete Selection im Satz.",
		order: orderBaseByFamily.entity,
		pathParts: ["entity"],
		scope,
		subject: "entity",
		title: "Entity",
		why:
			"Dumling trennt die Ebenen, weil jede Route eine andere Frage beantwortet: Was ist das Lexikonobjekt, wie sieht seine normalisierte Oberfläche aus, und welche Spanne wurde im Beleg tatsächlich markiert?",
	});

	const leaves = entityKinds.map((entityKind, index) =>
		makePage({
			body: `\`${entityKind}\` bezeichnet in doc-cite ${entityDescriptions[entityKind]}.

Die Elternseite ${htmlLink("Entity", htmlRouteFor(scope, "entity"))} erklärt, wie sich diese Ebene von den beiden anderen öffentlichen Entity-Arten unterscheidet.`,
			description: `${entityKind}-Seite im öffentlichen doc-cite-Baum.`,
			docId: docIdFor(scope, "entity", entityKind),
			family: "entity",
			htmlRoute: htmlRouteFor(scope, "entity", entityKind),
			order: orderBaseByFamily.entity + index + 1,
			scope,
			subject: entityKind,
			title: entityKind,
		}),
	);

	return [overview, ...leaves];
}

function buildScopeOverviewPage(scope: Scope): DocCitePageDocument {
	return makePage({
		body: `Diese Überblicksseite bündelt die öffentlichen doc-cite-Routen für den Scope \`${scope}\`.

Die Familienseiten darunter trennen Entity-Ebenen, Lemma-Kategorien, konkrete Inventare und öffentliche Feature-Routen, damit jede URL genau eine Navigationsaufgabe übernimmt.

Unterseiten:
${bulletList([
			`${htmlLink("Entity", htmlRouteFor(scope, "entity"))}: Überblick über Lemma, Surface und Selection als öffentliche Entity-Arten.`,
			`${htmlLink("Surface", htmlRouteFor(scope, "surface"))}: Überblick über Citation- und Inflection-Surfaces.`,
			`${htmlLink("Kind", htmlRouteFor(scope, "kind"))}: Überblick über die vier Lemma-Kategorien.`,
			`${htmlLink("POS", htmlRouteFor(scope, "pos"))}: Inventarseiten für lexemische Wortarten.`,
			`${htmlLink("Morpheme", htmlRouteFor(scope, "morpheme"))}: Inventarseiten für Morphem-Untertypen.`,
			`${htmlLink("Phraseme", htmlRouteFor(scope, "phraseme"))}: Inventarseiten für formelhafte Lemmas.`,
			`${htmlLink("Construction", htmlRouteFor(scope, "construction"))}: Inventarseiten für konstruktionale Lemmas.`,
			`${htmlLink("Feature", htmlRouteFor(scope, "feature"))}: Überblick über grammatische, Selection- und Surface-Features.`,
		])}`,
		description: `Root-Überblick für den öffentlichen ${scope}-doc-cite-Baum.`,
		docId: docIdFor(scope),
		family: "scope",
		htmlRoute: htmlRouteFor(scope),
		order: scopeOffset(scope) + orderBaseByFamily.scope,
		scope,
		subject: scope,
		title: scope,
	});
}

function buildSurfacePages(scope: Scope): DocCitePageDocument[] {
	const overview = buildOverviewPage({
		children: SurfaceKind.options.map((surfaceKind) => ({
			href: htmlRouteFor(scope, "surface", surfaceKind),
			label: surfaceKind,
			summary: surfaceKindDescriptions[surfaceKind],
		})),
		description: "Überblick über Citation- und Inflection-Surfaces.",
		family: "surface",
		lead:
			"Surface-Seiten beschreiben die normalisierte sichtbare Form, die auf ein Lemma verweist und die Grundlage für Selections bildet.",
		order: orderBaseByFamily.surface,
		pathParts: ["surface"],
		scope,
		subject: "surface",
		title: "Surface",
		why:
			"Die Trennung zwischen Citation und Inflection ist für doc-cite wichtig, weil Selection-Auflösungen entweder direkt auf eine zitierfähige Form oder auf eine flektierte Surface mit zusätzlichen Merkmalen zeigen.",
	});

	const leaves = SurfaceKind.options.map((surfaceKind, index) =>
		makePage({
			body: `\`${surfaceKind}\` bezeichnet ${surfaceKindDescriptions[surfaceKind]}.

Mehr Kontext steht auf der Überblicksseite ${htmlLink("Surface", htmlRouteFor(scope, "surface"))}.`,
			description: `${surfaceKind}-Surface im öffentlichen doc-cite-Baum.`,
			docId: docIdFor(scope, "surface", surfaceKind),
			family: "surface",
			htmlRoute: htmlRouteFor(scope, "surface", surfaceKind),
			order: orderBaseByFamily.surface + index + 1,
			scope,
			subject: surfaceKind,
			title: surfaceKind,
		}),
	);

	return [overview, ...leaves];
}

function buildKindPages(scope: Scope): DocCitePageDocument[] {
	const overview = buildOverviewPage({
		children: lemmaKinds.map((lemmaKind) => ({
			href: htmlRouteFor(scope, "kind", lemmaKind),
			label: lemmaKind,
			summary: lemmaKindDescriptions[lemmaKind],
		})),
		description: "Überblick über die vier öffentlichen Lemma-Kategorien.",
		family: "kind",
		lead:
			"Die Kind-Seiten erklären, welche große Lemma-Kategorie ein Objekt in Dumling hat und in welchem Teilbaum seine konkreten Unterseiten liegen.",
		order: orderBaseByFamily.kind,
		pathParts: ["kind"],
		scope,
		subject: "kind",
		title: "Kind",
		why:
			"Diese Unterscheidung ist für doc-cite zentral, weil die erlaubten Untertypen, Feature-Bags und Attestationsmuster je nach Lemma-Kategorie unterschiedlich sind.",
	});

	const leaves = lemmaKinds.map((lemmaKind, index) =>
		makePage({
			body: `\`${lemmaKind}\` bezeichnet ${lemmaKindDescriptions[lemmaKind]}.

Die konkrete Inventarseite für diese Kategorie steht unter ${htmlLink(
				lemmaKind === "Lexeme"
					? "POS"
					: lemmaKind === "Morpheme"
						? "Morpheme"
						: lemmaKind === "Phraseme"
							? "Phraseme"
							: "Construction",
				familyOverviewRouteForLemmaKind(scope, lemmaKind),
			)}.`,
			description: `${lemmaKind}-Seite im öffentlichen Lemma-Baum.`,
			docId: docIdFor(scope, "kind", lemmaKind),
			family: "kind",
			htmlRoute: htmlRouteFor(scope, "kind", lemmaKind),
			order: orderBaseByFamily.kind + index + 1,
			scope,
			subject: lemmaKind,
			title: lemmaKind,
		}),
	);

	return [overview, ...leaves];
}

function buildSubkindPages(options: {
	description: string;
	family: "pos" | "morpheme" | "phraseme" | "construction";
	items: readonly string[];
	kind: LemmaKindName;
	lead: string;
	pathPart: string;
	scope: Scope;
	title: string;
}): DocCitePageDocument[] {
	const overview = buildOverviewPage({
		children: options.items.map((item) => ({
			href: htmlRouteFor(options.scope, options.pathPart, item),
			label: item,
			summary: `${item} ist eine öffentliche ${options.title}-Unterseite im doc-cite-Baum.`,
		})),
		description: options.description,
		family: options.family,
		lead: options.lead,
		order: orderBaseByFamily[options.family],
		pathParts: [options.pathPart],
		scope: options.scope,
		subject: options.pathPart,
		title: options.title,
		why:
			"Diese Unterseiten bündeln die konkreten öffentlichen Blätter, die für doc-cite beim Beschreiben von Lemma-Untertypen relevant sind.",
	});

	const leaves = options.items.map((item, index) => {
		const relatedFeatures = relatedFeatureLinks(options.scope, options.kind, item);
		return makePage({
			body: `\`${item}\` ist im deutschen Pack eine öffentliche ${options.title}-Unterseite.

Sie gehört zur Kategorie ${htmlLink(
				options.kind,
				htmlRouteFor(options.scope, "kind", options.kind),
			)} und ist über ${htmlLink(
				options.title,
				htmlRouteFor(options.scope, options.pathPart),
			)} einsortiert.`,
			description: `${item}-Seite im öffentlichen ${options.title}-Baum.`,
			docId: docIdFor(options.scope, options.pathPart, item),
			family: options.family,
			htmlRoute: htmlRouteFor(options.scope, options.pathPart, item),
			order: orderBaseByFamily[options.family] + index + 1,
			scope: options.scope,
			subject: item,
			subsections:
				relatedFeatures.length === 0
					? undefined
					: [
							{
								body: `Relevante grammatische Feature-Seiten:
${bulletList(relatedFeatures)}`,
								examples: [],
								heading: "Verknüpfte Features",
							},
						],
			title: item,
		});
	});

	return [overview, ...leaves];
}

function buildSelectionFeaturePages(scope: Scope): DocCitePageDocument[] {
	const overview = buildOverviewPage({
		children: selectionFeatureKeys.map((featureKey) => ({
			href: htmlRouteFor(scope, "feature", "selection", featureKey),
			label: featureKey,
			summary: selectionFeatureDescriptions[featureKey],
		})),
		description: "Überblick über Selection-Features im öffentlichen doc-cite-Baum.",
		family: "feature-selection",
		lead:
			"Selection-Features beschreiben nicht das Lemma, sondern die Beziehung zwischen markierter Spanne und aufgelöster Surface im konkreten Beleg.",
		order: orderBaseByFamily["feature-selection"],
		pathParts: ["feature", "selection"],
		scope,
		subject: "selection-features",
		title: "Selection Features",
		why:
			"Sie sind für doc-cite entscheidend, weil eine Selektion teilweise, orthographisch fehlerhaft oder absichtlich als Variante markiert sein kann, ohne dass sich das zugrunde liegende Lemma ändert.",
	});

	const leaves = selectionFeatureKeys.map((featureKey, index) =>
		makePage({
			body: `${selectionFeatureDescriptions[featureKey]}

Die Elternseite ${htmlLink(
				"Selection Features",
				htmlRouteFor(scope, "feature", "selection"),
			)} ordnet dieses Merkmal innerhalb der Selection-spezifischen Markierungen ein.`,
			description: `${featureKey}-Seite für öffentliche Selection-Features.`,
			docId: docIdFor(scope, "feature", "selection", featureKey),
			family: "feature-selection",
			htmlRoute: htmlRouteFor(scope, "feature", "selection", featureKey),
			order: orderBaseByFamily["feature-selection"] + index + 1,
			scope,
			subject: featureKey,
			title: featureKey,
		}),
	);

	return [overview, ...leaves];
}

function buildSurfaceFeaturePages(scope: Scope): DocCitePageDocument[] {
	const overview = buildOverviewPage({
		children: surfaceFeatureKeys.map((featureKey) => ({
			href: htmlRouteFor(scope, "feature", "surface", featureKey),
			label: featureKey,
			summary: surfaceFeatureDescriptions[featureKey],
		})),
		description: "Überblick über Surface-Features im öffentlichen doc-cite-Baum.",
		family: "feature-surface",
		lead:
			"Surface-Features markieren Eigenschaften der aufgelösten Surface selbst und nicht der konkreten Selection.",
		order: orderBaseByFamily["feature-surface"],
		pathParts: ["feature", "surface"],
		scope,
		subject: "surface-features",
		title: "Surface Features",
		why:
			"Phase 1 enthält hier nur `historical-status`, aber die Route-Familie steht bereit, damit weitere Surface-Merkmale später nicht in die grammatischen Feature-Seiten ausweichen müssen.",
	});

	const leaves = surfaceFeatureKeys.map((featureKey, index) =>
		makePage({
			body: `${surfaceFeatureDescriptions[featureKey]}

Die Elternseite ${htmlLink(
				"Surface Features",
				htmlRouteFor(scope, "feature", "surface"),
			)} erklärt, warum dieses Merkmal an Surfaces und nicht an Selections hängt.`,
			description: `${featureKey}-Seite für öffentliche Surface-Features.`,
			docId: docIdFor(scope, "feature", "surface", featureKey),
			family: "feature-surface",
			htmlRoute: htmlRouteFor(scope, "feature", "surface", featureKey),
			order: orderBaseByFamily["feature-surface"] + index + 1,
			scope,
			subject: featureKey,
			title: featureKey,
		}),
	);

	return [overview, ...leaves];
}

function buildGrammaticalFeaturePages(scope: Scope): DocCitePageDocument[] {
	const overview = buildOverviewPage({
		children: [
			{
				href: htmlRouteFor(scope, "feature", "selection"),
				label: "selection",
				summary:
					"Selection-spezifische Merkmale wie coverage, orthography und spelling.",
			},
			{
				href: htmlRouteFor(scope, "feature", "surface"),
				label: "surface",
				summary: "Surface-spezifische Merkmale wie historical-status.",
			},
			...gravitationalFeatureChildren(scope),
		],
		description: "Überblick über grammatische, Selection- und Surface-Feature-Seiten.",
		family: "feature",
		lead:
			"Die Feature-Seiten bündeln alle öffentlichen Merkmalrouten für doc-cite. Grammatische Features bleiben flach unter `/feature`, während Selection- und Surface-Features eigene Unterfamilien bekommen.",
		order: orderBaseByFamily.feature,
		pathParts: ["feature"],
		scope,
		subject: "feature",
		title: "Feature",
		why:
			"Das hält die öffentlichen URLs stabil, auch wenn ein Merkmal je nach Lemma-Subkind inhärent, flektionsgetragen oder beides sein kann.",
	});

	const leaves = grammaticalFeatureKeys.map((featureKey, index) => {
		const usages = dedupeFeatureUsages(featureUsages.get(featureKey) ?? []);
		return makePage({
			body: `\`${publicFeatureName(featureKey)}\` ist eine flache grammatische Feature-Seite im deutschen Pack.

Doc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.`,
			description: `${publicFeatureName(featureKey)}-Seite im öffentlichen Feature-Baum.`,
			docId: docIdFor(scope, "feature", publicFeatureName(featureKey)),
			family: "feature",
			htmlRoute: featureRouteFor(scope, featureKey) as `/${string}.html`,
			order: orderBaseByFamily.feature + index + 10,
			scope,
			subject: publicFeatureName(featureKey),
			subsections: [
				{
					body:
						usages.length === 0
							? "Im aktuellen deutschen Pack ist dieses Merkmal vorbereitet, aber in der extrahierten Usage-Liste noch nicht belegt."
							: `Im deutschen Pack verwendet von:
${bulletList(usages.map((usage) => describeUsage(scope, usage)))}`,
					examples: [],
					heading: "Verwendung im deutschen Pack",
				},
				{
					body: `Verwandte Überblicksseiten:
${bulletList([
						htmlLink("Feature", htmlRouteFor(scope, "feature")),
						htmlLink("Kind", htmlRouteFor(scope, "kind")),
					])}`,
					examples: [],
					heading: "Einordnung",
				},
			],
			title: publicFeatureName(featureKey),
		});
	});

	return [overview, ...leaves];
}

function gravitationalFeatureChildren(scope: Scope) {
	return grammaticalFeatureKeys.map((featureKey) => ({
		href: featureRouteFor(scope, featureKey),
		label: publicFeatureName(featureKey),
		summary: `Grammatische Route für ${publicFeatureName(featureKey)} im deutschen Pack.`,
	}));
}

function mirrorPage(page: DocCitePageDocument): DocCitePageDocument {
	const deDocId = page.doc.docId;
	const deHtmlRoute = page.doc.htmlRoute;
	const mirroredDocId = deDocId.replace(/^de(?=\/|$)/u, "u");
	const mirroredHtmlRoute = deHtmlRoute.replace(
		/^\/de(?=\/|\.html$)/u,
		"/u",
	) as `/${string}.html`;
	const mirrorNotice = `> Phase 1: Diese \`/u/...\`-Seite spiegelt vorläufig die deutsche Autorenseite ${htmlLink(
		deHtmlRoute,
		deHtmlRoute,
	)}.`;
	const baseBody = page.body?.trim() ?? "";

	return {
		...page,
		body: baseBody.length === 0 ? mirrorNotice : `${mirrorNotice}\n\n${baseBody}`,
		doc: {
			...page.doc,
			docId: mirroredDocId,
			htmlRoute: mirroredHtmlRoute,
			mirrorsDocId: deDocId,
			scope: "u",
		},
		meta: {
			...page.meta,
			order: (page.meta.order ?? 0) + scopeOffset("u"),
		},
	};
}

function buildGermanPages(): DocCitePageDocument[] {
	return [
		buildScopeOverviewPage("de"),
		...buildEntityPages("de"),
		...buildSurfacePages("de"),
		...buildKindPages("de"),
		...buildSubkindPages({
			description: "Überblick über die POS-Unterseiten des deutschen Packs.",
			family: "pos",
			items: posValues,
			kind: "Lexeme",
			lead:
				"Die POS-Seiten bilden die öffentlichen Lexeme-Untertypen für doc-cite ab und verlinken auf die grammatischen Feature-Seiten, die für die jeweilige Wortart im deutschen Pack benutzt werden.",
			pathPart: "pos",
			scope: "de",
			title: "POS",
		}),
		...buildSubkindPages({
			description: "Überblick über die Morphem-Unterseiten des deutschen Packs.",
			family: "morpheme",
			items: morphemeKinds,
			kind: "Morpheme",
			lead:
				"Die Morpheme-Seiten bündeln die öffentlichen Untertypen für gebundene und freie Morpheme im deutschen Pack.",
			pathPart: "morpheme",
			scope: "de",
			title: "Morpheme",
		}),
		...buildSubkindPages({
			description: "Überblick über die Phraseme-Unterseiten des deutschen Packs.",
			family: "phraseme",
			items: phrasemeKinds,
			kind: "Phraseme",
			lead:
				"Die Phraseme-Seiten bündeln die öffentlichen Untertypen für formelhafte oder idiomatische Lexeme im deutschen Pack.",
			pathPart: "phraseme",
			scope: "de",
			title: "Phraseme",
		}),
		...buildSubkindPages({
			description: "Überblick über die Construction-Unterseiten des deutschen Packs.",
			family: "construction",
			items: constructionKinds,
			kind: "Construction",
			lead:
				"Die Construction-Seiten bündeln die öffentlichen Untertypen für konstruktionale Lemmas im deutschen Pack.",
			pathPart: "construction",
			scope: "de",
			title: "Construction",
		}),
		...buildGrammaticalFeaturePages("de"),
		...buildSelectionFeaturePages("de"),
		...buildSurfaceFeaturePages("de"),
	];
}

const germanPages = buildGermanPages();

export const docCitePages: readonly DocCitePageDocument[] = [
	...germanPages,
	...germanPages.map((page) => mirrorPage(page)),
];
