import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "Person-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Person",
  order: 8031,
  subject: "Person",
  title: "Person",
  body: "`Person` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / DET](/de/entity/lemma/lexeme/det/) verwendet das Merkmal inhärent.\n- [Lexeme / PRON](/de/entity/lemma/lexeme/pron/) verwendet das Merkmal inhärent.",
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
