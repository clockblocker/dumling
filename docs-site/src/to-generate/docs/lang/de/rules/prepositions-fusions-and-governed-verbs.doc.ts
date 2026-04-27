import { attestation as entlang } from "../../../../attestations/de/selection/Wir_liefen_den_Fluss_entlang/Wir_liefen_den_Fluss_[entlang].ts";
import { attestation as wartet } from "../../../../attestations/de/selection/Er_wartet_auf_den_Nachtbus/Er_[wartet]_auf_den_Nachtbus.ts";
import { attestation as wegen } from "../../../../attestations/de/selection/Wegen_dem_Regen_kamen_wir_zu_spät/[Wegen]_dem_Regen_kamen_wir_zu_spät.ts";
import { attestation as zum } from "../../../../attestations/de/selection/Er_ging_zum_Bahnhof/Er_ging_[zum]_Bahnhof.ts";
import { attestation as passAuf } from "../../../../attestations/de/selection/Pass_auf_dich_auf/Pass_[auf]_dich_auf.ts";
import { attestation as ins } from "../../../../attestations/de/selection/Sie_sprang_ins_kalte_Wasser/Sie_sprang_[ins]_kalte_Wasser.ts";
import type { RuleDocument } from "./rule.ts";

const document = {
	body: "German preposition-like material splits into different learner-facing units. Keep ordinary adpositions, fused forms, and verb-governed pieces separate instead of letting one analysis swallow the others.",
	examples: [wegen, zum, wartet],

	subsections: [
		{
			heading: "Free Prepositions Stay ADP",
			body: "When the selected item heads an ordinary prepositional phrase, keep it as a standalone `ADP`. Do not pull it into the verb just because the whole clause feels conventional or because a dictionary might list lexical preferences elsewhere.",
			examples: [wegen, entlang],
		},
		{
			heading: "Fusions Stay Construction/Fusion",
			body: "Common fused forms like `zum` and `ins` are learner-facing units of their own. Keep them as `Construction/Fusion` instead of decomposing them into preposition plus article.",
			examples: [zum, ins],
		},
		{
			heading: "Governed Prepositions Belong On The Verb Lemma",
			body: "If a selected token is part of a governed-verb analysis, keep the governed preposition on `lemma.inherentFeatures.hasGovPrep` and keep `normalizedFullSurface` to the verbal surface itself. Do not expand the surface into a made-up verb-plus-preposition citation string.",
			examples: [wartet, passAuf],
		},
	],

	meta: {
		description: "How German ADP, Fusion, and governed-verb analyses stay distinct.",
		order: 113,
		title: "Prepositions, Fusions, And Governed Verbs",
	},
} satisfies RuleDocument;

export default document;
