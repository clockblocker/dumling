import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "Abbr-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Abbr",
  order: 8010,
  subject: "Abbr",
  title: "Abbr",
  body: "`Abbr` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADJ](/de/entity/lemma/lexeme/adj/) verwendet das Merkmal inhärent.\n- [Lexeme / ADP](/de/entity/lemma/lexeme/adp/) verwendet das Merkmal inhärent.\n- [Lexeme / NUM](/de/entity/lemma/lexeme/num/) verwendet das Merkmal inhärent.\n- [Lexeme / PART](/de/entity/lemma/lexeme/part/) verwendet das Merkmal inhärent.\n- [Lexeme / PROPN](/de/entity/lemma/lexeme/propn/) verwendet das Merkmal inhärent.\n- [Lexeme / X](/de/entity/lemma/lexeme/x/) verwendet das Merkmal inhärent.",
      examples: [],
      heading: "Verwendung im deutschen Pack"
    },
    {
      body: "Verwandte Überblicksseiten:\n- [Feature](/de/feature/)\n- [Kind](/de/entity/lemma/)",
      examples: [],
      heading: "Einordnung"
    }
  ]
});

export default document;
