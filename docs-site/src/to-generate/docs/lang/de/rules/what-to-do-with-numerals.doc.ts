import { attestation as einmal } from "../../../../attestations/de/selection/Sieh_einmal_hier_steht_er_pfui_der_Struwwelpeter/Sieh_[einmal]_hier_steht_er_pfui_der_Struwwelpeter.ts";
import { attestation as fuenften } from "../../../../attestations/de/selection/Er_wog_vielleicht_ein_halbes_Lot_und_war_am_fünften_Tage_tot/Er_wog_vielleicht_ein_halbes_Lot_und_war_am_[fünften]_Tage_tot.ts";
import { attestation as keinem } from "../../../../attestations/de/selection/Mit_keinem_Wort_erwähnte_sie_den_Plan/Mit_[keinem]_Wort_erwähnte_sie_den_Plan.ts";
import { attestation as viele } from "../../../../attestations/de/selection/Viele_kamen_zu_spät/[Viele]_kamen_zu_spät.ts";
import { attestation as zweien } from "../../../../attestations/de/selection/Und_Minz_und_Maunz_die_schreiengar_jämmerlich_zu_zweien/Und_Minz_und_Maunz_die_schreiengar_jämmerlich_zu_[zweien].ts";
import type { RuleDocument } from "./rule.ts";

const document = {
	meta: {
		description: "Classification notes for German numeral-like selections.",
		order: 111,
		title: "What To Do With Numerals",
	},
	blocks: [
		{
			body:
				"Follow the actual lexical behavior of the attested selection rather than assuming every numeral-shaped item is `NUM`.",
			examples: [
				{ selection: zweien },
				{ selection: fuenften },
				{ selection: einmal },
			],
			heading: "Follow the attested function",
		},
		{
			body:
				"Numeral-adjacent quantifiers can still land outside `NUM` when they function as determiners or pronouns in context.",
			examples: [{ selection: keinem }, { selection: viele }],
			heading: "Keep DET and PRON available",
		},
	],
} satisfies RuleDocument;

export default document;
