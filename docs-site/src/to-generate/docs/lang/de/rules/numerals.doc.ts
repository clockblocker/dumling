import { attestation as fuenften } from "../../../../attestations/de/selection/Er_wog_vielleicht_ein_halbes_Lot_und_war_am_fünften_Tage_tot/Er_wog_vielleicht_ein_halbes_Lot_und_war_am_[fünften]_Tage_tot.ts";
import { attestation as keinem } from "../../../../attestations/de/selection/Mit_keinem_Wort_erwähnte_sie_den_Plan/Mit_[keinem]_Wort_erwähnte_sie_den_Plan.ts";
import { attestation as einmal } from "../../../../attestations/de/selection/Sieh_einmal_hier_steht_er_pfui_der_Struwwelpeter/Sieh_[einmal]_hier_steht_er_pfui_der_Struwwelpeter.ts";
import { attestation as zweien } from "../../../../attestations/de/selection/Und_Minz_und_Maunz_die_schreiengar_jämmerlich_zu_zweien/Und_Minz_und_Maunz_die_schreiengar_jämmerlich_zu_[zweien].ts";
import { attestation as viele } from "../../../../attestations/de/selection/Viele_kamen_zu_spät/[Viele]_kamen_zu_spät.ts";
import type { LegacyRuleDocument } from "../../../document-shapes.ts";

const document = {
	body: `Follow UD precisely when classifying.

For the public doc-cite route tree, use [\`/de/pos/NUM.html\`](/de/pos/NUM.html) as the numeral anchor, then branch to neighboring inventory pages such as [\`/de/pos/DET.html\`](/de/pos/DET.html) and [\`/de/pos/PRON.html\`](/de/pos/PRON.html) when a numeral-adjacent form is really determiner- or pronoun-like.

Related feature pages live under [\`/de/feature.html\`](/de/feature.html), especially [\`NumType\`](/de/feature/NumType.html), [\`Case\`](/de/feature/Case.html), and [\`Degree\`](/de/feature/Degree.html) where those distinctions matter.`,
	examples: [zweien, fuenften, einmal],

	subsections: [
		{
			body: "Numeral-adjacent quantifiers can still be `DET` or `PRON` when that is their real behavior. In the new route tree, that means this page should be read alongside [`DET`](/de/pos/DET.html) and [`PRON`](/de/pos/PRON.html), not as an isolated `NUM` rule.",
			examples: [keinem, viele],
		},
	],

	meta: {
		description: "Classification notes for German numeral-like selections.",
		order: 111,
		title: "What To Do With Numerals",
	},
} satisfies LegacyRuleDocument;

export default document;
