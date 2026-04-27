import { attestation as anders } from "../../../../attestations/de/selection/Am_nächsten_Morgen_war_alles_anders/Am_nächsten_Morgen_war_alles_[anders].ts";
import { attestation as entzwei } from "../../../../attestations/de/selection/Die_schoß_das_Häschen_ganz_entzweida_rief_die_Frau_O_wei_O_wei/Die_schoß_das_Häschen_ganz_[entzwei]da_rief_die_Frau_O_wei_O_wei.ts";
import { attestation as tot } from "../../../../attestations/de/selection/Er_wog_vielleicht_ein_halbes_Lot_und_war_am_fünften_Tage_tot/Er_wog_vielleicht_ein_halbes_Lot_und_war_am_fünften_Tage_[tot].ts";
import { attestation as eingezeichnet } from "../../../../attestations/de/selection/Auf_der_Karte_sind_drei_Seen_eingezeichnet/Auf_der_Karte_sind_drei_Seen_[eingezeichnet].ts";
import { attestation as gebeten } from "../../../../attestations/de/selection/Sie_wurde_um_Geduld_gebeten/Sie_wurde_um_Geduld_[gebeten].ts";
import { attestation as verbrannt } from "../../../../attestations/de/selection/Verbrannt_ist_alles_ganz_und_gardas_arme_Kind_mit_Haut_und_Haar/[Verbrannt]_ist_alles_ganz_und_gardas_arme_Kind_mit_Haut_und_Haar.ts";
import type { RuleDocument } from "./rule.ts";

const document = {
	body: "Predicate-like forms do not all collapse to `ADV`. Ask what the selected form predicates over, and ask whether the selected surface is still transparently a participial verb form.",
	examples: [anders, eingezeichnet, verbrannt],

	subsections: [
		{
			heading: "State And Result Predicates Stay ADJ",
			body: "If the form predicates over an argument rather than modifying the event, keep it as `ADJ` even when English glossing might tempt an adverb analysis. This covers ordinary predicatives with `sein` and resultative complements like `entzwei`.",
			examples: [anders, tot, entzwei],
		},
		{
			heading: "Participles Usually Stay VERB",
			body: "Perfect participles remain verbal by default, including stative, passive-like, and result-state clauses, unless there is stronger evidence that the form has lexicalized as an adjective for learners.",
			examples: [eingezeichnet, gebeten, verbrannt],
		},
	],

	meta: {
		description: "How German predicative complements split between ADJ and participial VERB analyses.",
		order: 115,
		title: "Predicative Adjectives And Participles",
	},
} satisfies RuleDocument;

export default document;
