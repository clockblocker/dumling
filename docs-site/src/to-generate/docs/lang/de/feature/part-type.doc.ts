import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "PartType-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "PartType",
  order: 8030,
  subject: "PartType",
  title: "PartType",
  body: "`PartType` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADP](/de/entity/lemma/lexeme/adp/) verwendet das Merkmal inhärent.\n- [Lexeme / INTJ](/de/entity/lemma/lexeme/intj/) verwendet das Merkmal inhärent.\n- [Lexeme / PART](/de/entity/lemma/lexeme/part/) verwendet das Merkmal inhärent.",
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
