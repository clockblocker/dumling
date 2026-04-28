import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "Case-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Case",
  order: 8012,
  subject: "Case",
  title: "Case",
  body: "`Case` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADJ](/de/entity/lemma/lexeme/adj/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / DET](/de/entity/lemma/lexeme/det/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / NOUN](/de/entity/lemma/lexeme/noun/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / NUM](/de/entity/lemma/lexeme/num/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / PRON](/de/entity/lemma/lexeme/pron/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / PROPN](/de/entity/lemma/lexeme/propn/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / SYM](/de/entity/lemma/lexeme/sym/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / X](/de/entity/lemma/lexeme/x/) verwendet das Merkmal flektionsgetragen.",
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
